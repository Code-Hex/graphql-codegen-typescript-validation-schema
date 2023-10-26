import { describe, expect, test } from 'vitest';
import { ConstDirectiveNode, Kind } from 'graphql';

import { buildApi, GeneratedCodesForDirectives } from '../src/directive';
import { Rules } from '../src/config';

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
      {
        rules: `.email("rfc").between(0,255)`,
        rulesForArray: '',
        rulesForInput: '',
      },
    ],
  ])('buildApi %s', (_, { rules, ignoreRules, args }, want) => {
    expect(buildApi(rules, ignoreRules, args)).toStrictEqual(want);
  });
});
