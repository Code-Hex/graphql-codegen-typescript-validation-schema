import { RuleASTNode } from './RuleASTNode';
import { RuleASTRenderer } from './RuleASTRenderer';

export class RuleASTCompositeNode implements RuleASTNode {
  public constructor(private readonly children: readonly RuleASTNode[]) {}

  public getData() {
    return {
      children: this.children,
    };
  }

  public render(ruleRenderer: RuleASTRenderer): string {
    return ruleRenderer.renderCompositeRule(this);
  }

  public requiresLazy(): boolean {
    return this.children.some(child => child.requiresLazy());
  }
}
