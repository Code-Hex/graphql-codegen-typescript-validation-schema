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

const importZod = `import { z } from 'zod'`;
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
          .withName(`${anySchema}: z.ZodSchema<definedNonNullAny>`)
          .withContent(`z.any().refine((v) => isDefinedNonNullAny(v))`).string,
      ].join('\n'),
    InputObjectTypeDefinition: (node: InputObjectTypeDefinitionNode) => {
      const name = tsVisitor.convertName(node.name.value);
      importTypes.push(name);

      const shape = node.fields
        ?.map(field => generateInputObjectFieldYupSchema(config, tsVisitor, schema, field, 2))
        .join(',\n');

      return new DeclarationBlock({})
        .export()
        .asKind('function')
        .withName(`${name}Schema(): z.ZodSchema<${name}>`)
        .withBlock([indent(`return z.object({`), shape, indent('})')].join('\n')).string;
    },
    EnumTypeDefinition: (node: EnumTypeDefinitionNode) => {
      const enumname = tsVisitor.convertName(node.name.value);
      importTypes.push(enumname);

      if (config.enumsAsTypes) {
        return new DeclarationBlock({})
          .export()
          .asKind('const')
          .withName(`${enumname}Schema`)
          .withContent(`z.enum([${node.values?.map(enumOption => `'${enumOption.name.value}'`).join(', ')}])`).string;
      }

      return new DeclarationBlock({})
        .export()
        .asKind('const')
        .withName(`${enumname}Schema`)
        .withContent(`z.nativeEnum(${enumname})`).string;
    },
  };
};

const generateInputObjectFieldYupSchema = (
  config: ValidationSchemaPluginConfig,
  tsVisitor: TsVisitor,
  schema: GraphQLSchema,
  field: InputValueDefinitionNode,
  indentCount: number
): string => {
  let gen = generateInputObjectFieldTypeZodSchema(config, tsVisitor, schema, field.type);
  if (config.directives && field.directives) {
    const formatted = formatDirectiveConfig(config.directives);
    gen += buildApi(formatted, field.directives);
  }
  return indent(`${field.name.value}: ${maybeLazy(field.type, gen)}`, indentCount);
};

const generateInputObjectFieldTypeZodSchema = (
  config: ValidationSchemaPluginConfig,
  tsVisitor: TsVisitor,
  schema: GraphQLSchema,
  type: TypeNode,
  parentType?: TypeNode
): string => {
  if (isListType(type)) {
    const gen = generateInputObjectFieldTypeZodSchema(config, tsVisitor, schema, type.type, type);
    if (!isNonNullType(parentType)) {
      return `z.array(${maybeLazy(type.type, gen)}).nullish()`;
    }
    return `z.array(${maybeLazy(type.type, gen)})`;
  }
  if (isNonNullType(type)) {
    const gen = generateInputObjectFieldTypeZodSchema(config, tsVisitor, schema, type.type, type);
    return maybeLazy(type.type, gen);
  }
  if (isNamedType(type)) {
    const gen = generateNameNodeZodSchema(tsVisitor, schema, type.name);
    if (isNonNullType(parentType)) {
      if (config.notAllowEmptyString === true) {
        const tsType = tsVisitor.scalars[type.name.value];
        if (tsType === 'string') return `${gen}.min(1)`;
      }
      return gen;
    }
    if (isListType(parentType)) {
      return `${gen}.nullable()`;
    }
    return `${gen}.nullish()`;
  }
  console.warn('unhandled type:', type);
  return '';
};

const generateNameNodeZodSchema = (tsVisitor: TsVisitor, schema: GraphQLSchema, node: NameNode): string => {
  const typ = schema.getType(node.value);

  if (typ && typ.astNode?.kind === 'InputObjectTypeDefinition') {
    const enumName = tsVisitor.convertName(typ.astNode.name.value);
    return `${enumName}Schema()`;
  }

  if (typ && typ.astNode?.kind === 'EnumTypeDefinition') {
    const enumName = tsVisitor.convertName(typ.astNode.name.value);
    return `${enumName}Schema`;
  }

  return zod4Scalar(tsVisitor, node.value);
};

const maybeLazy = (type: TypeNode, schema: string): string => {
  if (isNamedType(type) && isInput(type.name.value)) {
    return `z.lazy(() => ${schema})`;
  }
  return schema;
};

const zod4Scalar = (tsVisitor: TsVisitor, scalarName: string): string => {
  const tsType = tsVisitor.scalars[scalarName];
  switch (tsType) {
    case 'string':
      return `z.string()`;
    case 'number':
      return `z.number()`;
    case 'boolean':
      return `z.boolean()`;
  }
  console.warn('unhandled name:', scalarName);
  return anySchema;
};
