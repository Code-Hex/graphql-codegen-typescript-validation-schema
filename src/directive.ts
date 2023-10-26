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
const supportedDirectiveNames = ['rules', 'rulesForArray', 'rulesForInput'] as const;
type SupportedDirectiveName = (typeof supportedDirectiveNames)[number];
const supportedArgumentName = 'apply';

function isSupportedDirective(directiveName: string): directiveName is SupportedDirectiveName {
  return supportedDirectiveNames.includes(directiveName as SupportedDirectiveName);
}

export type GeneratedCodesForDirectives = Record<SupportedDirectiveName, string>;

export const buildApi = (
  rules: Rules,
  ignoreRules: readonly string[],
  directives: readonly ConstDirectiveNode[]
): GeneratedCodesForDirectives => {
  const ret: GeneratedCodesForDirectives = {
    rules: '',
    rulesForArray: '',
    rulesForInput: '',
  };

  for (const directive of directives) {
    if (isSupportedDirective(directive.name.value)) {
      ret[directive.name.value] = buildApiFromDirectiveArguments(rules, ignoreRules, directive.arguments ?? []);
    }
  }
  console.log(ret);

  return ret;
};

const buildApiFromDirectiveArguments = (
  rules: Rules,
  ignoreRules: readonly string[],
  args: readonly ConstArgumentNode[]
): string => {
  return args
    .filter(arg => arg.name.value === supportedArgumentName)
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
