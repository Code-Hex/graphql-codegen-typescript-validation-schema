import {
  ConstArgumentNode,
  ConstDirectiveNode,
  ConstListValueNode,
  ConstValueNode,
  Kind,
  StringValueNode,
} from 'graphql';

import { Rules } from './config';

/**
 * GraphQL schema
 * ```graphql
 * input ExampleInput {
 *   email: String! @rules(apply: ["minLength:100", "email"])
 * }
 */
const targetDirectiveNames = ['rules', 'rulesForArray', 'rulesForInput'] as const;
const targetArgumentName = 'apply';

export const buildApi = (rules: Rules, directives: ReadonlyArray<ConstDirectiveNode>): string =>
  directives
    .filter(directive => (targetDirectiveNames as readonly string[]).includes(directive.name.value))
    .map(directive => {
      return buildApiFromDirectiveArguments(rules, directive.arguments ?? []);
    })
    .join('');

const buildApiFromDirectiveArguments = (rules: Rules, args: ReadonlyArray<ConstArgumentNode>): string => {
  return args
    .filter(arg => arg.name.value === targetArgumentName)
    .flatMap(({ value }) => {
      assertValueIsList(value, '`apply` argument must be a list of rules. For Example, ["integer", "max:255"].');
      return value.values.map(value => {
        assertValueIsString(value, 'rules must be a list of string. For Example, ["integer", "max:255"].');
        return buildApiSchema(rules, value);
      });
    })
    .join('');
};

const getMethodName = (rules: Rules, ruleName: string): string => {
  const ruleMapping = rules[ruleName];
  if (!ruleMapping) {
    return ruleName;
  }
  if (Array.isArray(ruleMapping)) {
    return ruleMapping[0];
  }
  return ruleMapping;
};
const buildApiSchema = (rules: Rules, argValue: StringValueNode): string => {
  const [ruleName, rest] = argValue.value.split(':');
  const methodName = getMethodName(rules, ruleName);
  const methodArguments = rest ? rest.split(',').map(parseArgument) : [];

  return `.${methodName}(${methodArguments.map(quoteIfNeeded).join(',')})`;
};

const parseArgument = (arg: string) => {
  if (parseInt(arg, 10).toString(10) === arg) {
    return parseInt(arg, 10);
  }
  if (parseFloat(arg).toString() === arg) {
    return parseFloat(arg);
  }
  if (arg.toLowerCase() === 'true') {
    return true;
  }
  if (arg.toLowerCase() === 'false') {
    return false;
  }
  return arg;
};

const quoteIfNeeded = (arg: any): string => {
  if (typeof arg === 'string') {
    return JSON.stringify(arg);
  }
  return `${arg}`;
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
