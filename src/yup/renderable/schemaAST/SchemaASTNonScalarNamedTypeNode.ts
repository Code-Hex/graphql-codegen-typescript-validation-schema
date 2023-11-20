import { Kind } from 'graphql';

import { GetKindResult } from '../../../visitor';
import { FieldMetadata } from '../field/FieldMetadata';
import { SchemaASTNamedTypeNode } from './SchemaASTNamedTypeNode';
import { SchemaASTRenderer } from './SchemaASTRenderer';

export class SchemaASTNonScalarNamedTypeNode implements SchemaASTNamedTypeNode {
  constructor(
    private readonly data: Readonly<{
      graphQLTypeName: string;
      tsTypeName: string | null;
      convertedName: string;
      kind: Exclude<GetKindResult, Kind.SCALAR_TYPE_DEFINITION | null>;
      isNonNull: boolean;
      isDefined: boolean;
    }>
  ) {}

  public getData() {
    return {
      ...this.data,
    };
  }

  public render(schemaASTRenderer: SchemaASTRenderer, fieldMetadata: FieldMetadata) {
    return schemaASTRenderer.renderNonScalarNamedType(this, fieldMetadata);
  }
}
