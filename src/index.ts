import { PluginFunction, Types } from '@graphql-codegen/plugin-helpers';
import { transformSchemaAST } from '@graphql-codegen/schema-ast';
import { GraphQLSchema, visit } from 'graphql';

import { ValidationSchemaPluginConfig } from './config';
import { topologicalSortAST } from './graphql';
import { MyZodSchemaVisitor } from './myzod/index';
import { SchemaVisitor } from './types';
import { YupSchemaVisitor } from './yup/index';
import { ZodSchemaVisitor } from './zod/index';

export const plugin: PluginFunction<ValidationSchemaPluginConfig, Types.ComplexPluginOutput> = (
  schema: GraphQLSchema,
  _documents: Types.DocumentFile[],
  config: ValidationSchemaPluginConfig
): Types.ComplexPluginOutput => {
  const { schema: _schema, ast } = _transformSchemaAST(schema, config);
  const { buildImports, initialEmit, ...visitor } = schemaVisitor(_schema, config);

  const result = visit(ast, visitor);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const generated = result.definitions.filter(def => typeof def === 'string');

  return {
    prepend: buildImports(),
    content: [initialEmit(), ...generated].join('\n'),
  };
};

const schemaVisitor = (schema: GraphQLSchema, config: ValidationSchemaPluginConfig): SchemaVisitor => {
  if (config?.schema === 'zod') {
    return ZodSchemaVisitor(schema, config);
  } else if (config?.schema === 'myzod') {
    return MyZodSchemaVisitor(schema, config);
  }
  return YupSchemaVisitor(schema, config);
};

const _transformSchemaAST = (schema: GraphQLSchema, config: ValidationSchemaPluginConfig) => {
  const { schema: _schema, ast } = transformSchemaAST(schema, config);
  // This affects the performance of code generation, so it is
  // enabled only when this option is selected.
  if (config.validationSchemaExportType === 'const') {
    return {
      schema: _schema,
      ast: topologicalSortAST(_schema, ast),
    };
  }
  return {
    schema: _schema,
    ast,
  };
};
