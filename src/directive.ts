import {
  ConstArgumentNode,
  ConstDirectiveNode,
  ConstListValueNode,
  ConstValueNode,
  Kind,
  StringValueNode,
} from 'graphql';

import { Rules } from './config';
import { codify, parse } from './laravel_validation_rule';

/**
 * GraphQL schema
 * ```graphql
 * input ExampleInput {
 *   email: String! @rules(apply: ["minLength:100", "email"])
 * }
 */
const targetDirectiveNames = ['rules', 'rulesForArray', 'rulesForInput'] as const;
const targetArgumentName = 'apply';

export const buildApi = (
  rules: Rules,
  ignoreRules: readonly string[],
  directives: readonly ConstDirectiveNode[]
): string =>
  directives
    .filter(directive => (targetDirectiveNames as readonly string[]).includes(directive.name.value))
    .map(directive => {
      return buildApiFromDirectiveArguments(rules, ignoreRules, directive.arguments ?? []);
    })
    .join('');

const buildApiFromDirectiveArguments = (
  rules: Rules,
  ignoreRules: readonly string[],
  args: readonly ConstArgumentNode[]
): string => {
  return args
    .filter(arg => arg.name.value === targetArgumentName)
    .flatMap(({ value }) => {
      assertValueIsList(value, '`apply` argument must be a list of rules. For Example, ["integer", "max:255"].');
      return value.values.map(value => {
        assertValueIsString(value, 'rules must be a list of string. For Example, ["integer", "max:255"].');
        return buildApiSchema(rules, ignoreRules, value);
      });
    })
    .join('');
};

const buildApiSchema = (rules: Rules, ignoreRules: readonly string[], argValue: StringValueNode): string => {
  const method = parse(argValue.value);
  if (ignoreRules.includes(method.name)) {
    return '';
  }

  const mappedMethod = {
    ...method,
    name: mapMethodName(rules, method.name),
  };

  return codify(mappedMethod);
};

const mapMethodName = (rules: Rules, ruleName: string): string => {
  const ruleMapping = rules[ruleName];
  if (!ruleMapping) {
    return ruleName;
  }
  if (Array.isArray(ruleMapping)) {
    return ruleMapping[0];
  }
  return ruleMapping;
};

export const exportedForTesting = {
  buildApiFromDirectiveArguments,
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
