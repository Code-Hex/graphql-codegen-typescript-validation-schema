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

const importYup = `import * as yup from 'yup'`;

export const YupSchemaVisitor = (schema: GraphQLSchema, config: ValidationSchemaPluginConfig) => {
  const tsVisitor = new TsVisitor(schema, config);

  const importTypes: string[] = [];

  return {
    buildImports: (): string[] => {
      if (config.importFrom && importTypes.length > 0) {
        return [importYup, `import { ${importTypes.join(', ')} } from '${config.importFrom}'`];
      }
      return [importYup];
    },
    initialEmit: (): string => '',
    InputObjectTypeDefinition: (node: InputObjectTypeDefinitionNode) => {
      const name = tsVisitor.convertName(node.name.value);
      importTypes.push(name);

      const shape = node.fields
        ?.map(field => generateInputObjectFieldYupSchema(config, tsVisitor, schema, field, 2))
        .join(',\n');

      return new DeclarationBlock({})
        .export()
        .asKind('function')
        .withName(`${name}Schema(): yup.SchemaOf<${name}>`)
        .withBlock([indent(`return yup.object({`), shape, indent('})')].join('\n')).string;
    },
    EnumTypeDefinition: (node: EnumTypeDefinitionNode) => {
      const enumname = tsVisitor.convertName(node.name.value);
      importTypes.push(enumname);

      if (config.enumsAsTypes) {
        return new DeclarationBlock({})
          .export()
          .asKind('const')
          .withName(`${enumname}Schema`)
          .withContent(
            `yup.mixed().oneOf([${node.values?.map(enumOption => `'${enumOption.name.value}'`).join(', ')}])`
          ).string;
      }

      const values = node.values
        ?.map(
          enumOption =>
            `${enumname}.${tsVisitor.convertName(enumOption.name, {
              useTypesPrefix: false,
              transformUnderscore: true,
            })}`
        )
        .join(', ');
      return new DeclarationBlock({})
        .export()
        .asKind('const')
        .withName(`${enumname}Schema`)
        .withContent(`yup.mixed().oneOf([${values}])`).string;
    },
    // ScalarTypeDefinition: (node) => {
    //   const decl = new DeclarationBlock({})
    //     .export()
    //     .asKind("const")
    //     .withName(`${node.name.value}Schema`);

    //   if (tsVisitor.scalars[node.name.value]) {
    //     const tsType = tsVisitor.scalars[node.name.value];
    //     switch (tsType) {
    //       case "string":
    //         return decl.withContent(`yup.string()`).string;
    //       case "number":
    //         return decl.withContent(`yup.number()`).string;
    //       case "boolean":
    //         return decl.withContent(`yup.boolean()`).string;
    //     }
    //   }
    //   return decl.withContent(`yup.mixed()`).string;
    // },
  };
};

const generateInputObjectFieldYupSchema = (
  config: ValidationSchemaPluginConfig,
  tsVisitor: TsVisitor,
  schema: GraphQLSchema,
  field: InputValueDefinitionNode,
  indentCount: number
): string => {
  let gen = generateInputObjectFieldTypeYupSchema(config, tsVisitor, schema, field.type);
  if (config.directives && field.directives) {
    const formatted = formatDirectiveConfig(config.directives);
    gen += buildApi(formatted, field.directives);
  }
  return indent(`${field.name.value}: ${maybeLazy(field.type, gen)}`, indentCount);
};

const generateInputObjectFieldTypeYupSchema = (
  config: ValidationSchemaPluginConfig,
  tsVisitor: TsVisitor,
  schema: GraphQLSchema,
  type: TypeNode,
  parentType?: TypeNode
): string => {
  if (isListType(type)) {
    const gen = generateInputObjectFieldTypeYupSchema(config, tsVisitor, schema, type.type, type);
    if (!isNonNullType(parentType)) {
      return `yup.array().of(${maybeLazy(type.type, gen)}).optional()`;
    }
    return `yup.array().of(${maybeLazy(type.type, gen)})`;
  }
  if (isNonNullType(type)) {
    const gen = generateInputObjectFieldTypeYupSchema(config, tsVisitor, schema, type.type, type);
    const nonNullGen = maybeNonEmptyString(config, tsVisitor, gen, type.type);
    return maybeLazy(type.type, nonNullGen);
  }
  if (isNamedType(type)) {
    return generateNameNodeYupSchema(config, tsVisitor, schema, type.name);
  }
  console.warn('unhandled type:', type);
  return '';
};

const generateNameNodeYupSchema = (
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

  const primitive = yup4Scalar(tsVisitor, node.value);
  return primitive;
};

const maybeLazy = (type: TypeNode, schema: string): string => {
  if (isNamedType(type) && isInput(type.name.value)) {
    // https://github.com/jquense/yup/issues/1283#issuecomment-786559444
    return `yup.lazy(() => ${schema}) as never`;
  }
  return schema;
};

const maybeNonEmptyString = (
  config: ValidationSchemaPluginConfig,
  tsVisitor: TsVisitor,
  schema: string,
  childType: TypeNode
): string => {
  if (!isNamedType(childType)) {
    return `${schema}.required()`;
  }
  const maybeScalarName = childType.name.value;
  const tsType = tsVisitor.scalars[maybeScalarName];
  if (!config.notAllowEmptyString && tsType === 'string') {
    return `${schema}.defined()`;
  }
  return `${schema}.required()`;
};

const yup4Scalar = (tsVisitor: TsVisitor, scalarName: string): string => {
  const tsType = tsVisitor.scalars[scalarName];
  switch (tsType) {
    case 'string':
      return `yup.string()`;
    case 'number':
      return `yup.number()`;
    case 'boolean':
      return `yup.boolean()`;
  }
  console.warn('unhandled name:', scalarName);
  return `yup.mixed()`;
};
