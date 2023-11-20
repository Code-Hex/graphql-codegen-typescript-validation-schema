import { TypeNode } from 'graphql';

import { SchemaASTNode } from './SchemaASTNode';

export class SchemaASTNullNode implements SchemaASTNode {
  constructor(private readonly typeNode: TypeNode) {}

  render() {
    console.warn('unhandled type:', this.typeNode);
    return '';
  }
}
