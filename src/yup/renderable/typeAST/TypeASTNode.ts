import { FieldMetadata } from '../field/FieldMetadata';
import { TypeASTRenderer } from './TypeASTRenderer';

export interface TypeASTNode {
  render(typeASTRenderer: TypeASTRenderer, fieldMetadata: FieldMetadata): string;
  requiresLazy(): boolean;
}
