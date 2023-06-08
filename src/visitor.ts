import { TsVisitor } from '@graphql-codegen/typescript';
import { GraphQLSchema,NameNode } from 'graphql';

import { ValidationSchemaPluginConfig } from './config';

export class Visitor extends TsVisitor {
  constructor(
    private scalarDirection: 'input' | 'output' | 'both',
    private schema: GraphQLSchema,
    config: ValidationSchemaPluginConfig
  ) {
    super(schema, config);
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
}
