import { TsVisitor } from '@graphql-codegen/typescript';
import { FieldDefinitionNode, GraphQLSchema, NameNode, ObjectTypeDefinitionNode, specifiedScalarTypes } from 'graphql';

import { ValidationSchemaPluginConfig } from './config';

export class Visitor extends TsVisitor {
  constructor(
    private scalarDirection: 'input' | 'output' | 'both',
    private schema: GraphQLSchema,
    private pluginConfig: ValidationSchemaPluginConfig
  ) {
    super(schema, pluginConfig);
  }

  private isSpecifiedScalarName(scalarName: string) {
    return specifiedScalarTypes.some(({ name }) => name === scalarName);
  }

  public getType(name: string) {
    return this.schema.getType(name);
  }

  public getNameNodeConverter(node: NameNode) {
    const typ = this.schema.getType(node.value);
    const astNode = typ?.astNode;
    if (astNode === undefined || astNode === null) {
      return undefined;
    }
    return {
      targetKind: astNode.kind,
      convertName: () => this.convertName(astNode.name.value),
    };
  }

  public getScalarType(scalarName: string): string | null {
    if (this.scalarDirection === 'both') {
      return null;
    }
    return this.scalars[scalarName][this.scalarDirection];
  }

  public shouldEmitAsNotAllowEmptyString(name: string): boolean {
    if (this.pluginConfig.notAllowEmptyString !== true) {
      return false;
    }
    const typ = this.getType(name);
    if (typ?.astNode?.kind !== 'ScalarTypeDefinition' && !this.isSpecifiedScalarName(name)) {
      return false;
    }
    const tsType = this.getScalarType(name);
    return tsType === 'string';
  }

  public buildArgumentsSchemaBlock(
    node: ObjectTypeDefinitionNode,
    callback: (typeName: string, field: FieldDefinitionNode) => string
  ) {
    const fieldsWithArguments = node.fields?.filter(field => field.arguments && field.arguments.length > 0) ?? [];
    if (fieldsWithArguments.length === 0) {
      return undefined;
    }
    return fieldsWithArguments
      .map(field => {
        const name =
          node.name.value +
          (this.config.addUnderscoreToArgsType ? '_' : '') +
          this.convertName(field, {
            useTypesPrefix: false,
            useTypesSuffix: false,
          }) +
          'Args';

        return callback(name, field);
      })
      .join('\n');
  }
}
