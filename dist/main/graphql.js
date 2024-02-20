"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isGeneratedByIntrospection = exports.topsort = exports.topologicalSortAST = exports.ObjectTypeDefinitionBuilder = exports.isInput = exports.isNamedType = exports.isNonNullType = exports.isListType = void 0;
const graphlib_1 = require("graphlib");
const graphql_1 = require("graphql");
const isListType = (typ) => (typ === null || typ === void 0 ? void 0 : typ.kind) === 'ListType';
exports.isListType = isListType;
const isNonNullType = (typ) => (typ === null || typ === void 0 ? void 0 : typ.kind) === 'NonNullType';
exports.isNonNullType = isNonNullType;
const isNamedType = (typ) => (typ === null || typ === void 0 ? void 0 : typ.kind) === 'NamedType';
exports.isNamedType = isNamedType;
const isInput = (kind) => kind.includes('Input');
exports.isInput = isInput;
const ObjectTypeDefinitionBuilder = (useObjectTypes, callback) => {
    if (!useObjectTypes)
        return undefined;
    return node => {
        if (/^(Query|Mutation|Subscription)$/.test(node.name.value)) {
            return;
        }
        return callback(node);
    };
};
exports.ObjectTypeDefinitionBuilder = ObjectTypeDefinitionBuilder;
const topologicalSortAST = (schema, ast) => {
    const dependencyGraph = new graphlib_1.Graph();
    const targetKinds = [
        'ObjectTypeDefinition',
        'InputObjectTypeDefinition',
        'EnumTypeDefinition',
        'UnionTypeDefinition',
        'ScalarTypeDefinition',
    ];
    (0, graphql_1.visit)(ast, {
        enter: node => {
            var _a;
            switch (node.kind) {
                case 'ObjectTypeDefinition':
                case 'InputObjectTypeDefinition': {
                    const typeName = node.name.value;
                    dependencyGraph.setNode(typeName);
                    if (node.fields) {
                        node.fields.forEach(field => {
                            var _a;
                            if (field.type.kind === 'NamedType') {
                                const dependency = field.type.name.value;
                                const typ = schema.getType(dependency);
                                if (((_a = typ === null || typ === void 0 ? void 0 : typ.astNode) === null || _a === void 0 ? void 0 : _a.kind) === undefined || !targetKinds.includes(typ.astNode.kind)) {
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
                    (_a = node.types) === null || _a === void 0 ? void 0 : _a.forEach(type => {
                        var _a;
                        const dependency = type.name.value;
                        const typ = schema.getType(dependency);
                        if (((_a = typ === null || typ === void 0 ? void 0 : typ.astNode) === null || _a === void 0 ? void 0 : _a.kind) === undefined || !targetKinds.includes(typ.astNode.kind)) {
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
    const sorted = (0, exports.topsort)(dependencyGraph);
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
    return Object.assign(Object.assign({}, ast), { definitions: newDefinitions });
};
exports.topologicalSortAST = topologicalSortAST;
const hasNameField = (node) => {
    return 'name' in node;
};
// Re-implemented w/o CycleException version
// https://github.com/dagrejs/graphlib/blob/8d27cb89029081c72eb89dde652602805bdd0a34/lib/alg/topsort.js
const topsort = (g) => {
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
exports.topsort = topsort;
const isGeneratedByIntrospection = (schema) => Object.entries(schema.getTypeMap())
    .filter(([name, type]) => !name.startsWith('__') && !(0, graphql_1.isSpecifiedScalarType)(type))
    .every(([, type]) => type.astNode === undefined);
exports.isGeneratedByIntrospection = isGeneratedByIntrospection;
