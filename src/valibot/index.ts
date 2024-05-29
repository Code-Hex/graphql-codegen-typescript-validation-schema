import { DeclarationBlock, indent } from '@graphql-codegen/visitor-plugin-common';
import type {
  FieldDefinitionNode,
  GraphQLSchema,
  InputObjectTypeDefinitionNode,
  InputValueDefinitionNode,
  NameNode,
  TypeNode,
} from 'graphql';

import type { ValidationSchemaPluginConfig } from '../config';
import { BaseSchemaVisitor } from '../schema_visitor';
import type { Visitor } from '../visitor';
import {
  isInput,
  isListType,
  isNamedType,
  isNonNullType,
} from './../graphql';

export class ValibotSchemaVisitor extends BaseSchemaVisitor {
  constructor(schema: GraphQLSchema, config: ValidationSchemaPluginConfig) {
    super(schema, config);
  }

  importValidationSchema(): string {
    return `import * as v from 'valibot'`;
  }

  initialEmit(): string {
    return '';
  }

  get InputObjectTypeDefinition() {
    return {
      leave: (node: InputObjectTypeDefinitionNode) => {
        const visitor = this.createVisitor('input');
        const name = visitor.convertName(node.name.value);
        this.importTypes.push(name);
        return this.buildInputFields(node.fields ?? [], visitor, name);
      },
    };
  }

  protected buildInputFields(
    fields: readonly (FieldDefinitionNode | InputValueDefinitionNode)[],
    visitor: Visitor,
    name: string,
  ) {
    const shape = fields.map(field => generateFieldValibotSchema(this.config, visitor, field, 2)).join(',\n');

    switch (this.config.validationSchemaExportType) {
      default:
        return new DeclarationBlock({})
          .export()
          .asKind('function')
          .withName(`${name}Schema(): v.GenericSchema<${name}>`)
          .withBlock([indent(`return v.object({`), shape, indent('})')].join('\n')).string;
    }
  }
}

function generateFieldValibotSchema(config: ValidationSchemaPluginConfig, visitor: Visitor, field: InputValueDefinitionNode | FieldDefinitionNode, indentCount: number): string {
  const gen = generateFieldTypeValibotSchema(config, visitor, field, field.type);
  return indent(`${field.name.value}: ${maybeLazy(field.type, gen)}`, indentCount);
}

function generateFieldTypeValibotSchema(config: ValidationSchemaPluginConfig, visitor: Visitor, field: InputValueDefinitionNode | FieldDefinitionNode, type: TypeNode, parentType?: TypeNode): string {
  if (isListType(type)) {
    const gen = generateFieldTypeValibotSchema(config, visitor, field, type.type, type);
    const arrayGen = `v.array(${maybeLazy(type.type, gen)})`;
    if (!isNonNullType(parentType)) {
      return `v.nullish(${arrayGen})`;
    }
    return arrayGen;
  }
  if (isNonNullType(type)) {
    const gen = generateFieldTypeValibotSchema(config, visitor, field, type.type, type);
    return maybeLazy(type.type, gen);
  }
  if (isNamedType(type)) {
    const gen = generateNameNodeValibotSchema(config, visitor, type.name);
    if (isListType(parentType))
      return `v.nullable(${gen})`;

    if (isNonNullType(parentType))
      return gen;

    return `v.nullish(${gen})`;
  }
  console.warn('unhandled type:', type);
  return '';
}

function generateNameNodeValibotSchema(config: ValidationSchemaPluginConfig, visitor: Visitor, node: NameNode): string {
  const converter = visitor.getNameNodeConverter(node);

  switch (converter?.targetKind) {
    case 'InputObjectTypeDefinition':
      // using switch-case rather than if-else to allow for future expansion
      switch (config.validationSchemaExportType) {
        default:
          return `${converter.convertName()}Schema()`;
      }
    default:
      if (converter?.targetKind)
        console.warn('Unknown targetKind', converter?.targetKind);

      return valibot4Scalar(config, visitor, node.value);
  }
}

function maybeLazy(type: TypeNode, schema: string): string {
  if (isNamedType(type) && isInput(type.name.value))
    return `v.lazy(() => ${schema})`;

  return schema;
}

function valibot4Scalar(config: ValidationSchemaPluginConfig, visitor: Visitor, scalarName: string): string {
  const tsType = visitor.getScalarType(scalarName);
  switch (tsType) {
    case 'string':
      return `v.string()`;
    case 'number':
      return `v.number()`;
    case 'boolean':
      return `v.boolean()`;
  }
  console.warn('unhandled scalar name:', scalarName);
  return 'v.any()';
}
