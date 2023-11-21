import { Kind } from 'graphql';

import { GetKindResult } from '../../../visitor';
import { FieldMetadata } from '../field/FieldMetadata';
import { TypeASTNode } from './TypeASTNode';
import { TypeASTRenderer } from './TypeASTRenderer';

export class TypeASTNonScalarNamedTypeNode implements TypeASTNode {
  constructor(
    private readonly data: Readonly<{
      graphQLTypeName: string;
      tsTypeName: string | null;
      convertedName: string;
      kind: Exclude<GetKindResult, Kind.SCALAR_TYPE_DEFINITION | null>;
      requiresLazy: boolean;
    }>
  ) {}

  public getData() {
    return {
      ...this.data,
    };
  }

  public render(schemaASTRenderer: TypeASTRenderer, fieldMetadata: FieldMetadata) {
    return schemaASTRenderer.renderNonScalarNamedType(this, fieldMetadata);
  }

  public requiresLazy() {
    return this.data.requiresLazy;
  }
}
