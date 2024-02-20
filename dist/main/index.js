"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = void 0;
const schema_ast_1 = require("@graphql-codegen/schema-ast");
const graphql_1 = require("graphql");
const graphql_2 = require("./graphql");
const index_1 = require("./myzod/index");
const index_2 = require("./yup/index");
const index_3 = require("./zod/index");
const plugin = (schema, _documents, config) => {
    const { schema: _schema, ast } = _transformSchemaAST(schema, config);
    const visitor = schemaVisitor(_schema, config);
    const result = (0, graphql_1.visit)(ast, visitor);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const generated = result.definitions.filter(def => typeof def === 'string');
    return {
        prepend: visitor.buildImports(),
        content: [visitor.initialEmit(), ...generated].join('\n'),
    };
};
exports.plugin = plugin;
const schemaVisitor = (schema, config) => {
    if ((config === null || config === void 0 ? void 0 : config.schema) === 'zod') {
        return new index_3.ZodSchemaVisitor(schema, config);
    }
    else if ((config === null || config === void 0 ? void 0 : config.schema) === 'myzod') {
        return new index_1.MyZodSchemaVisitor(schema, config);
    }
    return new index_2.YupSchemaVisitor(schema, config);
};
const _transformSchemaAST = (schema, config) => {
    const { schema: _schema, ast } = (0, schema_ast_1.transformSchemaAST)(schema, config);
    // See: https://github.com/Code-Hex/graphql-codegen-typescript-validation-schema/issues/394
    const __schema = (0, graphql_2.isGeneratedByIntrospection)(_schema) ? (0, graphql_1.buildSchema)((0, graphql_1.printSchema)(_schema)) : _schema;
    // This affects the performance of code generation, so it is
    // enabled only when this option is selected.
    if (config.validationSchemaExportType === 'const') {
        return {
            schema: __schema,
            ast: (0, graphql_2.topologicalSortAST)(__schema, ast),
        };
    }
    return {
        schema: __schema,
        ast,
    };
};
