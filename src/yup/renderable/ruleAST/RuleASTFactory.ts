import { ConstDirectiveNode, ConstListValueNode, ConstValueNode, Kind, StringValueNode } from 'graphql';

import { Rules } from '../../../config';
import { RuleASTCompositeNode } from './RuleASTCompositeNode';
import { RuleASTSingleNode } from './RuleASTSingleNode';
import { RuleASTSometimesNode } from './RuleASTSometimesNode';

export class RuleASTFactory {
  public constructor(
    private rules: Rules = {},
    private ignoreRules: readonly string[] = [],
    private supportedArgumentName: string = 'apply'
  ) {}

  public createFromDirectiveOrNull(fieldName: string, directive: ConstDirectiveNode | null) {
    return directive ? this.createFromDirective(fieldName, directive) : this.createNullObject();
  }

  public createNullObject() {
    return new RuleASTCompositeNode([]);
  }

  public createFromDirective(fieldName: string, directive: ConstDirectiveNode) {
    const ruleStrings = (directive.arguments ?? [])
      .filter(arg => arg.name.value === this.supportedArgumentName)
      .flatMap(({ value }) => {
        assertValueIsList(value, '`apply` argument must be a list of rules. For Example, ["integer", "max:255"].');
        return value.values.map(value => {
          assertValueIsString(value, 'rules must be a list of string. For Example, ["integer", "max:255"].');
          return value.value;
        });
      });

    return this.helper(fieldName, ruleStrings);
  }

  private helper(fieldName: string, ruleStrings: readonly string[]): RuleASTCompositeNode | RuleASTSometimesNode {
    const parsed = ruleStrings.flatMap(ruleString => {
      const validationRule = parse(ruleString);

      if (this.ignoreRules.includes(validationRule.name)) {
        return [];
      }

      return {
        ...validationRule,
        name: this.mapMethodName(validationRule.name),
      };
    });
    const isSometimes = ({ name }: LaravelValidationRule) => name === 'sometimes';
    const isNotSometimes = ({ name }: LaravelValidationRule) => name !== 'sometimes';

    const sometimesIfExists = parsed.filter(isSometimes);
    const others = parsed.filter(isNotSometimes);

    const compositeRule = new RuleASTCompositeNode(
      others.map(({ name, rawArgs }) => new RuleASTSingleNode(name, rawArgs))
    );

    return sometimesIfExists.length === 0 ? compositeRule : new RuleASTSometimesNode(fieldName, compositeRule);
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

export type LaravelValidationRule = {
  name: string;
  rawArgs: string[];
};

export const parse = (ruleString: string): LaravelValidationRule => {
  const [name, rest] = ruleString.split(':');
  const rawArgs = rest ? rest.split(',') : [];

  return {
    name,
    rawArgs,
  };
};

function assertValueIsList(value: ConstValueNode, message: string): asserts value is ConstListValueNode {
  if (value.kind !== Kind.LIST) {
    throw new Error(message);
  }
}

function assertValueIsString(value: ConstValueNode, message: string): asserts value is StringValueNode {
  if (value.kind !== Kind.STRING) {
    throw new Error(message);
  }
}
