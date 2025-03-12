import type {
  ASTNode,
  DefinitionNode,
  DocumentNode,
  GraphQLSchema,
  InterfaceTypeDefinitionNode,
  ListTypeNode,
  NamedTypeNode,
  NameNode,
  NonNullTypeNode,
  ObjectTypeDefinitionNode,
  TypeNode,
} from 'graphql';
import { Graph } from 'graphlib';
import {
  isSpecifiedScalarType,
  Kind,
  visit,
} from 'graphql';

/**
 * Recursively unwraps a GraphQL type until it reaches the NamedType.
 *
 * Since a GraphQL type is defined as either a NamedTypeNode, ListTypeNode, or NonNullTypeNode,
 * this implementation safely recurses until the underlying NamedTypeNode is reached.
 */
function getNamedType(typeNode: TypeNode): NamedTypeNode {
  return typeNode.kind === Kind.NAMED_TYPE ? typeNode : getNamedType(typeNode.type);
}

export const isListType = (typ?: TypeNode): typ is ListTypeNode => typ?.kind === Kind.LIST_TYPE;
export const isNonNullType = (typ?: TypeNode): typ is NonNullTypeNode => typ?.kind === Kind.NON_NULL_TYPE;
export const isNamedType = (typ?: TypeNode): typ is NamedTypeNode => typ?.kind === Kind.NAMED_TYPE;

export const isInput = (kind: string) => kind.includes('Input');

type ObjectTypeDefinitionFn = (node: ObjectTypeDefinitionNode) => any;
type InterfaceTypeDefinitionFn = (node: InterfaceTypeDefinitionNode) => any;

export function ObjectTypeDefinitionBuilder(useObjectTypes: boolean | undefined, callback: ObjectTypeDefinitionFn): ObjectTypeDefinitionFn | undefined {
  if (!useObjectTypes)
    return undefined;
  return (node) => {
    if (/^(Query|Mutation|Subscription)$/.test(node.name.value))
      return;

    return callback(node);
  };
}

export function InterfaceTypeDefinitionBuilder(useInterfaceTypes: boolean | undefined, callback: InterfaceTypeDefinitionFn): InterfaceTypeDefinitionFn | undefined {
  if (!useInterfaceTypes)
    return undefined;
  return (node) => {
    return callback(node);
  };
}

export function topologicalSortAST(schema: GraphQLSchema, ast: DocumentNode): DocumentNode {
  const dependencyGraph = new Graph();
  const targetKinds = [
    Kind.OBJECT_TYPE_DEFINITION,
    Kind.INPUT_OBJECT_TYPE_DEFINITION,
    Kind.INTERFACE_TYPE_DEFINITION,
    Kind.SCALAR_TYPE_DEFINITION,
    Kind.ENUM_TYPE_DEFINITION,
    Kind.UNION_TYPE_DEFINITION,
  ];

  visit<DocumentNode>(ast, {
    enter: (node) => {
      switch (node.kind) {
        case Kind.OBJECT_TYPE_DEFINITION:
        case Kind.INPUT_OBJECT_TYPE_DEFINITION:
        case Kind.INTERFACE_TYPE_DEFINITION: {
          const typeName = node.name.value;
          dependencyGraph.setNode(typeName);

          if (node.fields) {
            node.fields.forEach((field) => {
              // Unwrap the type
              const namedTypeNode = getNamedType(field.type);
              const dependency = namedTypeNode.name.value;
              const namedType = schema.getType(dependency);
              if (
                namedType?.astNode?.kind === undefined
                || !targetKinds.includes(namedType.astNode.kind)
              ) {
                return;
              }

              if (!dependencyGraph.hasNode(dependency)) {
                dependencyGraph.setNode(dependency);
              }
              dependencyGraph.setEdge(typeName, dependency);
            });
          }
          break;
        }
        case Kind.SCALAR_TYPE_DEFINITION:
        case Kind.ENUM_TYPE_DEFINITION: {
          dependencyGraph.setNode(node.name.value);
          break;
        }
        case Kind.UNION_TYPE_DEFINITION: {
          const dependency = node.name.value;
          if (!dependencyGraph.hasNode(dependency))
            dependencyGraph.setNode(dependency);

          node.types?.forEach((type) => {
            const dependency = type.name.value;
            const typ = schema.getType(dependency);
            if (typ?.astNode?.kind === undefined || !targetKinds.includes(typ.astNode.kind))
              return;

            dependencyGraph.setEdge(node.name.value, dependency);
          });
          break;
        }
        default:
          break;
      }
    },
  });

  const sorted = topsort(dependencyGraph);

  // Create a map of definitions for quick access, using the definition's name as the key.
  const definitionsMap: Map<string, DefinitionNode> = new Map();

  // SCHEMA_DEFINITION does not have a name.
  // https://spec.graphql.org/October2021/#sec-Schema
  const astDefinitions = ast.definitions.filter(def => def.kind !== Kind.SCHEMA_DEFINITION);

  astDefinitions.forEach((definition) => {
    if (hasNameField(definition) && definition.name)
      definitionsMap.set(definition.name.value, definition);
  });

  // Two arrays to store sorted and unsorted definitions.
  const sortedDefinitions: DefinitionNode[] = [];
  const notSortedDefinitions: DefinitionNode[] = [];

  // Iterate over sorted type names and retrieve their corresponding definitions.
  sorted.forEach((sortedType) => {
    const definition = definitionsMap.get(sortedType);
    if (definition) {
      sortedDefinitions.push(definition);
      definitionsMap.delete(sortedType);
    }
  });

  // Definitions that are left in the map were not included in sorted list
  // Add them to notSortedDefinitions.
  definitionsMap.forEach(definition => notSortedDefinitions.push(definition));

  const newDefinitions = [...sortedDefinitions, ...notSortedDefinitions];

  if (newDefinitions.length !== astDefinitions.length) {
    throw new Error(
      `Unexpected definition length after sorting: want ${astDefinitions.length} but got ${newDefinitions.length}`,
    );
  }

  return {
    ...ast,
    definitions: newDefinitions as ReadonlyArray<DefinitionNode>,
  };
}

function hasNameField(node: ASTNode): node is DefinitionNode & { name?: NameNode } {
  return 'name' in node;
}

/**
 * [Re-implemented topsort function][topsort-ref] with cycle handling. This version iterates over
 * all nodes in the graph to ensure every node is visited, even if the graph contains cycles.
 *
 * [topsort-ref]: https://github.com/dagrejs/graphlib/blob/8d27cb89029081c72eb89dde652602805bdd0a34/lib/alg/topsort.js
 */
export function topsort(g: Graph): string[] {
  const visited = new Set<string>();
  const results: Array<string> = [];

  function visit(node: string) {
    if (visited.has(node))
      return;
    visited.add(node);
    // Recursively visit all predecessors of the node.
    g.predecessors(node)?.forEach(visit);
    results.push(node);
  }

  // Visit every node in the graph (instead of only sinks)
  g.nodes().forEach(visit);

  return results.reverse();
}

export function isGeneratedByIntrospection(schema: GraphQLSchema): boolean {
  return Object.entries(schema.getTypeMap())
    .filter(([name, type]) => !name.startsWith('__') && !isSpecifiedScalarType(type))
    .every(([, type]) => type.astNode === undefined)
}

// https://spec.graphql.org/October2021/#EscapedCharacter
const escapeMap: { [key: string]: string } = {
  '\"': '\\\"',
  '\\': '\\\\',
  '\/': '\\/',
  '\b': '\\b',
  '\f': '\\f',
  '\n': '\\n',
  '\r': '\\r',
  '\t': '\\t',
};

export function escapeGraphQLCharacters(input: string): string {
  // eslint-disable-next-line regexp/no-escape-backspace
  return input.replace(/["\\/\f\n\r\t\b]/g, match => escapeMap[match]);
}
