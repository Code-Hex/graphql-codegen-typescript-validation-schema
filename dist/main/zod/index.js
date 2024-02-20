"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodSchemaVisitor = void 0;
const visitor_plugin_common_1 = require("@graphql-codegen/visitor-plugin-common");
const graphql_1 = require("graphql");
const directive_1 = require("../directive");
const schema_visitor_1 = require("../schema_visitor");
const graphql_2 = require("./../graphql");
const anySchema = `definedNonNullAnySchema`;
class ZodSchemaVisitor extends schema_visitor_1.BaseSchemaVisitor {
    constructor(schema, config) {
        super(schema, config);
    }
    importValidationSchema() {
        return `import { z } from 'zod'`;
    }
    initialEmit() {
        return ('\n' +
            [
                new visitor_plugin_common_1.DeclarationBlock({})
                    .asKind('type')
                    .withName('Properties<T>')
                    .withContent(['Required<{', '  [K in keyof T]: z.ZodType<T[K], any, T[K]>;', '}>'].join('\n')).string,
                // Unfortunately, zod doesn’t provide non-null defined any schema.
                // This is a temporary hack until it is fixed.
                // see: https://github.com/colinhacks/zod/issues/884
                new visitor_plugin_common_1.DeclarationBlock({}).asKind('type').withName('definedNonNullAny').withContent('{}').string,
                new visitor_plugin_common_1.DeclarationBlock({})
                    .export()
                    .asKind('const')
                    .withName(`isDefinedNonNullAny`)
                    .withContent(`(v: any): v is definedNonNullAny => v !== undefined && v !== null`).string,
                new visitor_plugin_common_1.DeclarationBlock({})
                    .export()
                    .asKind('const')
                    .withName(`${anySchema}`)
                    .withContent(`z.any().refine((v) => isDefinedNonNullAny(v))`).string,
                ...this.enumDeclarations,
            ].join('\n'));
    }
    get InputObjectTypeDefinition() {
        return {
            leave: (node) => {
                var _a;
                const visitor = this.createVisitor('input');
                const name = visitor.convertName(node.name.value);
                this.importTypes.push(name);
                return this.buildInputFields((_a = node.fields) !== null && _a !== void 0 ? _a : [], visitor, name);
            },
        };
    }
    get ObjectTypeDefinition() {
        return {
            leave: (0, graphql_2.ObjectTypeDefinitionBuilder)(this.config.withObjectType, (node) => {
                var _a;
                const visitor = this.createVisitor('output');
                const name = visitor.convertName(node.name.value);
                this.importTypes.push(name);
                // Building schema for field arguments.
                const argumentBlocks = this.buildObjectTypeDefinitionArguments(node, visitor);
                const appendArguments = argumentBlocks ? '\n' + argumentBlocks : '';
                // Building schema for fields.
                const shape = (_a = node.fields) === null || _a === void 0 ? void 0 : _a.map(field => generateFieldZodSchema(this.config, visitor, field, 2)).join(',\n');
                switch (this.config.validationSchemaExportType) {
                    case 'const':
                        return (new visitor_plugin_common_1.DeclarationBlock({})
                            .export()
                            .asKind('const')
                            .withName(`${name}Schema: z.ZodObject<Properties<${name}>>`)
                            .withContent([
                            `z.object({`,
                            (0, visitor_plugin_common_1.indent)(`__typename: z.literal('${node.name.value}').optional(),`, 2),
                            shape,
                            '})',
                        ].join('\n')).string + appendArguments);
                    case 'function':
                    default:
                        return (new visitor_plugin_common_1.DeclarationBlock({})
                            .export()
                            .asKind('function')
                            .withName(`${name}Schema(): z.ZodObject<Properties<${name}>>`)
                            .withBlock([
                            (0, visitor_plugin_common_1.indent)(`return z.object({`),
                            (0, visitor_plugin_common_1.indent)(`__typename: z.literal('${node.name.value}').optional(),`, 2),
                            shape,
                            (0, visitor_plugin_common_1.indent)('})'),
                        ].join('\n')).string + appendArguments);
                }
            }),
        };
    }
    get EnumTypeDefinition() {
        return {
            leave: (node) => {
                var _a;
                const visitor = this.createVisitor('both');
                const enumname = visitor.convertName(node.name.value);
                this.importTypes.push(enumname);
                // hoist enum declarations
                this.enumDeclarations.push(this.config.enumsAsTypes
                    ? new visitor_plugin_common_1.DeclarationBlock({})
                        .export()
                        .asKind('const')
                        .withName(`${enumname}Schema`)
                        .withContent(`z.enum([${(_a = node.values) === null || _a === void 0 ? void 0 : _a.map(enumOption => `'${enumOption.name.value}'`).join(', ')}])`)
                        .string
                    : new visitor_plugin_common_1.DeclarationBlock({})
                        .export()
                        .asKind('const')
                        .withName(`${enumname}Schema`)
                        .withContent(`z.nativeEnum(${enumname})`).string);
            },
        };
    }
    get UnionTypeDefinition() {
        return {
            leave: (node) => {
                var _a;
                if (!node.types || !this.config.withObjectType)
                    return;
                const visitor = this.createVisitor('output');
                const unionName = visitor.convertName(node.name.value);
                const unionElements = node.types
                    .map(t => {
                    var _a;
                    const element = visitor.convertName(t.name.value);
                    const typ = visitor.getType(t.name.value);
                    if (((_a = typ === null || typ === void 0 ? void 0 : typ.astNode) === null || _a === void 0 ? void 0 : _a.kind) === 'EnumTypeDefinition') {
                        return `${element}Schema`;
                    }
                    switch (this.config.validationSchemaExportType) {
                        case 'const':
                            return `${element}Schema`;
                        case 'function':
                        default:
                            return `${element}Schema()`;
                    }
                })
                    .join(', ');
                const unionElementsCount = (_a = node.types.length) !== null && _a !== void 0 ? _a : 0;
                const union = unionElementsCount > 1 ? `z.union([${unionElements}])` : unionElements;
                switch (this.config.validationSchemaExportType) {
                    case 'const':
                        return new visitor_plugin_common_1.DeclarationBlock({}).export().asKind('const').withName(`${unionName}Schema`).withContent(union)
                            .string;
                    case 'function':
                    default:
                        return new visitor_plugin_common_1.DeclarationBlock({})
                            .export()
                            .asKind('function')
                            .withName(`${unionName}Schema()`)
                            .withBlock((0, visitor_plugin_common_1.indent)(`return ${union}`)).string;
                }
            },
        };
    }
    buildInputFields(fields, visitor, name) {
        const shape = fields.map(field => generateFieldZodSchema(this.config, visitor, field, 2)).join(',\n');
        switch (this.config.validationSchemaExportType) {
            case 'const':
                return new visitor_plugin_common_1.DeclarationBlock({})
                    .export()
                    .asKind('const')
                    .withName(`${name}Schema: z.ZodObject<Properties<${name}>>`)
                    .withContent(['z.object({', shape, '})'].join('\n')).string;
            case 'function':
            default:
                return new visitor_plugin_common_1.DeclarationBlock({})
                    .export()
                    .asKind('function')
                    .withName(`${name}Schema(): z.ZodObject<Properties<${name}>>`)
                    .withBlock([(0, visitor_plugin_common_1.indent)(`return z.object({`), shape, (0, visitor_plugin_common_1.indent)('})')].join('\n')).string;
        }
    }
}
exports.ZodSchemaVisitor = ZodSchemaVisitor;
const generateFieldZodSchema = (config, visitor, field, indentCount) => {
    const gen = generateFieldTypeZodSchema(config, visitor, field, field.type);
    return (0, visitor_plugin_common_1.indent)(`${field.name.value}: ${maybeLazy(field.type, gen)}`, indentCount);
};
const generateFieldTypeZodSchema = (config, visitor, field, type, parentType) => {
    if ((0, graphql_2.isListType)(type)) {
        const gen = generateFieldTypeZodSchema(config, visitor, field, type.type, type);
        if (!(0, graphql_2.isNonNullType)(parentType)) {
            const arrayGen = `z.array(${maybeLazy(type.type, gen)})`;
            const maybeLazyGen = applyDirectives(config, field, arrayGen);
            return `${maybeLazyGen}.nullish()`;
        }
        return `z.array(${maybeLazy(type.type, gen)})`;
    }
    if ((0, graphql_2.isNonNullType)(type)) {
        const gen = generateFieldTypeZodSchema(config, visitor, field, type.type, type);
        return maybeLazy(type.type, gen);
    }
    if ((0, graphql_2.isNamedType)(type)) {
        const gen = generateNameNodeZodSchema(config, visitor, type.name);
        if ((0, graphql_2.isListType)(parentType)) {
            return `${gen}.nullable()`;
        }
        let appliedDirectivesGen = applyDirectives(config, field, gen);
        if (field.kind === graphql_1.Kind.INPUT_VALUE_DEFINITION) {
            const { defaultValue } = field;
            if ((defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.kind) === graphql_1.Kind.INT || (defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.kind) === graphql_1.Kind.FLOAT || (defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.kind) === graphql_1.Kind.BOOLEAN) {
                appliedDirectivesGen = `${appliedDirectivesGen}.default(${defaultValue.value})`;
            }
            if ((defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.kind) === graphql_1.Kind.STRING || (defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.kind) === graphql_1.Kind.ENUM) {
                appliedDirectivesGen = `${appliedDirectivesGen}.default("${defaultValue.value}")`;
            }
        }
        if ((0, graphql_2.isNonNullType)(parentType)) {
            if (visitor.shouldEmitAsNotAllowEmptyString(type.name.value)) {
                return `${appliedDirectivesGen}.min(1)`;
            }
            return appliedDirectivesGen;
        }
        if ((0, graphql_2.isListType)(parentType)) {
            return `${appliedDirectivesGen}.nullable()`;
        }
        return `${appliedDirectivesGen}.nullish()`;
    }
    console.warn('unhandled type:', type);
    return '';
};
const applyDirectives = (config, field, gen) => {
    if (config.directives && field.directives) {
        const formatted = (0, directive_1.formatDirectiveConfig)(config.directives);
        return gen + (0, directive_1.buildApi)(formatted, field.directives);
    }
    return gen;
};
const generateNameNodeZodSchema = (config, visitor, node) => {
    const converter = visitor.getNameNodeConverter(node);
    switch (converter === null || converter === void 0 ? void 0 : converter.targetKind) {
        case 'InputObjectTypeDefinition':
        case 'ObjectTypeDefinition':
        case 'UnionTypeDefinition':
            // using switch-case rather than if-else to allow for future expansion
            switch (config.validationSchemaExportType) {
                case 'const':
                    return `${converter.convertName()}Schema`;
                case 'function':
                default:
                    return `${converter.convertName()}Schema()`;
            }
        case 'EnumTypeDefinition':
            return `${converter.convertName()}Schema`;
        default:
            return zod4Scalar(config, visitor, node.value);
    }
};
const maybeLazy = (type, schema) => {
    if ((0, graphql_2.isNamedType)(type) && (0, graphql_2.isInput)(type.name.value)) {
        return `z.lazy(() => ${schema})`;
    }
    return schema;
};
const zod4Scalar = (config, visitor, scalarName) => {
    var _a;
    if ((_a = config.scalarSchemas) === null || _a === void 0 ? void 0 : _a[scalarName]) {
        return config.scalarSchemas[scalarName];
    }
    const tsType = visitor.getScalarType(scalarName);
    switch (tsType) {
        case 'string':
            return `z.string()`;
        case 'number':
            return `z.number()`;
        case 'boolean':
            return `z.boolean()`;
    }
    console.warn('unhandled scalar name:', scalarName);
    return anySchema;
};
