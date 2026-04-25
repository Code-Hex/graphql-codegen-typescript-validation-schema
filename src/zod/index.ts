import type { Types } from '@graphql-codegen/plugin-helpers';
import type {
  ConstValueNode,
  EnumTypeDefinitionNode,
  FieldDefinitionNode,
  GraphQLSchema,
  InputObjectTypeDefinitionNode,
  InputObjectTypeExtensionNode,
  InputValueDefinitionNode,
  InterfaceTypeDefinitionNode,
  NameNode,
  ObjectTypeDefinitionNode,
  TypeNode,
  UnionTypeDefinitionNode,
} from 'graphql';

import type { ValidationSchemaPluginConfig } from '../config.js';
import type { Visitor } from '../visitor.js';
import { resolveExternalModuleAndFn } from '@graphql-codegen/plugin-helpers';
import { convertNameParts, DeclarationBlock, indent } from '@graphql-codegen/visitor-plugin-common';
import {
  isEnumType,
  isInputObjectType,
  isScalarType,
  Kind,
  valueFromASTUntyped,
} from 'graphql';
import { buildApi, formatDirectiveConfig } from '../directive.js';
import {
  escapeGraphQLCharacters,
  InterfaceTypeDefinitionBuilder,
  isListType,
  isNamedType,
  isNonNullType,
  ObjectTypeDefinitionBuilder,
} from '../graphql.js';
import { BaseSchemaVisitor } from '../schema_visitor.js';
import { buildZodOperationSchemas } from './operation.js';

const anySchema = `definedNonNullAnySchema`;

export class ZodSchemaVisitor extends BaseSchemaVisitor {
  constructor(schema: GraphQLSchema, config: ValidationSchemaPluginConfig) {
    super(schema, config);
  }

  importValidationSchema(): string {
    const importPath = this.config.zodImportPath || 'zod';
    return `import { z } from '${importPath}'`;
  }

  initialEmit(): string {
    return (
      `\n${
        [
          new DeclarationBlock({})
            .asKind('type')
            .withName('Properties<T>')
            .withContent(['Required<{', '  [K in keyof T]: z.ZodType<T[K]>;', '}>'].join('\n'))
            .string,
          // Unfortunately, zod doesn’t provide non-null defined any schema.
          // This is a temporary hack until it is fixed.
          // see: https://github.com/colinhacks/zod/issues/884
          new DeclarationBlock({}).asKind('type').withName('definedNonNullAny').withContent('{}').string,
          new DeclarationBlock({})
            .export()
            .asKind('const')
            .withName(`isDefinedNonNullAny`)
            .withContent(`(v: any): v is definedNonNullAny => v !== undefined && v !== null`)
            .string,
          new DeclarationBlock({})
            .export()
            .asKind('const')
            .withName(`${anySchema}`)
            .withContent(`z.any().refine((v) => isDefinedNonNullAny(v))`)
            .string,
          ...this.enumDeclarations,
        ].join('\n')}`
    );
  }

  buildOperationDefinitions(documents: Types.DocumentFile[]): string[] {
    const visitor = this.createVisitor('output');
    const result = buildZodOperationSchemas(this.schema, this.config, documents, visitor);
    this.importTypes.push(...result.typeNames);
    return result.blocks;
  }

  get InputObjectTypeDefinition() {
    return {
      leave: (node: InputObjectTypeDefinitionNode) => {
        const visitor = this.createVisitor('input');
        const name = visitor.convertName(node.name.value);
        this.importTypes.push(name);
        if (isOneOfInputObject(node))
          return this.buildOneOfInputFields(node.fields ?? [], visitor, name);

        return this.buildInputFields(node.fields ?? [], visitor, name);
      },
    };
  }

  get InterfaceTypeDefinition() {
    return {
      leave: InterfaceTypeDefinitionBuilder(this.config.withObjectType, (node: InterfaceTypeDefinitionNode) => {
        const visitor = this.createVisitor('output');
        const name = visitor.convertName(node.name.value);
        const typeName = visitor.prefixTypeNamespace(name);
        this.importTypes.push(name);

        // Building schema for field arguments.
        const argumentBlocks = this.buildTypeDefinitionArguments(node, visitor);
        const appendArguments = argumentBlocks ? `\n${argumentBlocks}` : '';

        // Building schema for fields.
        const shape = node.fields?.map(field => generateFieldZodSchema(this.config, visitor, field, 2, schemaDepthVariable(this.config))).join(',\n');

        switch (this.config.validationSchemaExportType) {
          case 'const':
            return (
              new DeclarationBlock({})
                .export()
                .asKind('const')
                .withName(`${name}Schema: z.ZodObject<Properties<${typeName}>>`)
                .withContent(buildObjectExpression(this.config, shape))
                .string + appendArguments
            );

          case 'function':
          default:
            return (
              new DeclarationBlock({})
                .export()
                .asKind('function')
                .withName(`${name}Schema(${schemaDepthParameter(this.config)}): z.ZodObject<Properties<${typeName}>>`)
                .withBlock(buildObjectReturn(this.config, shape))
                .string + appendArguments
            );
        }
      }),
    };
  }

  get ObjectTypeDefinition() {
    return {
      leave: ObjectTypeDefinitionBuilder(this.config.withObjectType, (node: ObjectTypeDefinitionNode) => {
        const visitor = this.createVisitor('output');
        const name = visitor.convertName(node.name.value);
        const typeName = visitor.prefixTypeNamespace(name);
        this.importTypes.push(name);

        // Building schema for field arguments.
        const argumentBlocks = this.buildTypeDefinitionArguments(node, visitor);
        const appendArguments = argumentBlocks ? `\n${argumentBlocks}` : '';

        // Building schema for fields.
        const shape = node.fields?.map(field => generateFieldZodSchema(this.config, visitor, field, 2, schemaDepthVariable(this.config))).join(',\n');

        switch (this.config.validationSchemaExportType) {
          case 'const':
            return (
              new DeclarationBlock({})
                .export()
                .asKind('const')
                .withName(`${name}Schema: z.ZodObject<Properties<${typeName}>>`)
                .withContent(buildObjectExpression(this.config, [indent(`__typename: z.literal('${node.name.value}').optional(),`, 2), shape].join('\n')))
                .string + appendArguments
            );

          case 'function':
          default:
            return (
              new DeclarationBlock({})
                .export()
                .asKind('function')
                .withName(`${name}Schema(${schemaDepthParameter(this.config)}): z.ZodObject<Properties<${typeName}>>`)
                .withBlock(buildObjectReturn(this.config, [indent(`__typename: z.literal('${node.name.value}').optional(),`, 2), shape].join('\n')))
                .string + appendArguments
            );
        }
      }),
    };
  }

  get EnumTypeDefinition() {
    return {
      leave: (node: EnumTypeDefinitionNode) => {
        const visitor = this.createVisitor('both');
        const enumname = visitor.convertSchemaName(node.name.value, node.kind);
        const enumTypeName = visitor.prefixTypeNamespace(enumname);
        this.importTypes.push(enumname);
        if (!this.config.enumsAsTypes)
          this.importValueTypes.push(enumname);
        const enumValues = node.values?.map(enumOption => enumOption.name.value) ?? [];

        // hoist enum declarations
        this.enumDeclarations.push(
          this.config.enumsAsTypes
            ? new DeclarationBlock({})
              .export()
              .asKind('const')
              .withName(`${enumname}Schema: z.ZodType<${unionLiterals(enumValues)}>`)
              .withContent(`z.enum([${enumValues.map(enumOption => `'${enumOption}'`).join(', ')}])`)
              .string
            : new DeclarationBlock({})
              .export()
              .asKind('const')
              .withName(`${enumname}Schema: z.ZodType<${enumTypeName}>`)
              .withContent(`z.nativeEnum(${enumTypeName})`)
              .string,
        );
      },
    };
  }

  get UnionTypeDefinition() {
    return {
      leave: (node: UnionTypeDefinitionNode) => {
        if (!node.types || !this.config.withObjectType)
          return;
        const visitor = this.createVisitor('output');
        const unionName = visitor.convertName(node.name.value);
        const depthVariable = schemaDepthVariable(this.config);
        const unionElements = node.types.map((t) => {
          const element = visitor.convertName(t.name.value);
          const typ = visitor.getType(t.name.value);
          if (typ?.astNode?.kind === 'EnumTypeDefinition')
            return `${element}Schema`;

          switch (this.config.validationSchemaExportType) {
            case 'const':
              return `${element}Schema`;
            case 'function':
            default:
              return depthVariable ? `${element}Schema(depth)` : `${element}Schema()`;
          }
        }).join(', ');
        const unionElementsCount = node.types.length ?? 0;

        const union = unionElementsCount > 1 ? `z.union([${unionElements}])` : unionElements;

        switch (this.config.validationSchemaExportType) {
          case 'const':
            return new DeclarationBlock({}).export().asKind('const').withName(`${unionName}Schema`).withContent(union).string;
          case 'function':
          default:
            return new DeclarationBlock({})
              .export()
              .asKind('function')
              .withName(`${unionName}Schema(${schemaDepthParameter(this.config)})`)
              .withBlock(indent(`return ${union}`))
              .string;
        }
      },
    };
  }

  protected buildInputFields(
    fields: readonly (FieldDefinitionNode | InputValueDefinitionNode)[],
    visitor: Visitor,
    name: string,
  ) {
    const typeName = visitor.prefixTypeNamespace(name);
    const shape = fields.map(field => generateFieldZodSchema(this.config, visitor, field, 2)).join(',\n');
    const objectSchema = buildObjectExpression(this.config, shape);

    switch (this.config.validationSchemaExportType) {
      case 'const':
        return new DeclarationBlock({})
          .export()
          .asKind('const')
          .withName(`${name}Schema: z.ZodObject<Properties<${typeName}>>`)
          .withContent(objectSchema)
          .string;

      case 'function':
      default:
        return new DeclarationBlock({})
          .export()
          .asKind('function')
          .withName(`${name}Schema(): z.ZodObject<Properties<${typeName}>>`)
          .withBlock(buildObjectReturn(this.config, shape))
          .string;
    }
  }

  private buildOneOfInputFields(
    fields: readonly InputValueDefinitionNode[],
    visitor: Visitor,
    name: string,
  ) {
    const typeName = visitor.prefixTypeNamespace(name);
    const variants = fields.map((selectedField) => {
      const shape = fields.map((field) => {
        if (field === selectedField) {
          const gen = generateFieldTypeZodSchema(this.config, visitor, field, field.type, undefined, true, true);
          return indent(`${field.name.value}: ${withDescription(this.config, field, maybeLazy(visitor, field.type, gen))}`, 2);
        }

        return indent(`${field.name.value}: z.never().optional()`, 2);
      }).join(',\n');

      return buildObjectExpression(this.config, shape);
    });
    const schema = variants.length > 1 ? `z.union([\n${variants.map(variant => indent(variant, 2)).join(',\n')}\n])` : variants[0];

    switch (this.config.validationSchemaExportType) {
      case 'const':
        return new DeclarationBlock({})
          .export()
          .asKind('const')
          .withName(`${name}Schema: z.ZodType<${typeName}>`)
          .withContent(schema)
          .string;

      case 'function':
      default:
        return new DeclarationBlock({})
          .export()
          .asKind('function')
          .withName(`${name}Schema(): z.ZodType<${typeName}>`)
          .withBlock(indent(`return ${schema}`))
          .string;
    }
  }
}

function generateFieldZodSchema(config: ValidationSchemaPluginConfig, visitor: Visitor, field: InputValueDefinitionNode | FieldDefinitionNode, indentCount: number, depthVariable?: string): string {
  const gen = generateFieldTypeZodSchema(config, visitor, field, field.type, undefined, true, false, depthVariable);
  return indent(`${field.name.value}: ${withDescription(config, field, maybeLazy(visitor, field.type, gen))}`, indentCount);
}

function generateFieldTypeZodSchema(config: ValidationSchemaPluginConfig, visitor: Visitor, field: InputValueDefinitionNode | FieldDefinitionNode, type: TypeNode, parentType?: TypeNode, isRoot = true, forceRequired = false, depthVariable?: string): string {
  if (isListType(type)) {
    const gen = generateFieldTypeZodSchema(config, visitor, field, type.type, type, false, false, depthVariable);
    const arrayGen = `z.array(${maybeLazy(visitor, type.type, gen)})`;
    const maybeDirectivesGen = isRoot ? applyDirectives(config, field, arrayGen) : arrayGen;
    const maybeDefaultGen = hasNullDefault(field) ? maybeDirectivesGen : applyDefaultValue(config, visitor, field, type, maybeDirectivesGen);
    if (!isNonNullType(parentType) && !forceRequired) {
      if (hasNullDefault(field))
        return withNullDefault(config, maybeDirectivesGen);

      return `${maybeDefaultGen}.${zodOptionalType(config)}()`;
    }
    return maybeDefaultGen;
  }
  if (isNonNullType(type)) {
    const gen = generateFieldTypeZodSchema(config, visitor, field, type.type, type, isRoot, forceRequired, depthVariable);
    return maybeLazy(visitor, type.type, gen);
  }
  if (isNamedType(type)) {
    const gen = generateNameNodeZodSchema(config, visitor, type.name, depthVariable);
    if (isListType(parentType))
      return `${gen}.nullable()`;

    const appliedDirectivesGen = isRoot
      ? hasNullDefault(field)
        ? applyDirectives(config, field, gen)
        : applyDefaultValue(config, visitor, field, type, applyDirectives(config, field, gen))
      : gen;

    if (isNonNullType(parentType)) {
      if (visitor.shouldEmitAsNotAllowEmptyString(type.name.value))
        return `${appliedDirectivesGen}.min(1)`;

      return appliedDirectivesGen;
    }
    if (isListType(parentType))
      return `${appliedDirectivesGen}.nullable()`;

    if (forceRequired)
      return appliedDirectivesGen;

    return hasNullDefault(field)
      ? withNullDefault(config, appliedDirectivesGen)
      : `${appliedDirectivesGen}.${zodOptionalType(config)}()`;
  }
  console.warn('unhandled type:', type);
  return '';
}

function isOneOfInputObject(node: InputObjectTypeDefinitionNode): boolean {
  return node.directives?.some(directive => directive.name.value === 'oneOf') === true;
}

function buildObjectExpression(config: ValidationSchemaPluginConfig, shape: string | undefined): string {
  return ['z.object({', shape, `})${strictObjectSuffix(config)}`].join('\n');
}

function buildObjectReturn(config: ValidationSchemaPluginConfig, shape: string | undefined): string {
  return [indent('return z.object({'), shape, indent(`})${strictObjectSuffix(config)}`)].join('\n');
}

function strictObjectSuffix(config: ValidationSchemaPluginConfig): string {
  return config.strictObjectSchemas === true ? '.strict()' : '';
}

function zodOptionalType(config: ValidationSchemaPluginConfig): string {
  return config.nullishBehavior ?? config.zodOptionalType ?? 'nullish';
}

function withNullDefault(config: ValidationSchemaPluginConfig, gen: string): string {
  if (zodOptionalType(config) === 'optional')
    return `${gen}.nullable().optional().default(null)`;

  return `${gen}.${zodOptionalType(config)}().default(null)`;
}

function schemaDepthVariable(config: ValidationSchemaPluginConfig): string | undefined {
  return typeof config.maxDepth === 'number' && config.validationSchemaExportType !== 'const'
    ? 'depth'
    : undefined;
}

function schemaDepthParameter(config: ValidationSchemaPluginConfig): string {
  return schemaDepthVariable(config) ? 'depth = 0' : '';
}

function withDescription(config: ValidationSchemaPluginConfig, field: InputValueDefinitionNode | FieldDefinitionNode, gen: string): string {
  if (config.withDescriptions !== true || !field.description?.value)
    return gen;

  return `${gen}.describe(${JSON.stringify(field.description.value)})`;
}

function applyDefaultValue(config: ValidationSchemaPluginConfig, visitor: Visitor, field: InputValueDefinitionNode | FieldDefinitionNode, type: TypeNode, gen: string): string {
  if (field.kind !== Kind.INPUT_VALUE_DEFINITION || !field.defaultValue)
    return gen;

  return `${gen}.default(${defaultValueExpression(config, visitor, type, field.defaultValue)})`;
}

function defaultValueExpression(config: ValidationSchemaPluginConfig, visitor: Visitor, type: TypeNode, value: ConstValueNode): string {
  if (value.kind === Kind.NULL)
    return 'null';

  if (isNonNullType(type))
    return defaultValueExpression(config, visitor, type.type, value);

  if (isListType(type)) {
    if (value.kind === Kind.LIST)
      return `[${value.values.map(item => defaultValueExpression(config, visitor, type.type, item)).join(', ')}]`;

    return `[${defaultValueExpression(config, visitor, type.type, value)}]`;
  }

  if (isNamedType(type) && visitor.getType(type.name.value)?.astNode?.kind === 'EnumTypeDefinition' && value.kind === Kind.ENUM) {
    if (!config.enumsAsTypes)
      return `${enumDefaultTypeName(visitor, type)}.${enumDefaultValueName(config, value.value)}`;

    return JSON.stringify(value.value);
  }

  if (isNamedType(type) && value.kind === Kind.OBJECT) {
    const graphQLType = visitor.getType(type.name.value);
    const astNode = graphQLType?.astNode;
    if (astNode?.kind === Kind.INPUT_OBJECT_TYPE_DEFINITION && isInputObjectType(graphQLType)) {
      const explicitFields = new Map(value.fields.map(field => [field.name.value, field.value]));
      const fields = inputObjectFields(astNode, graphQLType.extensionASTNodes).flatMap((field) => {
        const fieldValue = explicitFields.get(field.name.value) ?? field.defaultValue;
        if (!fieldValue)
          return [];

        return `${field.name.value}: ${defaultValueExpression(config, visitor, field.type, fieldValue)}`;
      });

      return `{ ${fields.join(', ')} }`;
    }
  }

  if (value.kind === Kind.INT || value.kind === Kind.FLOAT || value.kind === Kind.BOOLEAN)
    return `${value.value}`;

  if (value.kind === Kind.STRING)
    return `"${escapeGraphQLCharacters(value.value)}"`;

  return JSON.stringify(valueFromASTUntyped(value));
}

function hasNullDefault(field: InputValueDefinitionNode | FieldDefinitionNode): boolean {
  return field.kind === Kind.INPUT_VALUE_DEFINITION && field.defaultValue?.kind === Kind.NULL;
}

function inputObjectFields(
  astNode: InputObjectTypeDefinitionNode,
  extensionASTNodes: readonly InputObjectTypeExtensionNode[] | undefined,
): InputValueDefinitionNode[] {
  return [
    ...(astNode.fields ?? []),
    ...(extensionASTNodes?.flatMap(extension => extension.fields ?? []) ?? []),
  ];
}

function enumDefaultTypeName(visitor: Visitor, type: TypeNode): string {
  if (isNonNullType(type))
    return enumDefaultTypeName(visitor, type.type);

  if (isNamedType(type))
    return visitor.prefixTypeNamespace(visitor.convertSchemaName(type.name.value, visitor.getType(type.name.value)?.astNode?.kind));

  return '';
}

function enumDefaultValueName(config: ValidationSchemaPluginConfig, value: string): string {
  let enumValue = convertNameParts(value, resolveExternalModuleAndFn('change-case-all#pascalCase'), config.namingConvention?.transformUnderscore);

  if (config.namingConvention?.enumValues)
    enumValue = convertNameParts(value, resolveExternalModuleAndFn(config.namingConvention?.enumValues), config.namingConvention?.transformUnderscore);

  return enumValue;
}

function applyDirectives(config: ValidationSchemaPluginConfig, field: InputValueDefinitionNode | FieldDefinitionNode, gen: string): string {
  if (config.directives && field.directives) {
    const formatted = formatDirectiveConfig(config.directives);
    return gen + buildApi(formatted, field.directives);
  }
  return gen;
}

function generateNameNodeZodSchema(config: ValidationSchemaPluginConfig, visitor: Visitor, node: NameNode, depthVariable?: string): string {
  const converter = visitor.getNameNodeConverter(node);

  switch (converter?.targetKind) {
    case 'InterfaceTypeDefinition':
    case 'InputObjectTypeDefinition':
    case 'ObjectTypeDefinition':
    case 'UnionTypeDefinition':
      // using switch-case rather than if-else to allow for future expansion
      switch (config.validationSchemaExportType) {
        case 'const':
          return `${converter.convertName()}Schema`;
        case 'function':
        default:
          if (
            depthVariable
            && (
              converter.targetKind === 'InterfaceTypeDefinition'
              || converter.targetKind === 'ObjectTypeDefinition'
              || converter.targetKind === 'UnionTypeDefinition'
            )
          ) {
            return `${depthVariable} >= ${config.maxDepth} ? ${anySchema} : ${converter.convertName()}Schema(${depthVariable} + 1)`;
          }
          return `${converter.convertName()}Schema()`;
      }
    case 'EnumTypeDefinition':
      return `${converter.convertName()}Schema`;
    case 'ScalarTypeDefinition':
      return zod4Scalar(config, visitor, node.value);
    default:
      if (converter?.targetKind)
        console.warn('Unknown targetKind', converter?.targetKind);

      return zod4Scalar(config, visitor, node.value);
  }
}

function maybeLazy(visitor: Visitor, type: TypeNode, schema: string): string {
  if (!isNamedType(type)) {
    return schema;
  }

  const schemaType = visitor.getType(type.name.value);
  const isComplexType = !isScalarType(schemaType) && !isEnumType(schemaType);
  return isComplexType ? `z.lazy(() => ${schema})` : schema;
}

function zod4Scalar(config: ValidationSchemaPluginConfig, visitor: Visitor, scalarName: string): string {
  if (config.scalarSchemas?.[scalarName])
    return config.scalarSchemas[scalarName];

  const tsType = visitor.getScalarType(scalarName);
  switch (tsType) {
    case 'string':
      return `z.string()`;
    case 'number':
      return `z.number()`;
    case 'boolean':
      return `z.boolean()`;
  }

  if (config.defaultScalarTypeSchema) {
    return config.defaultScalarTypeSchema;
  }

  console.warn('unhandled scalar name:', scalarName);
  return anySchema;
}

function unionLiterals(values: string[]): string {
  if (values.length === 0)
    return 'never';

  return values.map(value => JSON.stringify(value)).join(' | ');
}
