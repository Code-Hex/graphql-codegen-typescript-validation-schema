import {
  ConstArgumentNode,
  ConstDirectiveNode,
  ConstListValueNode,
  ConstValueNode,
  Kind,
  StringValueNode,
} from 'graphql';

import { Rules } from './config';
import { TsValidationMethodCallMapper } from './TsValidationMethodCallMapper';

/**
 * GraphQL schema
 * ```graphql
 * input ExampleInput {
 *   email: String! @rules(apply: ["minLength:100", "email"])
 * }
 */
const supportedDirectiveNames = ['rules', 'rulesForArray'] as const;
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
  };

  for (const directive of directives) {
    if (isSupportedDirective(directive.name.value)) {
      ret[directive.name.value] = buildApiFromDirectiveArguments(rules, ignoreRules, directive.arguments ?? []);
    }
  }

  return ret;
};

const buildApiFromDirectiveArguments = (
  rules: Rules,
  ignoreRules: readonly string[],
  args: readonly ConstArgumentNode[]
): string => {
  let sometimesIncluded = false;
  const methodChain = args
    .filter(arg => arg.name.value === supportedArgumentName)
    .flatMap(({ value }) => {
      assertValueIsList(value, '`apply` argument must be a list of rules. For Example, ["integer", "max:255"].');
      return value.values.map(value => {
        assertValueIsString(value, 'rules must be a list of string. For Example, ["integer", "max:255"].');
        const built = buildApiSchema(rules, ignoreRules, value);
        if (built.sometimes) {
          sometimesIncluded = true;
          return '';
        }
        return built.value;
      });
    })
    .join('');

  if (sometimesIncluded) {
    return `.sometimes(schema => schema${methodChain})`;
  }

  return methodChain;
};

const buildApiSchema = (
  rules: Rules,
  ignoreRules: readonly string[],
  argValue: StringValueNode
):
  | {
      sometimes: false;
      value: string;
    }
  | {
      sometimes: true;
    } => {
  if (argValue.value === 'sometimes') {
    return {
      sometimes: true,
    };
  }

  const mapper = new TsValidationMethodCallMapper(rules, ignoreRules);
  const tsValidationRuleMethodCall = mapper.create(argValue.value);
  return {
    sometimes: false,
    value: tsValidationRuleMethodCall?.toString() ?? '',
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
