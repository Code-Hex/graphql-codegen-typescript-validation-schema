import type { Types } from '@graphql-codegen/plugin-helpers';
import type {
  FieldNode,
  FragmentDefinitionNode,
  GraphQLCompositeType,
  GraphQLObjectType,
  GraphQLOutputType,
  GraphQLSchema,
  OperationDefinitionNode,
  SelectionNode,
  SelectionSetNode,
} from 'graphql';
import type { ValidationSchemaPluginConfig } from '../config.js';
import type { Visitor } from '../visitor.js';
import { DeclarationBlock, indent } from '@graphql-codegen/visitor-plugin-common';
import {
  getNamedType,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  isEnumType,
  isInterfaceType,
  isListType,
  isNonNullType,
  isObjectType,
  isScalarType,
  isUnionType,
  Kind,
} from 'graphql';

interface OperationBuildResult {
  blocks: string[]
  typeNames: string[]
}

interface OperationContext {
  schema: GraphQLSchema
  config: ValidationSchemaPluginConfig
  visitor: Visitor
  fragments: Map<string, FragmentDefinitionNode>
}

interface CollectedField {
  schema: string
  optional: boolean
}

export function buildZodOperationSchemas(
  schema: GraphQLSchema,
  config: ValidationSchemaPluginConfig,
  documents: Types.DocumentFile[],
  visitor: Visitor,
): OperationBuildResult {
  const fragments = new Map<string, FragmentDefinitionNode>();
  const operations: OperationDefinitionNode[] = [];

  for (const documentFile of documents) {
    for (const definition of documentFile.document?.definitions ?? []) {
      if (definition.kind === Kind.FRAGMENT_DEFINITION)
        fragments.set(definition.name.value, definition);
      else if (definition.kind === Kind.OPERATION_DEFINITION && definition.name)
        operations.push(definition);
    }
  }

  const ctx: OperationContext = { schema, config, visitor, fragments };
  const blocks: string[] = [];
  const typeNames: string[] = [];

  for (const operation of operations) {
    const rootType = operationRootType(schema, operation);
    if (!rootType)
      continue;

    const typeName = operationResultTypeName(visitor, operation);
    typeNames.push(typeName);
    const schemaExpression = buildSelectionSetSchema(ctx, rootType, operation.selectionSet);

    blocks.push(operationDeclaration(config, typeName, visitor.prefixTypeNamespace(typeName), schemaExpression));
  }

  return { blocks, typeNames };
}

function operationRootType(schema: GraphQLSchema, operation: OperationDefinitionNode): GraphQLCompositeType | undefined {
  switch (operation.operation) {
    case 'query':
      return schema.getQueryType() ?? undefined;
    case 'mutation':
      return schema.getMutationType() ?? undefined;
    case 'subscription':
      return schema.getSubscriptionType() ?? undefined;
  }
}

function operationResultTypeName(visitor: Visitor, operation: OperationDefinitionNode): string {
  const operationName = operation.name?.value ?? '';
  return visitor.convertName(`${operationName}${capitalize(operation.operation)}`);
}

function operationDeclaration(
  config: ValidationSchemaPluginConfig,
  typeName: string,
  typeReference: string,
  schemaExpression: string,
): string {
  switch (config.validationSchemaExportType) {
    case 'const':
      return new DeclarationBlock({})
        .export()
        .asKind('const')
        .withName(`${typeName}Schema: z.ZodType<${typeReference}>`)
        .withContent(schemaExpression)
        .string;

    case 'function':
    default:
      return new DeclarationBlock({})
        .export()
        .asKind('function')
        .withName(`${typeName}Schema(): z.ZodType<${typeReference}>`)
        .withBlock(indent(`return ${schemaExpression}`))
        .string;
  }
}

function buildSelectionSetSchema(
  ctx: OperationContext,
  parentType: GraphQLCompositeType,
  selectionSet: SelectionSetNode,
): string {
  if (isUnionType(parentType) || isInterfaceType(parentType)) {
    const variants = ctx.schema
      .getPossibleTypes(parentType)
      .map(type => buildObjectSelectionSetSchema(ctx, parentType, type, selectionSet, false));

    return variants.length > 1
      ? `z.union([\n${variants.map(variant => indent(variant, 2)).join(',\n')}\n])`
      : variants[0] ?? 'definedNonNullAnySchema';
  }

  return buildObjectSelectionSetSchema(ctx, parentType, parentType, selectionSet, false);
}

function buildObjectSelectionSetSchema(
  ctx: OperationContext,
  parentType: GraphQLCompositeType,
  runtimeType: GraphQLObjectType,
  selectionSet: SelectionSetNode,
  optional: boolean,
): string {
  const fields = new Map<string, CollectedField>();

  if (ctx.config.nonOptionalTypename === true)
    setField(fields, '__typename', typenameSchema(runtimeType), false);

  for (const selection of selectionSet.selections)
    collectSelection(ctx, parentType, runtimeType, selection, fields, optional);

  return buildObjectExpression(
    ctx.config,
    [...fields.entries()]
      .map(([responseName, field]) => indent(`${responseName}: ${field.optional ? `${field.schema}.optional()` : field.schema}`, 2))
      .join(',\n'),
  );
}

function collectSelection(
  ctx: OperationContext,
  parentType: GraphQLCompositeType,
  runtimeType: GraphQLObjectType,
  selection: SelectionNode,
  fields: Map<string, CollectedField>,
  inheritedOptional: boolean,
): void {
  const directiveState = executableDirectiveState(selection);
  if (directiveState === 'omit')
    return;

  const optional = inheritedOptional || directiveState === 'optional';

  switch (selection.kind) {
    case Kind.FIELD:
      collectField(ctx, parentType, runtimeType, selection, fields, optional);
      return;
    case Kind.FRAGMENT_SPREAD: {
      const fragment = ctx.fragments.get(selection.name.value);
      const fragmentType = fragment ? fragmentTypeCondition(ctx, fragment) : undefined;
      if (fragment && fragmentType && typesOverlap(ctx, fragmentType, runtimeType))
        collectSelectionSetForType(ctx, fragmentType, runtimeType, fragment.selectionSet, fields, optional);
      return;
    }
    case Kind.INLINE_FRAGMENT: {
      const fragmentType = selection.typeCondition ? typeCondition(ctx, selection.typeCondition.name.value) : parentType;
      if (fragmentType && typesOverlap(ctx, fragmentType, runtimeType))
        collectSelectionSetForType(ctx, fragmentType, runtimeType, selection.selectionSet, fields, optional);
    }
  }
}

function collectSelectionSetForType(
  ctx: OperationContext,
  parentType: GraphQLCompositeType,
  runtimeType: GraphQLObjectType,
  selectionSet: SelectionSetNode,
  fields: Map<string, CollectedField>,
  optional: boolean,
): void {
  for (const selection of selectionSet.selections)
    collectSelection(ctx, parentType, runtimeType, selection, fields, optional);
}

function collectField(
  ctx: OperationContext,
  parentType: GraphQLCompositeType,
  runtimeType: GraphQLObjectType,
  field: FieldNode,
  fields: Map<string, CollectedField>,
  optional: boolean,
): void {
  const responseName = field.alias?.value ?? field.name.value;
  if (field.name.value === '__typename') {
    setField(fields, responseName, typenameSchema(runtimeType), optional);
    return;
  }

  if (!isObjectType(parentType) && !isInterfaceType(parentType))
    return;

  const fieldDefinition = parentType.getFields()[field.name.value];
  if (!fieldDefinition)
    return;

  setField(fields, responseName, buildOutputTypeSchema(ctx, fieldDefinition.type, field.selectionSet), optional);
}

function buildOutputTypeSchema(
  ctx: OperationContext,
  type: GraphQLOutputType,
  selectionSet?: SelectionSetNode,
): string {
  if (isNonNullType(type))
    return buildNonNullOutputTypeSchema(ctx, type.ofType, selectionSet);

  return `${buildNonNullOutputTypeSchema(ctx, type, selectionSet)}.nullable()`;
}

function buildNonNullOutputTypeSchema(
  ctx: OperationContext,
  type: GraphQLOutputType,
  selectionSet?: SelectionSetNode,
): string {
  if (isListType(type))
    return `z.array(${buildOutputTypeSchema(ctx, type.ofType, selectionSet)})`;

  const namedType = getNamedType(type);
  if (isScalarType(namedType))
    return scalarSchema(ctx, namedType.name);

  if (isEnumType(namedType)) {
    const converter = ctx.visitor.getNameNodeConverter({ kind: Kind.NAME, value: namedType.name });
    return `${converter?.convertName() ?? ctx.visitor.convertSchemaName(namedType.name, namedType.astNode?.kind)}Schema`;
  }

  if (selectionSet && (isObjectType(namedType) || isInterfaceType(namedType) || isUnionType(namedType)))
    return buildSelectionSetSchema(ctx, namedType, selectionSet);

  return 'definedNonNullAnySchema';
}

function scalarSchema(ctx: OperationContext, scalarName: string): string {
  if (ctx.config.scalarSchemas?.[scalarName])
    return ctx.config.scalarSchemas[scalarName];

  switch (scalarName) {
    case GraphQLString.name:
    case GraphQLID.name:
      return 'z.string()';
    case GraphQLInt.name:
    case GraphQLFloat.name:
      return 'z.number()';
    case GraphQLBoolean.name:
      return 'z.boolean()';
  }

  if (ctx.config.defaultScalarTypeSchema)
    return ctx.config.defaultScalarTypeSchema;

  console.warn('unhandled scalar name:', scalarName);
  return 'definedNonNullAnySchema';
}

function fragmentTypeCondition(ctx: OperationContext, fragment: FragmentDefinitionNode): GraphQLCompositeType | undefined {
  return typeCondition(ctx, fragment.typeCondition.name.value);
}

function typeCondition(ctx: OperationContext, typeName: string): GraphQLCompositeType | undefined {
  const type = ctx.schema.getType(typeName);
  return type && (isObjectType(type) || isInterfaceType(type) || isUnionType(type)) ? type : undefined;
}

function typesOverlap(ctx: OperationContext, conditionalType: GraphQLCompositeType, runtimeType: GraphQLObjectType): boolean {
  if (isObjectType(conditionalType))
    return conditionalType.name === runtimeType.name;

  return ctx.schema.isSubType(conditionalType, runtimeType);
}

function setField(fields: Map<string, CollectedField>, responseName: string, schema: string, optional: boolean): void {
  const existing = fields.get(responseName);
  if (existing && !existing.optional)
    return;

  fields.set(responseName, { schema, optional });
}

function typenameSchema(parentType: GraphQLObjectType): string {
  return `z.literal('${parentType.name}')`;
}

function executableDirectiveState(selection: SelectionNode): 'omit' | 'optional' | 'required' {
  let optional = false;

  for (const directive of selection.directives ?? []) {
    if (directive.name.value !== 'skip' && directive.name.value !== 'include')
      continue;

    const condition = directive.arguments?.find(argument => argument.name.value === 'if')?.value;
    if (!condition)
      continue;

    if (condition.kind !== Kind.BOOLEAN) {
      optional = true;
      continue;
    }

    if (directive.name.value === 'skip' && condition.value)
      return 'omit';

    if (directive.name.value === 'include' && !condition.value)
      return 'omit';
  }

  return optional ? 'optional' : 'required';
}

function buildObjectExpression(config: ValidationSchemaPluginConfig, shape: string): string {
  return ['z.object({', shape, `})${strictObjectSuffix(config)}`].join('\n');
}

function strictObjectSuffix(config: ValidationSchemaPluginConfig): string {
  return config.strictObjectSchemas === true ? '.strict()' : '';
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
