import { FieldMetadata } from '../field/FieldMetadata';
import { SchemaASTNode } from './SchemaASTNode';
import { SchemaASTRenderer } from './SchemaASTRenderer';
import { SchemaASTTypeNode } from './SchemaASTTypeNode';

export class SchemaASTLazyNode implements SchemaASTNode {
  constructor(private readonly child: SchemaASTTypeNode) {}

  public getData() {
    return {
      child: this.child,
    };
  }

  public render(schemaASTRenderer: SchemaASTRenderer, fieldMetadata: FieldMetadata) {
    return schemaASTRenderer.renderLazy(this, fieldMetadata);
  }
}
