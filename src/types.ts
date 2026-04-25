import type { Types } from '@graphql-codegen/plugin-helpers';
import type { ASTNode, ASTVisitFn } from 'graphql';

export type NewVisitor = Partial<{
  readonly [NodeT in ASTNode as NodeT['kind']]?: {
    leave?: ASTVisitFn<NodeT>
  };
}>;

export interface SchemaVisitor extends NewVisitor {
  buildImports: () => string[]
  initialEmit: () => string
  buildOperationDefinitions: (documents: Types.DocumentFile[]) => string[]
}
