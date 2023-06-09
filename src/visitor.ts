import { TsVisitor } from '@graphql-codegen/typescript';
import { GraphQLSchema, NameNode, specifiedScalarTypes } from 'graphql';

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
}
