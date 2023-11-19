import { ConstDirectiveNode, Kind } from 'graphql';
import { describe, expect, test } from 'vitest';

import { Rules } from '../src/config';
import { DirectiveRenderer, GeneratedCodesForDirectives } from '../src/yup/DirectiveRenderer';

export const action = (
  fieldName: string,
  rules: Rules,
  ignoreRules: readonly string[],
  directives: readonly ConstDirectiveNode[]
): GeneratedCodesForDirectives => {
  const renderer = new DirectiveRenderer(rules, ignoreRules);
  return renderer.render(fieldName, directives);
};

const buildRulesDirectiveNode = (rules: readonly string[]): ConstDirectiveNode => ({
  kind: Kind.DIRECTIVE,
  name: {
    kind: Kind.NAME,
    value: 'rules',
  },
  arguments: [
    {
      kind: Kind.ARGUMENT,
      name: {
        kind: Kind.NAME,
        value: 'apply',
      },
      value: {
        kind: Kind.LIST,
        values: rules.map(rule => ({
          kind: Kind.STRING,
          value: rule,
        })),
      },
    },
  ],
});

describe('format directive config', () => {
  test.each<
    [
      string,
      {
        rules: Rules;
        ignoreRules: readonly string[];
        args: ReadonlyArray<ConstDirectiveNode>;
      },
      string,
      GeneratedCodesForDirectives,
    ]
  >([
    [
      'valid',
      {
        rules: {},
        ignoreRules: ['exists'],
        args: [buildRulesDirectiveNode(['email:rfc', 'between:0,255'])],
      },
      'field',
      {
        rules: `.email("rfc").between(0,255)`,
        rulesForArray: '',
      },
    ],
    [
      'withSometimes',
      {
        rules: {},
        ignoreRules: ['exists'],
        args: [buildRulesDirectiveNode(['varchar', 'max:10', 'sometimes'])],
      },
      'field',
      {
        rules: `.sometimes("field", schema => schema.varchar().max(10))`,
        rulesForArray: '',
      },
    ],
  ])('buildApi %s', (_, { rules, ignoreRules, args }, fieldName, want) => {
    expect(action(fieldName, rules, ignoreRules, args)).toStrictEqual(want);
  });
});
