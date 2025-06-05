import { getNamedType, GraphQLNamedType, isObjectType, isInputObjectType } from 'graphql';

export function findCircularTypes(schema: GraphQLSchema): Set<string> {
  const circular = new Set<string>();
  const visited = new Set<string>();
  const stack = new Set<string>();

  function visit(typeName: string) {
    if (stack.has(typeName)) {
      circular.add(typeName);
      return;
    }
    if (visited.has(typeName)) return;
    visited.add(typeName);
    stack.add(typeName);

    const type = schema.getType(typeName);
    if (!type || !(isObjectType(type) || isInputObjectType(type))) {
      stack.delete(typeName);
      return;
    }

    const fields = type.getFields();
    for (const field of Object.values(fields)) {
      const fieldType = getNamedType(field.type);
      visit(fieldType.name);
    }

    stack.delete(typeName);
  }

  for (const type of Object.values(schema.getTypeMap())) {
    if (!type.name.startsWith('__')) {
      visit(type.name);
    }
  }

  return circular;
}
