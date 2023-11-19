import { ASTNode, ASTVisitFn } from 'graphql';

export type NewVisitor = Partial<{
  readonly [NodeT in ASTNode as NodeT['kind']]?: {
    leave?: ASTVisitFn<NodeT>;
  };
}>;

export interface Interpreter {
  buildImports: () => string[];
  initialEmit: () => string;
}
