// Shared utilities used by both ZodSchemaVisitor (zod) and ZodV4SchemaVisitor (zodv4).
// These functions are identical across both implementations and are extracted here to
// eliminate duplication.

import type {
  ConstValueNode,
  FieldDefinitionNode,
  InputObjectTypeDefinitionNode,
  InputObjectTypeExtensionNode,
  InputValueDefinitionNode,
  NameNode,
  TypeNode,
} from 'graphql';

import type { ValidationSchemaPluginConfig } from '../config.js';
import type { Visitor } from '../visitor.js';
import { resolveExternalModuleAndFn } from '@graphql-codegen/plugin-helpers';
import { convertNameParts, indent } from '@graphql-codegen/visitor-plugin-common';
import {
  isInputObjectType,
  Kind,
  valueFromASTUntyped,
} from 'graphql';
import { buildApi, formatDirectiveConfig } from '../directive.js';
import {
  escapeGraphQLCharacters,
  isListType,
  isNamedType,
  isNonNullType,
} from '../graphql.js';
import { buildMaybeLazy } from '../lazy.js';
import { buildScalarSchema } from '../scalar.js';

export const anySchema = `definedNonNullAnySchema`;

export function generateFieldZodSchema(config: ValidationSchemaPluginConfig, visitor: Visitor, field: InputValueDefinitionNode | FieldDefinitionNode, indentCount: number, depthVariable?: string): string {
  const gen = generateFieldTypeZodSchema(config, visitor, field, field.type, undefined, true, false, depthVariable);
  return indent(`${field.name.value}: ${withDescription(config, field, maybeLazy(visitor, field.type, gen))}`, indentCount);
}

export function generateFieldTypeZodSchema(config: ValidationSchemaPluginConfig, visitor: Visitor, field: InputValueDefinitionNode | FieldDefinitionNode, type: TypeNode, parentType?: TypeNode, isRoot = true, forceRequired = false, depthVariable?: string): string {
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

export function isOneOfInputObject(node: InputObjectTypeDefinitionNode): boolean {
  return node.directives?.some(directive => directive.name.value === 'oneOf') === true;
}

export function buildObjectExpression(config: ValidationSchemaPluginConfig, shape: string | undefined): string {
  return ['z.object({', shape, `})${strictObjectSuffix(config)}`].join('\n');
}

export function buildObjectReturn(config: ValidationSchemaPluginConfig, shape: string | undefined): string {
  return [indent('return z.object({'), shape, indent(`})${strictObjectSuffix(config)}`)].join('\n');
}

export function strictObjectSuffix(config: ValidationSchemaPluginConfig): string {
  return config.strictObjectSchemas === true ? '.strict()' : '';
}

export function zodOptionalType(config: ValidationSchemaPluginConfig): string {
  return config.nullishBehavior ?? config.zodOptionalType ?? 'nullish';
}

export function withNullDefault(config: ValidationSchemaPluginConfig, gen: string): string {
  if (zodOptionalType(config) === 'optional')
    return `${gen}.nullable().optional().default(null)`;

  return `${gen}.${zodOptionalType(config)}().default(null)`;
}

export function schemaDepthVariable(config: ValidationSchemaPluginConfig): string | undefined {
  return typeof config.maxDepth === 'number' && config.validationSchemaExportType !== 'const'
    ? 'depth'
    : undefined;
}

export function schemaDepthParameter(config: ValidationSchemaPluginConfig): string {
  return schemaDepthVariable(config) ? 'depth = 0' : '';
}

export function withDescription(config: ValidationSchemaPluginConfig, field: InputValueDefinitionNode | FieldDefinitionNode, gen: string): string {
  if (config.withDescriptions !== true || !field.description?.value)
    return gen;

  return `${gen}.describe(${JSON.stringify(field.description.value)})`;
}

export function applyDefaultValue(config: ValidationSchemaPluginConfig, visitor: Visitor, field: InputValueDefinitionNode | FieldDefinitionNode, type: TypeNode, gen: string): string {
  if (field.kind !== Kind.INPUT_VALUE_DEFINITION || !field.defaultValue)
    return gen;

  return `${gen}.default(${defaultValueExpression(config, visitor, type, field.defaultValue)})`;
}

export function defaultValueExpression(config: ValidationSchemaPluginConfig, visitor: Visitor, type: TypeNode, value: ConstValueNode): string {
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

export function hasNullDefault(field: InputValueDefinitionNode | FieldDefinitionNode): boolean {
  return field.kind === Kind.INPUT_VALUE_DEFINITION && field.defaultValue?.kind === Kind.NULL;
}

export function inputObjectFields(
  astNode: InputObjectTypeDefinitionNode,
  extensionASTNodes: readonly InputObjectTypeExtensionNode[] | undefined,
): InputValueDefinitionNode[] {
  return [
    ...(astNode.fields ?? []),
    ...(extensionASTNodes?.flatMap(extension => extension.fields ?? []) ?? []),
  ];
}

export function enumDefaultTypeName(visitor: Visitor, type: TypeNode): string {
  if (isNonNullType(type))
    return enumDefaultTypeName(visitor, type.type);

  if (isNamedType(type))
    return visitor.prefixTypeNamespace(visitor.convertSchemaName(type.name.value, visitor.getType(type.name.value)?.astNode?.kind));

  return '';
}

export function enumDefaultValueName(config: ValidationSchemaPluginConfig, value: string): string {
  let enumValue = convertNameParts(value, resolveExternalModuleAndFn('change-case-all#pascalCase'), config.namingConvention?.transformUnderscore);

  if (config.namingConvention?.enumValues)
    enumValue = convertNameParts(value, resolveExternalModuleAndFn(config.namingConvention?.enumValues), config.namingConvention?.transformUnderscore);

  return enumValue;
}

export function applyDirectives(config: ValidationSchemaPluginConfig, field: InputValueDefinitionNode | FieldDefinitionNode, gen: string): string {
  if (config.directives && field.directives) {
    const formatted = formatDirectiveConfig(config.directives);
    return gen + buildApi(formatted, field.directives);
  }
  return gen;
}

export function generateNameNodeZodSchema(config: ValidationSchemaPluginConfig, visitor: Visitor, node: NameNode, depthVariable?: string): string {
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

export function maybeLazy(visitor: Visitor, type: TypeNode, schema: string): string {
  return buildMaybeLazy(visitor, type, schema, s => `z.lazy(() => ${s})`);
}

export function zod4Scalar(config: ValidationSchemaPluginConfig, visitor: Visitor, scalarName: string): string {
  return buildScalarSchema(config, visitor, scalarName, {
    typeMap: { string: 'z.string()', number: 'z.number()', boolean: 'z.boolean()' },
    fallback: anySchema,
  });
}

export function unionLiterals(values: string[]): string {
  if (values.length === 0)
    return 'never';

  return values.map(value => JSON.stringify(value)).join(' | ');
}
