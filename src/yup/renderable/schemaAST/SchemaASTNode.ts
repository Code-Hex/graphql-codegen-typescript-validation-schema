import { FieldMetadata } from '../field/FieldMetadata';
import { SchemaASTRenderer } from './SchemaASTRenderer';

export interface SchemaASTNode {
  render(schemaASTRenderer: SchemaASTRenderer, fieldMetadata: FieldMetadata): string;
}
