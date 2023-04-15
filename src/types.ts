import { oldVisit } from '@graphql-codegen/plugin-helpers';
import { ASTNode, ASTVisitFn } from 'graphql';

export type NewVisitor = Partial<{
  readonly [NodeT in ASTNode as NodeT['kind']]?: {
    leave?: ASTVisitFn<NodeT>;
  };
}>;
export type OldLeaveVisitor = Partial<Parameters<typeof oldVisit>[1]['leave']>;
export type SchemaVisitor = {
  buildImports: () => string[];
  initialEmit: () => string;
} & NewVisitor;
