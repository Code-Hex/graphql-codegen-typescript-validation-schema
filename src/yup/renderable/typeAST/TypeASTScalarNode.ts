import { FieldMetadata } from '../field/FieldMetadata';
import { TypeASTNamedTypeNode } from './TypeASTNamedTypeNode';
import { TypeASTRenderer } from './TypeASTRenderer';

export class TypeASTScalarNode implements TypeASTNamedTypeNode {
  constructor(
    private readonly graphQLTypeName: string,
    private readonly tsTypeName: string | null
  ) {}

  public getData() {
    return {
      graphQLTypeName: this.graphQLTypeName,
      tsTypeName: this.tsTypeName,
    };
  }

  public render(schemaASTRenderer: TypeASTRenderer, fieldMetadata: FieldMetadata) {
    return schemaASTRenderer.renderScalar(this, fieldMetadata);
  }

  public requiresLazy() {
    return false;
  }
}
