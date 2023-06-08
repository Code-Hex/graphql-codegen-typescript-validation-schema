import { ConstArgumentNode, ConstDirectiveNode, ConstValueNode, Kind, NameNode, parseConstValue } from 'graphql';

import { DirectiveConfig, DirectiveObjectArguments } from '../src/config';
import {
  buildApi,
  exportedForTesting,
  formatDirectiveConfig,
  formatDirectiveObjectArguments,
  FormattedDirectiveArguments,
  FormattedDirectiveConfig,
  FormattedDirectiveObjectArguments,
} from '../src/directive';

const { applyArgToApiSchemaTemplate, buildApiFromDirectiveObjectArguments, buildApiFromDirectiveArguments } =
  exportedForTesting;

const buildNameNode = (name: string): NameNode => ({
  kind: Kind.NAME,
  value: name,
});

const buildConstArgumentNodes = (args: Record<string, string>): ConstArgumentNode[] =>
  Object.entries(args).map(
    ([argName, argValue]): ConstArgumentNode => ({
      kind: Kind.ARGUMENT,
      name: buildNameNode(argName),
      value: parseConstValue(argValue),
    })
  );

const buildConstDirectiveNodes = (name: string, args: Record<string, string>): ConstDirectiveNode => ({
  kind: Kind.DIRECTIVE,
  name: buildNameNode(name),
  arguments: buildConstArgumentNodes(args),
});

describe('format directive config', () => {
  describe('formatDirectiveObjectArguments', () => {
    const cases: {
      name: string;
      arg: DirectiveObjectArguments;
      want: FormattedDirectiveObjectArguments;
    }[] = [
      {
        name: 'normal',
        arg: {
          uri: 'url',
          email: 'email',
        },
        want: {
          uri: ['url', '$2'],
          email: ['email', '$2'],
        },
      },
      {
        name: 'contains array',
        arg: {
          startWith: ['matches', '/^$2/'],
          email: 'email',
        },
        want: {
          startWith: ['matches', '/^$2/'],
          email: ['email', '$2'],
        },
      },
    ];
    for (const tc of cases) {
      test(tc.name, () => {
        const got = formatDirectiveObjectArguments(tc.arg);
        expect(got).toStrictEqual(tc.want);
      });
    }
  });

  describe('formatDirectiveConfig', () => {
    const cases: {
      name: string;
      arg: DirectiveConfig;
      want: FormattedDirectiveConfig;
    }[] = [
      {
        name: 'normal',
        arg: {
          required: {
            msg: 'required',
          },
          constraint: {
            minLength: 'min',
            format: {
              uri: 'url',
              email: 'email',
            },
          },
        },
        want: {
          required: {
            msg: ['required', '$1'],
          },
          constraint: {
            minLength: ['min', '$1'],
            format: {
              uri: ['url', '$2'],
              email: ['email', '$2'],
            },
          },
        },
      },
      {
        name: 'complex',
        arg: {
          required: {
            msg: 'required',
          },
          constraint: {
            startWith: ['matches', '/^$1/g'],
            format: {
              uri: ['url', '$2'],
              email: 'email',
            },
          },
        },
        want: {
          required: {
            msg: ['required', '$1'],
          },
          constraint: {
            startWith: ['matches', '/^$1/g'],
            format: {
              uri: ['url', '$2'],
              email: ['email', '$2'],
            },
          },
        },
      },
    ];
    for (const tc of cases) {
      test(tc.name, () => {
        const got = formatDirectiveConfig(tc.arg);
        expect(got).toStrictEqual(tc.want);
      });
    }
  });

  describe('applyArgToApiSchemaTemplate', () => {
    const cases: {
      name: string;
      args: {
        template: string;
        apiArgs: any[];
      };
      want: string;
    }[] = [
      {
        name: 'string',
        args: {
          template: '$1',
          apiArgs: ['hello'],
        },
        want: `"hello"`,
      },
      {
        name: 'regexp string',
        args: {
          template: '$1',
          apiArgs: ['/hello/g'],
        },
        want: `/hello/g`,
      },
      {
        name: 'number',
        args: {
          template: '$1',
          apiArgs: [10],
        },
        want: '10',
      },
      {
        name: 'boolean',
        args: {
          template: '$1',
          apiArgs: [true],
        },
        want: 'true',
      },
      {
        name: 'array',
        args: {
          template: '$1',
          apiArgs: [['hello', 'world']],
        },
        want: `"hello","world"`,
      },
      {
        name: 'object',
        args: {
          template: '$1',
          apiArgs: [{ hello: 'world' }],
        },
        want: `{"hello":"world"}`,
      },
      {
        name: 'multiple',
        args: {
          template: '^$1|$2',
          apiArgs: ['hello', 'world'],
        },
        want: `"^hello|world"`,
      },
      {
        name: 'use only $2',
        args: {
          template: '$2$',
          apiArgs: ['hello', 'world'],
        },
        want: `"world$"`,
      },
      {
        name: 'does not match all',
        args: {
          template: '^$1',
          apiArgs: [],
        },
        want: `"^"`,
      },
      {
        name: 'if does not exists index',
        args: {
          template: '$1 $2 $3',
          apiArgs: ['hello', 'world'],
        },
        want: `"hello world "`,
      },
    ];
    for (const tc of cases) {
      test(tc.name, () => {
        const { template, apiArgs } = tc.args;
        const got = applyArgToApiSchemaTemplate(template, apiArgs);
        expect(got).toBe(tc.want);
      });
    }
  });

  describe('buildApiFromDirectiveObjectArguments', () => {
    const cases: {
      name: string;
      args: {
        config: FormattedDirectiveObjectArguments;
        argValue: ConstValueNode;
      };
      want: string;
    }[] = [
      {
        name: 'contains in config',
        args: {
          config: {
            uri: ['url', '$2'],
          },
          argValue: parseConstValue(`"uri"`),
        },
        want: `.url()`,
      },
      {
        name: 'does not contains in config',
        args: {
          config: {
            email: ['email', '$2'],
          },
          argValue: parseConstValue(`"uri"`),
        },
        want: ``,
      },
      {
        name: 'const value does not string type',
        args: {
          config: {
            email: ['email', '$2'],
          },
          argValue: parseConstValue(`123`),
        },
        want: ``,
      },
    ];
    for (const tc of cases) {
      test(tc.name, () => {
        const { config, argValue } = tc.args;
        const got = buildApiFromDirectiveObjectArguments(config, argValue);
        expect(got).toBe(tc.want);
      });
    }
  });

  describe('buildApiFromDirectiveArguments', () => {
    const cases: {
      name: string;
      args: {
        config: FormattedDirectiveArguments;
        args: ReadonlyArray<ConstArgumentNode>;
      };
      want: string;
    }[] = [
      {
        name: 'string',
        args: {
          config: {
            msg: ['required', '$1'],
          },
          args: buildConstArgumentNodes({
            msg: `"hello"`,
          }),
        },
        want: `.required("hello")`,
      },
      {
        name: 'string with additional stuff',
        args: {
          config: {
            startWith: ['matched', '^$1'],
          },
          args: buildConstArgumentNodes({
            startWith: `"hello"`,
          }),
        },
        want: `.matched("^hello")`,
      },
      {
        name: 'number',
        args: {
          config: {
            minLength: ['min', '$1'],
          },
          args: buildConstArgumentNodes({
            minLength: `1`,
          }),
        },
        want: `.min(1)`,
      },
      {
        name: 'boolean',
        args: {
          config: {
            // @strict(enabled: true)
            enabled: ['strict', '$1'],
          },
          args: buildConstArgumentNodes({
            enabled: `true`,
          }),
        },
        want: `.strict(true)`,
      },
      {
        name: 'list',
        args: {
          config: {
            minLength: ['min', '$1', '$2'],
          },
          args: buildConstArgumentNodes({
            minLength: `[1, "message"]`,
          }),
        },
        want: `.min(1, "message")`,
      },
      {
        name: 'object in list',
        args: {
          config: {
            matches: ['matches', '$1', '$2'],
          },
          args: buildConstArgumentNodes({
            matches: `["hello", {message:"message", excludeEmptyString:true}]`,
          }),
        },
        want: `.matches("hello", {"message":"message","excludeEmptyString":true})`,
      },
      {
        name: 'two arguments but matched to first argument',
        args: {
          config: {
            msg: ['required', '$1'],
          },
          args: buildConstArgumentNodes({
            msg: `"hello"`,
            msg2: `"world"`,
          }),
        },
        want: `.required("hello")`,
      },
      {
        name: 'two arguments but matched to second argument',
        args: {
          config: {
            msg2: ['required', '$1'],
          },
          args: buildConstArgumentNodes({
            msg: `"hello"`,
            msg2: `"world"`,
          }),
        },
        want: `.required("world")`,
      },
      {
        name: 'two arguments matched all',
        args: {
          config: {
            required: ['required', '$1'],
            minLength: ['min', '$1'],
          },
          args: buildConstArgumentNodes({
            required: `"message"`,
            minLength: `1`,
          }),
        },
        want: `.required("message").min(1)`,
      },
      {
        name: 'argument matches validation schema api',
        args: {
          config: {
            format: {
              uri: ['url'],
            },
          },
          args: buildConstArgumentNodes({
            format: `"uri"`,
          }),
        },
        want: `.url()`,
      },
      {
        name: "argument matched argument but doesn't match api",
        args: {
          config: {
            format: {
              uri: ['url'],
            },
          },
          args: buildConstArgumentNodes({
            format: `"uuid"`,
          }),
        },
        want: ``,
      },
      {
        name: 'complex',
        args: {
          config: {
            required: ['required', '$1'],
            format: {
              uri: ['url'],
            },
          },
          args: buildConstArgumentNodes({
            required: `"message"`,
            format: `"uri"`,
          }),
        },
        want: `.required("message").url()`,
      },
      {
        name: 'complex 2',
        args: {
          config: {
            required: ['required', '$1'],
            format: {
              uri: ['url'],
            },
          },
          args: buildConstArgumentNodes({
            required: `"message"`,
            format: `"uuid"`,
          }),
        },
        want: `.required("message")`,
      },
    ];
    for (const tc of cases) {
      test(tc.name, () => {
        const { config, args } = tc.args;
        const got = buildApiFromDirectiveArguments(config, args);
        expect(got).toStrictEqual(tc.want);
      });
    }
  });

  describe('buildApi', () => {
    const cases: {
      name: string;
      args: {
        config: FormattedDirectiveConfig;
        args: ReadonlyArray<ConstDirectiveNode>;
      };
      want: string;
    }[] = [
      {
        name: 'valid',
        args: {
          config: {
            required: {
              msg: ['required', '$1'],
            },
            constraint: {
              minLength: ['min', '$1'],
              format: {
                uri: ['url'],
                email: ['email'],
              },
            },
          },
          args: [
            // @required(msg: "message")
            buildConstDirectiveNodes('required', {
              msg: `"message"`,
            }),
            // @constraint(minLength: 100, format: "email")
            buildConstDirectiveNodes('constraint', {
              minLength: `100`,
              format: `"email"`,
            }),
          ],
        },
        want: `.required("message").min(100).email()`,
      },
    ];
    for (const tc of cases) {
      test(tc.name, () => {
        const { config, args } = tc.args;
        const got = buildApi(config, args);
        expect(got).toStrictEqual(tc.want);
      });
    }
  });
});
