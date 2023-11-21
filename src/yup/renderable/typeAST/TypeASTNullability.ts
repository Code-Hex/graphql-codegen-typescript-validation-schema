import { FieldMetadata } from '../field/FieldMetadata';
import { TypeASTNode } from './TypeASTNode';
import { TypeASTRenderer } from './TypeASTRenderer';

export class TypeASTNullability implements TypeASTNode {
  constructor(
    private readonly child: Exclude<TypeASTNode, TypeASTNullability>,
    private readonly isNonNull: boolean
  ) {}

  public getData() {
    return {
      child: this.child,
      isNonNull: this.isNonNull,
    };
  }

  public render(schemaASTRenderer: TypeASTRenderer, fieldMetadata: FieldMetadata) {
    return schemaASTRenderer.renderNullability(this, fieldMetadata);
  }

  public requiresLazy() {
    return this.child.requiresLazy();
  }
}
