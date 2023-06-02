import { DeclarationBlock, indent } from '@graphql-codegen/visitor-plugin-common';
import {
  EnumTypeDefinitionNode,
  FieldDefinitionNode,
  GraphQLSchema,
  InputObjectTypeDefinitionNode,
  InputValueDefinitionNode,
  NameNode,
  ObjectTypeDefinitionNode,
  TypeNode,
  UnionTypeDefinitionNode,
} from 'graphql';
import { ValidationSchemaPluginConfig } from '../config';
import { buildApi, formatDirectiveConfig } from '../directive';
import { SchemaVisitor } from '../types';
import { Visitor } from '../visitor';
import { ObjectTypeDefinitionBuilder, isInput, isListType, isNamedType, isNonNullType } from './../graphql';

const importZod = `import { z } from 'zod'`;
const anySchema = `definedNonNullAnySchema`;

export const ZodSchemaVisitor = (schema: GraphQLSchema, config: ValidationSchemaPluginConfig): SchemaVisitor => {
  const importTypes: string[] = [];
  const enumDeclarations: string[] = [];

  return {
    buildImports: (): string[] => {
      if (config.importFrom && importTypes.length > 0) {
        return [
          importZod,
          `import ${config.useTypeImports ? 'type ' : ''}{ ${importTypes.join(', ')} } from '${config.importFrom}'`,
        ];
      }
      return [importZod];
    },
    initialEmit: (): string =>
      '\n' +
      [
        new DeclarationBlock({})
          .asKind('type')
          .withName('Properties<T>')
          .withContent(['Required<{', '  [K in keyof T]: z.ZodType<T[K], any, T[K]>;', '}>'].join('\n')).string,
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
        ...enumDeclarations,
      ].join('\n'),
    InputObjectTypeDefinition: {
      leave: (node: InputObjectTypeDefinitionNode) => {
        const visitor = new Visitor('input', schema, config);
        const name = visitor.convertName(node.name.value);
        importTypes.push(name);

        const shape = node.fields?.map(field => generateFieldZodSchema(config, visitor, field, 2)).join(',\n');

        switch (config.validationSchemaExportType) {
          case 'const':
            return new DeclarationBlock({})
              .export()
              .asKind('const')
              .withName(`${name}Schema: z.ZodObject<Properties<${name}>>`)
              .withContent(['z.object({', shape, '})'].join('\n')).string;

          case 'function':
          default:
            return new DeclarationBlock({})
              .export()
              .asKind('function')
              .withName(`${name}Schema(): z.ZodObject<Properties<${name}>>`)
              .withBlock([indent(`return z.object({`), shape, indent('})')].join('\n')).string;
        }
      },
    },
    ObjectTypeDefinition: {
      leave: ObjectTypeDefinitionBuilder(config.withObjectType, (node: ObjectTypeDefinitionNode) => {
        const visitor = new Visitor('output', schema, config);
        const name = visitor.convertName(node.name.value);
        importTypes.push(name);

        const shape = node.fields?.map(field => generateFieldZodSchema(config, visitor, field, 2)).join(',\n');

        switch (config.validationSchemaExportType) {
          case 'const':
            return new DeclarationBlock({})
              .export()
              .asKind('const')
              .withName(`${name}Schema: z.ZodObject<Properties<${name}>>`)
              .withContent(
                [`z.object({`, indent(`__typename: z.literal('${node.name.value}').optional(),`, 2), shape, '})'].join(
                  '\n'
                )
              ).string;

          case 'function':
          default:
            return new DeclarationBlock({})
              .export()
              .asKind('function')
              .withName(`${name}Schema(): z.ZodObject<Properties<${name}>>`)
              .withBlock(
                [
                  indent(`return z.object({`),
                  indent(`__typename: z.literal('${node.name.value}').optional(),`, 2),
                  shape,
                  indent('})'),
                ].join('\n')
              ).string;
        }
      }),
    },
    EnumTypeDefinition: {
      leave: (node: EnumTypeDefinitionNode) => {
        const visitor = new Visitor('both', schema, config);
        const enumname = visitor.convertName(node.name.value);
        importTypes.push(enumname);

        // hoist enum declarations
        enumDeclarations.push(
          config.enumsAsTypes
            ? new DeclarationBlock({})
                .export()
                .asKind('const')
                .withName(`${enumname}Schema`)
                .withContent(`z.enum([${node.values?.map(enumOption => `'${enumOption.name.value}'`).join(', ')}])`)
                .string
            : new DeclarationBlock({})
                .export()
                .asKind('const')
                .withName(`${enumname}Schema`)
                .withContent(`z.nativeEnum(${enumname})`).string
        );
      },
    },
    UnionTypeDefinition: {
      leave: (node: UnionTypeDefinitionNode) => {
        if (!node.types || !config.withObjectType) return;
        const visitor = new Visitor('output', schema, config);
        const unionName = visitor.convertName(node.name.value);
        const unionElements = node.types
          .map(t => {
            const element = visitor.convertName(t.name.value);
            const typ = visitor.getType(t.name.value);
            if (typ?.astNode?.kind === 'EnumTypeDefinition') {
              return `${element}Schema`;
            }
            switch (config.validationSchemaExportType) {
              case 'const':
                return `${element}Schema`;
              case 'function':
              default:
                return `${element}Schema()`;
            }
          })
          .join(', ');
        const unionElementsCount = node.types.length ?? 0;

        const union =
          unionElementsCount > 1 ? indent(`return z.union([${unionElements}])`) : indent(`return ${unionElements}`);

        switch (config.validationSchemaExportType) {
          case 'const':
            return new DeclarationBlock({}).export().asKind('const').withName(`${unionName}Schema`).withBlock(union)
              .string;
          case 'function':
          default:
            return new DeclarationBlock({})
              .export()
              .asKind('function')
              .withName(`${unionName}Schema()`)
              .withBlock(union).string;
        }
      },
    },
  };
};

const generateFieldZodSchema = (
  config: ValidationSchemaPluginConfig,
  visitor: Visitor,
  field: InputValueDefinitionNode | FieldDefinitionNode,
  indentCount: number
): string => {
  const gen = generateFieldTypeZodSchema(config, visitor, field, field.type);
  return indent(`${field.name.value}: ${maybeLazy(field.type, gen)}`, indentCount);
};

const generateFieldTypeZodSchema = (
  config: ValidationSchemaPluginConfig,
  visitor: Visitor,
  field: InputValueDefinitionNode | FieldDefinitionNode,
  type: TypeNode,
  parentType?: TypeNode
): string => {
  if (isListType(type)) {
    const gen = generateFieldTypeZodSchema(config, visitor, field, type.type, type);
    if (!isNonNullType(parentType)) {
      const arrayGen = `z.array(${maybeLazy(type.type, gen)})`;
      const maybeLazyGen = applyDirectives(config, field, arrayGen);
      return `${maybeLazyGen}.nullish()`;
    }
    return `z.array(${maybeLazy(type.type, gen)})`;
  }
  if (isNonNullType(type)) {
    const gen = generateFieldTypeZodSchema(config, visitor, field, type.type, type);
    return maybeLazy(type.type, gen);
  }
  if (isNamedType(type)) {
    const gen = generateNameNodeZodSchema(config, visitor, type.name);
    if (isListType(parentType)) {
      return `${gen}.nullable()`;
    }
    const appliedDirectivesGen = applyDirectives(config, field, gen);
    if (isNonNullType(parentType)) {
      if (config.notAllowEmptyString === true) {
        const tsType = visitor.getScalarType(type.name.value);
        if (tsType === 'string') return `${appliedDirectivesGen}.min(1)`;
      }
      return appliedDirectivesGen;
    }
    if (isListType(parentType)) {
      return `${appliedDirectivesGen}.nullable()`;
    }
    return `${appliedDirectivesGen}.nullish()`;
  }
  console.warn('unhandled type:', type);
  return '';
};

const applyDirectives = (
  config: ValidationSchemaPluginConfig,
  field: InputValueDefinitionNode | FieldDefinitionNode,
  gen: string
): string => {
  if (config.directives && field.directives) {
    const formatted = formatDirectiveConfig(config.directives);
    return gen + buildApi(formatted, field.directives);
  }
  return gen;
};

const generateNameNodeZodSchema = (config: ValidationSchemaPluginConfig, visitor: Visitor, node: NameNode): string => {
  const converter = visitor.getNameNodeConverter(node);

  switch (converter?.targetKind) {
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

const maybeLazy = (type: TypeNode, schema: string): string => {
  if (isNamedType(type) && isInput(type.name.value)) {
    return `z.lazy(() => ${schema})`;
  }
  return schema;
};

const zod4Scalar = (config: ValidationSchemaPluginConfig, visitor: Visitor, scalarName: string): string => {
  if (config.scalarSchemas?.[scalarName]) {
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
