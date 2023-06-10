import { Graph } from 'graphlib';
import {
  buildClientSchema,
  buildSchema,
  introspectionFromSchema,
  Kind,
  ObjectTypeDefinitionNode,
  parse,
  print,
} from 'graphql';
import dedent from 'ts-dedent';

import { isGeneratedByIntrospection, ObjectTypeDefinitionBuilder, topologicalSortAST, topsort } from '../src/graphql';

describe('graphql', () => {
  describe('ObjectTypeDefinitionBuilder', () => {
    describe('useObjectTypes === true', () => {
      test.each([
        ['Query', false],
        ['Mutation', false],
        ['Subscription', false],
        ['QueryFoo', true],
        ['MutationFoo', true],
        ['SubscriptionFoo', true],
        ['FooQuery', true],
        ['FooMutation', true],
        ['FooSubscription', true],
        ['Foo', true],
      ])(`A node with a name of "%s" should be matched? %s`, (nodeName, nodeIsMatched) => {
        const node: ObjectTypeDefinitionNode = {
          name: {
            kind: Kind.NAME,
            value: nodeName,
          },
          kind: Kind.OBJECT_TYPE_DEFINITION,
        };

        const objectTypeDefFn = ObjectTypeDefinitionBuilder(true, (n: ObjectTypeDefinitionNode) => n);

        expect(objectTypeDefFn).toBeDefined();

        if (nodeIsMatched) {
          expect(objectTypeDefFn?.(node)).toBe(node);
        } else {
          expect(objectTypeDefFn?.(node)).toBeUndefined();
        }
      });
    });

    describe('useObjectTypes === false', () => {
      test('should not return an ObjectTypeDefinitionFn', () => {
        const objectTypeDefFn = ObjectTypeDefinitionBuilder(false, (n: ObjectTypeDefinitionNode) => n);
        expect(objectTypeDefFn).toBeUndefined();
      });
    });
  });
});

describe('topsort', () => {
  it('should correctly sort nodes based on their dependencies', () => {
    const g = new Graph();

    // Setting up the graph
    g.setNode('A');
    g.setNode('B');
    g.setNode('C');
    g.setEdge('A', 'B');
    g.setEdge('B', 'C');

    const sortedNodes = topsort(g);
    expect(sortedNodes).toEqual(['C', 'B', 'A']);
  });

  it('should correctly handle graph with no edges', () => {
    const g = new Graph();

    // Setting up the graph
    g.setNode('A');
    g.setNode('B');
    g.setNode('C');

    const sortedNodes = topsort(g);
    const isCorrectOrder = ['A', 'B', 'C'].every(node => sortedNodes.includes(node));
    expect(isCorrectOrder).toBe(true);
  });

  it('should correctly handle an empty graph', () => {
    const g = new Graph();

    const sortedNodes = topsort(g);
    expect(sortedNodes).toEqual([]);
  });

  it('should correctly handle graph with multiple dependencies', () => {
    const g = new Graph();

    // Setting up the graph
    g.setNode('A');
    g.setNode('B');
    g.setNode('C');
    g.setNode('D');
    g.setEdge('A', 'B');
    g.setEdge('A', 'C');
    g.setEdge('B', 'D');
    g.setEdge('C', 'D');

    const sortedNodes = topsort(g);
    expect(sortedNodes).toEqual(['D', 'C', 'B', 'A']);
  });
});

describe('topologicalSortAST', () => {
  const getSortedSchema = (schema: string): string => {
    const ast = parse(schema);
    const sortedAst = topologicalSortAST(buildSchema(schema), ast);
    return print(sortedAst);
  };

  it('should correctly sort nodes based on their input type dependencies', () => {
    const schema = /* GraphQL */ `
      input A {
        b: B
      }

      input B {
        c: C
      }

      input C {
        d: String
      }
    `;

    const sortedSchema = getSortedSchema(schema);

    const expectedSortedSchema = dedent/* GraphQL */ `
      input C {
        d: String
      }

      input B {
        c: C
      }

      input A {
        b: B
      }
    `;

    expect(sortedSchema).toBe(expectedSortedSchema);
  });

  it('should correctly sort nodes based on their objet type dependencies', () => {
    const schema = /* GraphQL */ `
      type D {
        e: UserKind
      }

      union UserKind = A | B

      type A {
        b: B
      }

      type B {
        c: C
      }

      type C {
        d: String
      }
    `;

    const sortedSchema = getSortedSchema(schema);

    const expectedSortedSchema = dedent/* GraphQL */ `
      type C {
        d: String
      }

      type B {
        c: C
      }

      type A {
        b: B
      }

      union UserKind = A | B

      type D {
        e: UserKind
      }
    `;

    expect(sortedSchema).toBe(expectedSortedSchema);
  });

  it('should correctly handle schema with circular dependencies', () => {
    const schema = /* GraphQL */ `
      input A {
        b: B
      }

      input B {
        a: A
      }
    `;
    const sortedSchema = getSortedSchema(schema);

    const expectedSortedSchema = dedent/* GraphQL */ `
      input A {
        b: B
      }

      input B {
        a: A
      }
    `;

    expect(sortedSchema).toBe(expectedSortedSchema);
  });

  it('should correctly handle schema with self circular dependencies', () => {
    const schema = /* GraphQL */ `
      input A {
        a: A
      }

      input B {
        b: B
      }
    `;
    const sortedSchema = getSortedSchema(schema);

    const expectedSortedSchema = dedent/* GraphQL */ `
      input A {
        a: A
      }

      input B {
        b: B
      }
    `;

    expect(sortedSchema).toBe(expectedSortedSchema);
  });
});

describe('isGeneratedByIntrospection function', () => {
  const schemaDefinition = /* GraphQL */ `
    scalar CustomScalar

    interface Node {
      id: ID!
    }

    type UserType implements Node {
      id: ID!
      name: String!
      email: String!
    }

    union SearchResult = UserType

    enum Role {
      ADMIN
      USER
    }

    input UserInput {
      name: String!
      email: String!
      role: Role!
    }

    type Query {
      user(id: ID!): UserType!
      search(text: String!): [SearchResult]
    }

    type Mutation {
      createUser(input: UserInput!): UserType!
    }
  `;

  test('returns false for a schema not generated by introspection', () => {
    const schema = buildSchema(schemaDefinition);
    expect(isGeneratedByIntrospection(schema)).toBe(false);
  });

  test('returns true for a schema generated by introspection', () => {
    const schema = buildSchema(schemaDefinition);
    const query = introspectionFromSchema(schema);
    const clientSchema = buildClientSchema(query);
    expect(isGeneratedByIntrospection(clientSchema)).toBe(true);
  });
});
