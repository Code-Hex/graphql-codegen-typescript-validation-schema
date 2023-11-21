import { RuleASTCompositeNode } from './RuleASTCompositeNode';
import { RuleASTNode } from './RuleASTNode';
import { RuleASTRenderer } from './RuleASTRenderer';

// sometimes は特殊で、他の検証ルールを無視する必要があるため、コールバックで他の検証ルールを渡す形にする。
export class RuleASTSometimesNode implements RuleASTNode {
  public constructor(
    private readonly fieldName: string, // 消したい
    private readonly continuation: RuleASTCompositeNode,
    private readonly _requiresLazy: boolean
  ) {}

  public getData() {
    return {
      fieldName: this.fieldName,
      continuation: this.continuation,
    };
  }

  public render(ruleRenderer: RuleASTRenderer): string {
    return ruleRenderer.renderSometimesRule(this);
  }

  public requiresLazy(): boolean {
    return this._requiresLazy || this.continuation.requiresLazy();
  }
}
