import type { Types } from '@graphql-codegen/plugin-helpers';
import type {
  EnumTypeDefinitionNode,
  FieldDefinitionNode,
  GraphQLSchema,
  InputObjectTypeDefinitionNode,
  InputValueDefinitionNode,
  InterfaceTypeDefinitionNode,
  ObjectTypeDefinitionNode,
  UnionTypeDefinitionNode,
} from 'graphql';

import type { ValidationSchemaPluginConfig } from '../config.js';
import type { Visitor } from '../visitor.js';
import { DeclarationBlock, indent } from '@graphql-codegen/visitor-plugin-common';
import { Kind } from 'graphql';
import {
  InterfaceTypeDefinitionBuilder,
  ObjectTypeDefinitionBuilder,
} from '../graphql.js';
import { BaseSchemaVisitor } from '../schema_visitor.js';
import { buildZodOperationSchemas } from '../zod/operation.js';
import {
  anySchema,
  buildObjectExpression,
  buildObjectReturn,
  generateFieldTypeZodSchema,
  generateFieldZodSchema,
  isOneOfInputObject,
  maybeLazy,
  schemaDepthParameter,
  schemaDepthVariable,
  unionLiterals,
  withDescription,
} from '../zod_shared.js';

export class ZodV4SchemaVisitor extends BaseSchemaVisitor {
  constructor(schema: GraphQLSchema, config: ValidationSchemaPluginConfig) {
    super(schema, config);
  }

  importValidationSchema(): string {
    return `import * as z from 'zod'`;
  }

  initialEmit(): string {
    return (
      `\n${
        [
          new DeclarationBlock({})
            .asKind('type')
            .withName('Properties<T>')
            .withContent(['{', '  [K in keyof T]: z.ZodType<T[K], T[K] | undefined>;', '}'].join('\n'))
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
          new DeclarationBlock({})
            .export()
            .asKind('const')
            .withName(
              this.config.enumsAsTypes
                ? `${enumname}Schema: z.ZodType<${unionLiterals(enumValues)}, ${unionLiterals(enumValues)}>`
                : `${enumname}Schema: z.ZodType<${enumTypeName}, ${enumTypeName}>`,
            )
            .withContent(
              this.config.enumsAsTypes
                ? `z.enum([${enumValues.map(enumOption => `'${enumOption}'`).join(', ')}])`
                : `z.enum(${enumTypeName})`,
            )
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
    const schemaType = hasDefaultValue(fields) ? `z.ZodType<${typeName}>` : `z.ZodObject<Properties<${typeName}>>`;

    switch (this.config.validationSchemaExportType) {
      case 'const':
        return new DeclarationBlock({})
          .export()
          .asKind('const')
          .withName(`${name}Schema: ${schemaType}`)
          .withContent(objectSchema)
          .string;

      case 'function':
      default:
        return new DeclarationBlock({})
          .export()
          .asKind('function')
          .withName(`${name}Schema(): ${schemaType}`)
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

function hasDefaultValue(fields: readonly (FieldDefinitionNode | InputValueDefinitionNode)[]): boolean {
  return fields.some(field => field.kind === Kind.INPUT_VALUE_DEFINITION && field.defaultValue !== undefined);
}
