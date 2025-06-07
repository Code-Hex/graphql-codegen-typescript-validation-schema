import {
    GraphQLSchema,
    GraphQLNamedType,
    getNamedType,
    isObjectType,
    isInputObjectType,
    isInterfaceType,
    isUnionType,
    GraphQLType,
} from 'graphql';

export function findCircularTypes(schema: GraphQLSchema): Set<string> {
    const circular = new Set<string>();
    const visited = new Set<string>();
    const stack = new Set<string>();

    function visit(typeName: string): void {
        if (stack.has(typeName)) {
            circular.add(typeName);
            return;
        }

        if (visited.has(typeName)) {
            return;
        }

        visited.add(typeName);
        stack.add(typeName);

        const type: GraphQLNamedType | undefined = schema.getType(typeName);
        if (!type) {
            stack.delete(typeName);
            return;
        }

        if (isUnionType(type)) {
            for (const subtype of type.getTypes()) {
                visit(subtype.name);
            }
        } else if (
            isObjectType(type) ||
            isInputObjectType(type) ||
            isInterfaceType(type)
        ) {
            const fields = type.getFields();
            for (const field of Object.values(fields)) {
                const namedType = getNamedType(field.type as GraphQLType);
                visit(namedType.name);
            }
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
