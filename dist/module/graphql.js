import { Graph } from 'graphlib';
import { isSpecifiedScalarType, visit, } from 'graphql';
export const isListType = (typ) => typ?.kind === 'ListType';
export const isNonNullType = (typ) => typ?.kind === 'NonNullType';
export const isNamedType = (typ) => typ?.kind === 'NamedType';
export const isInput = (kind) => kind.includes('Input');
export const ObjectTypeDefinitionBuilder = (useObjectTypes, callback) => {
    if (!useObjectTypes)
        return undefined;
    return node => {
        if (/^(Query|Mutation|Subscription)$/.test(node.name.value)) {
            return;
        }
        return callback(node);
    };
};
export const topologicalSortAST = (schema, ast) => {
    const dependencyGraph = new Graph();
    const targetKinds = [
        'ObjectTypeDefinition',
        'InputObjectTypeDefinition',
        'EnumTypeDefinition',
        'UnionTypeDefinition',
        'ScalarTypeDefinition',
    ];
    visit(ast, {
        enter: node => {
            switch (node.kind) {
                case 'ObjectTypeDefinition':
                case 'InputObjectTypeDefinition': {
                    const typeName = node.name.value;
                    dependencyGraph.setNode(typeName);
                    if (node.fields) {
                        node.fields.forEach(field => {
                            if (field.type.kind === 'NamedType') {
                                const dependency = field.type.name.value;
                                const typ = schema.getType(dependency);
                                if (typ?.astNode?.kind === undefined || !targetKinds.includes(typ.astNode.kind)) {
                                    return;
                                }
                                if (!dependencyGraph.hasNode(dependency)) {
                                    dependencyGraph.setNode(dependency);
                                }
                                dependencyGraph.setEdge(typeName, dependency);
                            }
                        });
                    }
                    break;
                }
                case 'ScalarTypeDefinition':
                case 'EnumTypeDefinition': {
                    dependencyGraph.setNode(node.name.value);
                    break;
                }
                case 'UnionTypeDefinition': {
                    const dependency = node.name.value;
                    if (!dependencyGraph.hasNode(dependency)) {
                        dependencyGraph.setNode(dependency);
                    }
                    node.types?.forEach(type => {
                        const dependency = type.name.value;
                        const typ = schema.getType(dependency);
                        if (typ?.astNode?.kind === undefined || !targetKinds.includes(typ.astNode.kind)) {
                            return;
                        }
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
    const definitionsMap = new Map();
    // SCHEMA_DEFINITION does not have name.
    // https://spec.graphql.org/October2021/#sec-Schema
    const astDefinitions = ast.definitions.filter(def => def.kind !== 'SchemaDefinition');
    astDefinitions.forEach(definition => {
        if (hasNameField(definition) && definition.name) {
            definitionsMap.set(definition.name.value, definition);
        }
    });
    // Two arrays to store sorted and not sorted definitions.
    const sortedDefinitions = [];
    const notSortedDefinitions = [];
    // Iterate over sorted type names and retrieve their corresponding definitions.
    sorted.forEach(sortedType => {
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
        throw new Error(`unexpected definition length after sorted: want ${astDefinitions.length} but got ${newDefinitions.length}`);
    }
    return {
        ...ast,
        definitions: newDefinitions,
    };
};
const hasNameField = (node) => {
    return 'name' in node;
};
// Re-implemented w/o CycleException version
// https://github.com/dagrejs/graphlib/blob/8d27cb89029081c72eb89dde652602805bdd0a34/lib/alg/topsort.js
export const topsort = (g) => {
    const visited = {};
    const stack = {};
    const results = [];
    function visit(node) {
        if (!(node in visited)) {
            stack[node] = true;
            visited[node] = true;
            const predecessors = g.predecessors(node);
            if (Array.isArray(predecessors)) {
                predecessors.forEach(node => visit(node));
            }
            delete stack[node];
            results.push(node);
        }
    }
    g.sinks().forEach(node => visit(node));
    return results.reverse();
};
export const isGeneratedByIntrospection = (schema) => Object.entries(schema.getTypeMap())
    .filter(([name, type]) => !name.startsWith('__') && !isSpecifiedScalarType(type))
    .every(([, type]) => type.astNode === undefined);
