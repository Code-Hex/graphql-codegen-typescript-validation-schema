import { TsVisitor } from '@graphql-codegen/typescript';
import { NormalizedScalarsMap } from '@graphql-codegen/visitor-plugin-common';
import { GraphQLSchema, Kind } from 'graphql';

import { ValidationSchemaPluginConfig } from './config';

export class Visitor extends TsVisitor {
  constructor(
    private schema: GraphQLSchema,
    pluginConfig: ValidationSchemaPluginConfig
  ) {
    super(schema, pluginConfig);
  }

  public getKind(graphQLTypeName: string) {
    const foundType = this.schema.getType(graphQLTypeName);
    if (!foundType) {
      throw new Error(`type ${graphQLTypeName} not found in schema`);
    }

    // String 等の組み込みの scalar の場合、 astNode がない
    if (!foundType.astNode) {
      return null;
    }

    const kind = foundType.astNode.kind;
    assertsNotInterface(kind);

    return kind;
  }

  public getTypeScriptScalarType(
    graphQLTypeName: string,
    scalarDirection: keyof NormalizedScalarsMap[string]
  ): string | null {
    return this.scalars[graphQLTypeName]?.[scalarDirection] ?? null;
  }
}

/**
 * String 等の組み込みの scalar の場合は null
 */
export type GetKindResult = ReturnType<Visitor['getKind']>;

function assertsNotInterface<TKind extends Kind>(
  kind: TKind
): asserts kind is Exclude<TKind, Kind.INTERFACE_TYPE_DEFINITION> {
  if (kind === Kind.INTERFACE_TYPE_DEFINITION) {
    throw new Error(`unexpected kind: ${kind}`);
  }
}
