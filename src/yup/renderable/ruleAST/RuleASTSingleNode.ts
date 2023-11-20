import { RuleASTNode } from './RuleASTNode';
import { RuleASTRenderer } from './RuleASTRenderer';

export class RuleASTSingleNode implements RuleASTNode {
  public constructor(
    private readonly mappedName: string,
    private readonly rawArgs: readonly string[]
  ) {}

  public getData() {
    return {
      mappedName: this.mappedName,
      rawArgs: this.rawArgs,
    };
  }

  public render(ruleRenderer: RuleASTRenderer): string {
    return ruleRenderer.renderSingleRule(this);
  }
}
