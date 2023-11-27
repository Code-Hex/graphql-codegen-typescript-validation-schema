import { RuleASTCompositeNode } from './RuleASTCompositeNode';
import { RuleASTSingleNode } from './RuleASTSingleNode';
import { RuleASTSometimesNode } from './RuleASTSometimesNode';

export class RuleASTRenderer {
  public renderSingleRule(singleRule: RuleASTSingleNode): string {
    const { mappedName, rawArgs } = singleRule.getData();
    return `.${mappedName}(${rawArgs.map(codifyArgument).join(',')})`;
  }

  public renderCompositeRule(compositeRule: RuleASTCompositeNode): string {
    return compositeRule
      .getData()
      .children.map(child => child.render(this))
      .join('');
  }

  public renderSometimesRule(sometimesRule: RuleASTSometimesNode): string {
    const { continuation } = sometimesRule.getData();
    return `.sometimes(schema => schema${continuation.render(this)})`;
  }
}

const isNumber = (rawArg: string): boolean => parseFloat(rawArg).toString() === rawArg;
const isBoolean = (rawArg: string): boolean => rawArg.toLowerCase() === 'true' || rawArg.toLowerCase() === 'false';
const isRegex = (rawArg: string): boolean => rawArg.startsWith('/');

const codifyArgument = (rawArg: string): string => {
  if (isNumber(rawArg) || isBoolean(rawArg) || isRegex(rawArg)) {
    return rawArg;
  }
  // here, rawArg seems to be string
  return JSON.stringify(rawArg);
};
