import { ASTNode, ASTVisitFn } from 'graphql';

export interface VisitFunctionFactory<TVisitedNode extends ASTNode> {
  create(): ASTVisitFn<TVisitedNode> | undefined;
}
