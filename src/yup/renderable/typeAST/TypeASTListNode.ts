import { FieldMetadata } from '../field/FieldMetadata';
import { TypeASTNode } from './TypeASTNode';
import { TypeASTRenderer } from './TypeASTRenderer';

export class TypeASTListNode implements TypeASTNode {
  constructor(private readonly child: TypeASTNode) {}

  public getData() {
    return {
      child: this.child,
    };
  }

  public render(schemaASTRenderer: TypeASTRenderer, fieldMetadata: FieldMetadata) {
    return schemaASTRenderer.renderList(this, fieldMetadata);
  }

  public requiresLazy() {
    return this.child.requiresLazy();
  }
}
