import { FieldMetadata } from '../field/FieldMetadata';
import { SchemaASTLazyNode } from './SchemaASTLazyNode';
import { SchemaASTRenderer } from './SchemaASTRenderer';
import { SchemaASTTypeNode } from './SchemaASTTypeNode';

export class SchemaASTListNode implements SchemaASTTypeNode {
  constructor(
    private readonly child: SchemaASTTypeNode | SchemaASTLazyNode,
    private readonly isNonNull: boolean,
    private readonly isDefined: boolean
  ) {}

  public getData() {
    return {
      child: this.child,
      isNonNull: this.isNonNull,
      isDefined: this.isDefined,
    };
  }

  public render(schemaASTRenderer: SchemaASTRenderer, fieldMetadata: FieldMetadata) {
    return schemaASTRenderer.renderList(this, fieldMetadata);
  }
}
