import { FieldMetadata } from '../field/FieldMetadata';
import { SchemaASTNamedTypeNode } from './SchemaASTNamedTypeNode';
import { SchemaASTRenderer } from './SchemaASTRenderer';

export class SchemaASTScalarNode implements SchemaASTNamedTypeNode {
  constructor(
    private readonly graphQLTypeName: string,
    private readonly tsTypeName: string | null,
    private readonly isNonNull: boolean,
    private readonly isDefined: boolean
  ) {}

  public getData() {
    return {
      graphQLTypeName: this.graphQLTypeName,
      tsTypeName: this.tsTypeName,
      isNonNull: this.isNonNull,
      isDefined: this.isDefined,
    };
  }

  public render(schemaASTRenderer: SchemaASTRenderer, fieldMetadata: FieldMetadata) {
    return schemaASTRenderer.renderScalar(this, fieldMetadata);
  }
}
