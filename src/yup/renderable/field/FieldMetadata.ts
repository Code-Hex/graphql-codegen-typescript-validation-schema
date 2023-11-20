import { RuleASTNode } from '../ruleAST/RuleASTNode';

export class FieldMetadata {
  constructor(
    private readonly name: string,
    private readonly isOptional: boolean,
    private readonly rule: RuleASTNode,
    private readonly ruleForArray: RuleASTNode
  ) {}

  public getData() {
    return {
      name: this.name,
      isOptional: this.isOptional,
      rule: this.rule,
      ruleForArray: this.ruleForArray,
    };
  }
}
