import { RuleASTRenderer } from './RuleASTRenderer';

export interface RuleASTNode {
  render(ruleRenderer: RuleASTRenderer): string;
}
