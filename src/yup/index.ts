import { isInput, isNonNullType, isListType, isNamedType, ObjectTypeDefinitionBuilder } from './../graphql';
import { ValidationSchemaPluginConfig } from '../config';
import {
  InputValueDefinitionNode,
  NameNode,
  TypeNode,
  GraphQLSchema,
  InputObjectTypeDefinitionNode,
  EnumTypeDefinitionNode,
  ObjectTypeDefinitionNode,
  FieldDefinitionNode,
  UnionTypeDefinitionNode,
} from 'graphql';
import { DeclarationBlock, indent } from '@graphql-codegen/visitor-plugin-common';
import { TsVisitor } from '@graphql-codegen/typescript';
import { buildApi, formatDirectiveConfig } from '../directive';
import { SchemaVisitor } from '../types';

const importYup = `import * as yup from 'yup'`;

export const YupSchemaVisitor = (schema: GraphQLSchema, config: ValidationSchemaPluginConfig): SchemaVisitor => {
  const tsVisitor = new TsVisitor(schema, config);

  const importTypes: string[] = [];

  return {
    buildImports: (): string[] => {
      if (config.importFrom && importTypes.length > 0) {
        return [importYup, `import { ${importTypes.join(', ')} } from '${config.importFrom}'`];
      }
      return [importYup];
    },
    initialEmit: (): string => {
      if (!config.withObjectType) return '';
      return (
        '\n' +
        new DeclarationBlock({})
          .asKind('function')
          .withName('union<T extends {}>(...schemas: ReadonlyArray<yup.Schema<T>>): yup.MixedSchema<T>')
          .withBlock(
            [
              indent('return yup.mixed<T>().test({'),
              indent('test: (value) => schemas.some((schema) => schema.isValidSync(value))', 2),
              indent('}).defined()'),
            ].join('\n')
          ).string
      );
    },
    InputObjectTypeDefinition: {
      leave: (node: InputObjectTypeDefinitionNode) => {
        const name = tsVisitor.convertName(node.name.value);
        importTypes.push(name);

        const shape = node.fields
          ?.map(field => {
            const fieldSchema = generateFieldYupSchema(config, tsVisitor, schema, field, 2);
            return isNonNullType(field.type) ? fieldSchema : `${fieldSchema}.optional()`;
          })
          .join(',\n');

        return new DeclarationBlock({})
          .export()
          .asKind('function')
          .withName(`${name}Schema(): yup.ObjectSchema<${name}>`)
          .withBlock([indent(`return yup.object({`), shape, indent('})')].join('\n')).string;
      },
    },
    ObjectTypeDefinition: {
      leave: ObjectTypeDefinitionBuilder(config.withObjectType, (node: ObjectTypeDefinitionNode) => {
        const name = tsVisitor.convertName(node.name.value);
        importTypes.push(name);

        const shape = node.fields
          ?.map(field => {
            const fieldSchema = generateFieldYupSchema(config, tsVisitor, schema, field, 2);
            return isNonNullType(field.type) ? fieldSchema : `${fieldSchema}.optional()`;
          })
          .join(',\n');

        return new DeclarationBlock({})
          .export()
          .asKind('function')
          .withName(`${name}Schema(): yup.ObjectSchema<${name}>`)
          .withBlock(
            [
              indent(`return yup.object({`),
              indent(`__typename: yup.string<'${node.name.value}'>().optional(),`, 2),
              shape,
              indent('})'),
            ].join('\n')
          ).string;
      }),
    },
    EnumTypeDefinition: {
      leave: (node: EnumTypeDefinitionNode) => {
        const enumname = tsVisitor.convertName(node.name.value);
        importTypes.push(enumname);

        if (config.enumsAsTypes) {
          const enums = node.values?.map(enumOption => `'${enumOption.name.value}'`);

          return new DeclarationBlock({})
            .export()
            .asKind('const')
            .withName(`${enumname}Schema`)
            .withContent(`yup.string().oneOf([${enums?.join(', ')}]).defined()`).string;
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
          .withContent(`yup.string<${enumname}>().oneOf([${values}]).defined()`).string;
      },
    },
    UnionTypeDefinition: {
      leave: (node: UnionTypeDefinitionNode) => {
        if (!node.types || !config.withObjectType) return;

        const unionName = tsVisitor.convertName(node.name.value);
        importTypes.push(unionName);

        const unionElements = node.types
          ?.map(t => {
            const element = tsVisitor.convertName(t.name.value);
            const typ = schema.getType(t.name.value);
            if (typ?.astNode?.kind === 'EnumTypeDefinition') {
              return `${element}Schema`;
            }
            return `${element}Schema()`;
          })
          .join(', ');
        const union = indent(`return union<${unionName}>(${unionElements})`);

        return new DeclarationBlock({})
          .export()
          .asKind('function')
          .withName(`${unionName}Schema(): yup.MixedSchema<${unionName}>`)
          .withBlock(union).string;
      },
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

const generateFieldYupSchema = (
  config: ValidationSchemaPluginConfig,
  tsVisitor: TsVisitor,
  schema: GraphQLSchema,
  field: InputValueDefinitionNode | FieldDefinitionNode,
  indentCount: number
): string => {
  let gen = generateFieldTypeYupSchema(config, tsVisitor, schema, field.type);
  if (config.directives && field.directives) {
    const formatted = formatDirectiveConfig(config.directives);
    gen += buildApi(formatted, field.directives);
  }
  return indent(`${field.name.value}: ${maybeLazy(field.type, gen)}`, indentCount);
};

const generateFieldTypeYupSchema = (
  config: ValidationSchemaPluginConfig,
  tsVisitor: TsVisitor,
  schema: GraphQLSchema,
  type: TypeNode,
  parentType?: TypeNode
): string => {
  if (isListType(type)) {
    const gen = generateFieldTypeYupSchema(config, tsVisitor, schema, type.type, type);
    if (!isNonNullType(parentType)) {
      return `yup.array(${maybeLazy(type.type, gen)}).defined().nullable()`;
    }
    return `yup.array(${maybeLazy(type.type, gen)}).defined()`;
  }
  if (isNonNullType(type)) {
    const gen = generateFieldTypeYupSchema(config, tsVisitor, schema, type.type, type);
    return maybeLazy(type.type, gen);
  }
  if (isNamedType(type)) {
    const gen = generateNameNodeYupSchema(config, tsVisitor, schema, type.name);
    if (isNonNullType(parentType)) {
      if (config.notAllowEmptyString === true) {
        const tsType = tsVisitor.scalars[type.name.value];
        if (tsType === 'string') return `${gen}.required()`;
      }
      return `${gen}.nonNullable()`;
    }
    const typ = schema.getType(type.name.value);
    if (typ?.astNode?.kind === 'InputObjectTypeDefinition') {
      return `${gen}`;
    }
    return `${gen}.nullable()`;
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

  if (typ?.astNode?.kind === 'InputObjectTypeDefinition') {
    const enumName = tsVisitor.convertName(typ.astNode.name.value);
    return `${enumName}Schema()`;
  }

  if (typ?.astNode?.kind === 'ObjectTypeDefinition') {
    const enumName = tsVisitor.convertName(typ.astNode.name.value);
    return `${enumName}Schema()`;
  }

  if (typ?.astNode?.kind === 'EnumTypeDefinition') {
    const enumName = tsVisitor.convertName(typ.astNode.name.value);
    return `${enumName}Schema`;
  }

  if (typ?.astNode?.kind === 'UnionTypeDefinition') {
    const enumName = tsVisitor.convertName(typ.astNode.name.value);
    return `${enumName}Schema()`;
  }

  const primitive = yup4Scalar(config, tsVisitor, node.value);
  return primitive;
};

const maybeLazy = (type: TypeNode, schema: string): string => {
  if (isNamedType(type) && isInput(type.name.value)) {
    // https://github.com/jquense/yup/issues/1283#issuecomment-786559444
    return `yup.lazy(() => ${schema})`;
  }
  return schema;
};

const yup4Scalar = (config: ValidationSchemaPluginConfig, tsVisitor: TsVisitor, scalarName: string): string => {
  if (config.scalarSchemas?.[scalarName]) {
    return `${config.scalarSchemas[scalarName]}.defined()`;
  }
  const tsType = tsVisitor.scalars[scalarName];
  switch (tsType) {
    case 'string':
      return `yup.string().defined()`;
    case 'number':
      return `yup.number().defined()`;
    case 'boolean':
      return `yup.boolean().defined()`;
  }
  console.warn('unhandled name:', scalarName);
  return `yup.mixed()`;
};
