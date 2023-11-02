import { Rules } from './config';
import { parse } from './LaravelValidationRule';
import { TsValidationMethodCall } from './TsValidationMethodCall';

export class TsValidationMethodCallMapper {
  public constructor(
    private rules: Rules,
    private ignoreRules: readonly string[]
  ) {}

  create(ruleString: string): TsValidationMethodCall | null {
    const validationRule = parse(ruleString);
    if (this.ignoreRules.includes(validationRule.name)) {
      return null;
    }

    return new TsValidationMethodCall(
      this.mapMethodName(validationRule.name),
      validationRule.rawArgs.map(codifyArgument)
    );
  }

  private mapMethodName(ruleName: string): string {
    const ruleMapping = this.rules[ruleName];
    if (!ruleMapping) {
      return ruleName;
    }
    if (Array.isArray(ruleMapping)) {
      return ruleMapping[0];
    }
    return ruleMapping;
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
