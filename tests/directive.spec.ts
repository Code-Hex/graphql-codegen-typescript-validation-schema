import { describe, expect, test } from 'vitest';
import { ConstDirectiveNode, Kind } from 'graphql';

import { buildApi } from '../src/directive';
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
  describe('buildApi', () => {
    const cases: {
      name: string;
      args: {
        rules: Rules;
        ignoreRules: readonly string[];
        args: ReadonlyArray<ConstDirectiveNode>;
      };
      want: string;
    }[] = [
      {
        name: 'valid',
        args: {
          rules: {},
          ignoreRules: ['exists'],
          args: [buildRulesDirectiveNode(['email:rfc', 'between:0,255'])],
        },
        want: `.email("rfc").between(0,255)`,
      },
    ];
    for (const tc of cases) {
      test(tc.name, () => {
        const { rules, ignoreRules, args } = tc.args;
        const got = buildApi(rules, ignoreRules, args);
        expect(got).toStrictEqual(tc.want);
      });
    }
  });
});
