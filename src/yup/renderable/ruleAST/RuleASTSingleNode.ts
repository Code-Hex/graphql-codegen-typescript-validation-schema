import { RuleASTNode } from './RuleASTNode';
import { RuleASTRenderer } from './RuleASTRenderer';

export class RuleASTSingleNode implements RuleASTNode {
  public constructor(
    private readonly mappedName: string,
    private readonly rawArgs: readonly string[],
    private readonly _requiresLazy: boolean
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

  public requiresLazy(): boolean {
    return this._requiresLazy;
  }
}
