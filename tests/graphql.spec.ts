import { Kind, ObjectTypeDefinitionNode } from 'graphql';
import { ObjectTypeDefinitionBuilder } from '../src/graphql';

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
