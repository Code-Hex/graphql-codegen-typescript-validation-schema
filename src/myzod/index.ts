import { isInput, isNonNullType, isListType, isNamedType } from './../graphql';
import { ValidationSchemaPluginConfig } from '../config';
import {
  InputValueDefinitionNode,
  NameNode,
  TypeNode,
  GraphQLSchema,
  InputObjectTypeDefinitionNode,
  EnumTypeDefinitionNode,
} from 'graphql';
import { DeclarationBlock, indent } from '@graphql-codegen/visitor-plugin-common';
import { TsVisitor } from '@graphql-codegen/typescript';
import { buildApi, formatDirectiveConfig } from '../directive';

const importZod = `import myzod from 'myzod'`;
const anySchema = `definedNonNullAnySchema`;

export const ZodSchemaVisitor = (schema: GraphQLSchema, config: ValidationSchemaPluginConfig) => {
  const tsVisitor = new TsVisitor(schema, config);

  const importTypes: string[] = [];

  return {
    buildImports: (): string[] => {
      if (config.importFrom && importTypes.length > 0) {
        return [importZod, `import { ${importTypes.join(', ')} } from '${config.importFrom}'`];
      }
      return [importZod];
    },

    initialEmit: (): string =>
      '\n' +
      [
        /*
        * MyZod allows you to create typed objects with `myzod.Type<YourCustomType>`
        * See https://www.npmjs.com/package/myzod#lazy
        new DeclarationBlock({})
          .asKind('type')
          .withName('Properties<T>')
          .withContent(['Required<{', '  [K in keyof T]: z.ZodType<T[K], any, T[K]>;', '}>'].join('\n')).string,
       */
        /* 
        * MyZod allows empty object hence no need for these hacks
        * See https://www.npmjs.com/package/myzod#object
        // Unfortunately, zod doesn’t provide non-null defined any schema.
        // This is a temporary hack until it is fixed.
        // see: https://github.com/colinhacks/zod/issues/884
        new DeclarationBlock({}).asKind('type').withName('definedNonNullAny').withContent('{}').string,
        new DeclarationBlock({})
          .export()
          .asKind('const')
          .withName(`isDefinedNonNullAny`)
          .withContent(`(v: any): v is definedNonNullAny => v !== undefined && v !== null`).string,
        new DeclarationBlock({})
          .export()
          .asKind('const')
          .withName(`${anySchema}`)
          .withContent(`z.any().refine((v) => isDefinedNonNullAny(v))`).string,
     */
      ].join('\n'),
    InputObjectTypeDefinition: (node: InputObjectTypeDefinitionNode) => {
      const name = tsVisitor.convertName(node.name.value);
      importTypes.push(name);

      const shape = node.fields
        ?.map(field => generateInputObjectFieldMyZodSchema(config, tsVisitor, schema, field, 2))
        .join(',\n');

      return new DeclarationBlock({})
        .export()
        .asKind('const')
        .withName(`${name}Schema: myzod.Type<${name}>`) //TODO: Test this
        .withBlock([indent(`myzod.object({`), shape, indent('})')].join('\n')).string;
    },
    EnumTypeDefinition: (node: EnumTypeDefinitionNode) => {
      const enumname = tsVisitor.convertName(node.name.value);
      importTypes.push(enumname);
      /* 
      if (config.enumsAsTypes) {
        return new DeclarationBlock({})
          .export()
          .asKind('const')
          .withName(`${enumname}Schema`)
          .withContent(`z.enum([${node.values?.map(enumOption => `'${enumOption.name.value}'`).join(', ')}])`).string;
      }
    */
      return new DeclarationBlock({})
        .export()
        .asKind('const')
        .withName(`${enumname}Schema`)
        .withContent(`myzod.enum(${enumname})`).string;
    },
  };
};

const generateInputObjectFieldMyZodSchema = (
  config: ValidationSchemaPluginConfig,
  tsVisitor: TsVisitor,
  schema: GraphQLSchema,
  field: InputValueDefinitionNode,
  indentCount: number
): string => {
  const gen = generateInputObjectFieldTypeMyZodSchema(config, tsVisitor, schema, field, field.type);
  return indent(`${field.name.value}: ${maybeLazy(field.type, gen)}`, indentCount);
};

const generateInputObjectFieldTypeMyZodSchema = (
  config: ValidationSchemaPluginConfig,
  tsVisitor: TsVisitor,
  schema: GraphQLSchema,
  field: InputValueDefinitionNode,
  type: TypeNode,
  parentType?: TypeNode
): string => {
  if (isListType(type)) {
    const gen = generateInputObjectFieldTypeMyZodSchema(config, tsVisitor, schema, field, type.type, type);
    if (!isNonNullType(parentType)) {
      const arrayGen = `myzod.array(${maybeLazy(type.type, gen)})`;
      const maybeLazyGen = applyDirectives(config, field, arrayGen);
      return `${maybeLazyGen}.optional()`; //  to make it equivalent to nullish: `${maybeLazyGen}.optional().optional().or(nullable())`;
    }
    return `myzod.array(${maybeLazy(type.type, gen)})`;
  }
  if (isNonNullType(type)) {
    const gen = generateInputObjectFieldTypeMyZodSchema(config, tsVisitor, schema, field, type.type, type);
    return maybeLazy(type.type, gen);
  }
  if (isNamedType(type)) {
    const gen = generateNameNodeMyZodSchema(config, tsVisitor, schema, type.name);
    if (isListType(parentType)) {
      return `${gen}.nullable()`; //TODO: Test this later
    }
    const appliedDirectivesGen = applyDirectives(config, field, gen);
    if (isNonNullType(parentType)) {
      if (config.notAllowEmptyString === true) {
        const tsType = tsVisitor.scalars[type.name.value];
        if (tsType === 'string') return `${gen}.min(1)`;
      }
      return appliedDirectivesGen;
    }
    if (isListType(parentType)) {
      return `${appliedDirectivesGen}.nullable()`; //TODO: Test this later
    }
    return `${appliedDirectivesGen}.optional()`; // to make it equivalent to nullish: `${appliedDirectivesGen}.optional().or(nullable())`;
  }
  console.warn('unhandled type:', type);
  return '';
};

// TODO: Find out how it works and implement it
const applyDirectives = (
  config: ValidationSchemaPluginConfig,
  field: InputValueDefinitionNode,
  gen: string
): string => {
  if (config.directives && field.directives) {
    const formatted = formatDirectiveConfig(config.directives);
    return gen + buildApi(formatted, field.directives);
  }
  return gen;
};

const generateNameNodeMyZodSchema = (
  config: ValidationSchemaPluginConfig,
  tsVisitor: TsVisitor,
  schema: GraphQLSchema,
  node: NameNode
): string => {
  const typ = schema.getType(node.value);

  if (typ && typ.astNode?.kind === 'InputObjectTypeDefinition') {
    const enumName = tsVisitor.convertName(typ.astNode.name.value);
    return `${enumName}Schema()`;
  }

  if (typ && typ.astNode?.kind === 'EnumTypeDefinition') {
    const enumName = tsVisitor.convertName(typ.astNode.name.value);
    return `${enumName}Schema`;
  }

  return zod4Scalar(config, tsVisitor, node.value);
};

const maybeLazy = (type: TypeNode, schema: string): string => {
  if (isNamedType(type) && isInput(type.name.value)) {
    return `myzod.lazy(() => ${schema})`;
  }
  return schema;
};

const zod4Scalar = (config: ValidationSchemaPluginConfig, tsVisitor: TsVisitor, scalarName: string): string => {
  if (config.scalarSchemas?.[scalarName]) {
    return config.scalarSchemas[scalarName];
  }
  const tsType = tsVisitor.scalars[scalarName];
  switch (tsType) {
    case 'string':
      return `myzod.string()`;
    case 'number':
      return `myzod.number()`;
    case 'boolean':
      return `myzod.boolean()`;
  }
  console.warn('unhandled name:', scalarName);
  return anySchema;
};
