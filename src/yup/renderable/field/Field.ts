import { TypeASTNode } from '../typeAST/TypeASTNode';
import { FieldMetadata } from './FieldMetadata';
import { FieldRenderer } from './FieldRenderer';

export class Field {
  constructor(
    private readonly metadata: FieldMetadata,
    private readonly type: TypeASTNode
  ) {}

  public getData() {
    return {
      metadata: this.metadata,
      type: this.type,
    };
  }

  public requiresLazy(): boolean {
    return this.metadata.requiresLazy() || this.type.requiresLazy();
  }

  public render(fieldRenderer: FieldRenderer) {
    return fieldRenderer.renderField(this);
  }
}
