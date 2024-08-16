import { RuleASTNode } from '../ruleAST/RuleASTNode';

export class FieldMetadata {
  constructor(
    private readonly data: {
      name: string;
      label: string | null;
      isOptional: boolean;
      rule: RuleASTNode;
      ruleForArray: RuleASTNode;
    }
  ) {}

  public getData() {
    return {
      ...this.data,
    };
  }

  public requiresLazy(): boolean {
    return this.data.rule.requiresLazy() || this.data.ruleForArray.requiresLazy();
  }
}
