import { buildClientSchema, buildSchema, introspectionFromSchema } from 'graphql';
import { dedent } from 'ts-dedent';

import { plugin } from '../src/index';

const initialEmitValue = dedent(`
  type Properties<T> = Required<{
    [K in keyof T]: z.ZodType<T[K]>;
  }>;

  type OneOf<T> = {
    [K in keyof Required<T>]: Required<{
      [V in keyof Pick<Required<T>, K>]: z.ZodType<Pick<Required<T>, K>[V], unknown, any>
    } & {
      [P in Exclude<keyof T, K>]: z.ZodNever
    }>
  }[keyof T];

  type definedNonNullAny = {};

  export const isDefinedNonNullAny = (v: any): v is definedNonNullAny => v !== undefined && v !== null;

  export const definedNonNullAnySchema = z.any().refine((v) => isDefinedNonNullAny(v));


`)

function removedInitialEmitValue(content: string) {
  return content.replace(initialEmitValue, '');
}

describe('zodv4', () => {
  it('non-null and defined', async () => {
    const schema = buildSchema(/* GraphQL */ `
      input PrimitiveInput {
        a: ID!
        b: String!
        c: Boolean!
        d: Int!
        e: Float!
      }
    `);
    const scalars = {
      ID: 'string',
    }
    const result = await plugin(schema, [], { schema: 'zodv4', scalars }, {});
    expect(result.prepend).toMatchInlineSnapshot(`
      [
        "import * as z from 'zod'",
      ]
    `);

    expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
      "
      export function PrimitiveInputSchema(): z.ZodObject<Properties<PrimitiveInput>> {
        return z.object({
          a: z.string(),
          b: z.string(),
          c: z.boolean(),
          d: z.number(),
          e: z.number()
        })
      }
      "
    `);
  })

  it('nullish', async () => {
    const schema = buildSchema(/* GraphQL */ `
      input PrimitiveInput {
        a: ID
        b: String
        c: Boolean
        d: Int
        e: Float
        z: String! # no defined check
      }
    `);
    const scalars = {
      ID: 'string',
    }
    const result = await plugin(schema, [], { schema: 'zodv4', scalars }, {});

    expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
      "
      export function PrimitiveInputSchema(): z.ZodObject<Properties<PrimitiveInput>> {
        return z.object({
          a: z.string().nullish(),
          b: z.string().nullish(),
          c: z.boolean().nullish(),
          d: z.number().nullish(),
          e: z.number().nullish(),
          z: z.string()
        })
      }
      "
    `)
  })

  it('array', async () => {
    const schema = buildSchema(/* GraphQL */ `
          input ArrayInput {
            a: [String]
            b: [String!]
            c: [String!]!
            d: [[String]]
            e: [[String]!]
            f: [[String]!]!
          }
    `);
    const scalars = undefined
    const result = await plugin(schema, [], { schema: 'zodv4', scalars }, {});
    expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
      "
      export function ArrayInputSchema(): z.ZodObject<Properties<ArrayInput>> {
        return z.object({
          a: z.array(z.string().nullable()).nullish(),
          b: z.array(z.string()).nullish(),
          c: z.array(z.string()),
          d: z.array(z.array(z.string().nullable()).nullish()).nullish(),
          e: z.array(z.array(z.string().nullable())).nullish(),
          f: z.array(z.array(z.string().nullable()))
        })
      }
      "
    `)
  })

  it('array w/ scalars', async () => {
    const schema = buildSchema(/* GraphQL */ `
          input ArrayInput {
            a: [Count]
            b: [Text!]
            c: [Count!]!
            d: [[Text]]
            e: [[Count]!]
            f: [[Text]!]!
          }

          scalar Count
          scalar Text
    `);

    const scalars = {
      Text: 'string',
      Count: 'number',
    }

    const result = await plugin(schema, [], { schema: 'zodv4', scalars }, {});
    expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
      "
      export function ArrayInputSchema(): z.ZodObject<Properties<ArrayInput>> {
        return z.object({
          a: z.array(z.number().nullable()).nullish(),
          b: z.array(z.string()).nullish(),
          c: z.array(z.number()),
          d: z.array(z.array(z.string().nullable()).nullish()).nullish(),
          e: z.array(z.array(z.number().nullable())).nullish(),
          f: z.array(z.array(z.string().nullable()))
        })
      }
      "
    `)
  })

  it('ref input object', async () => {
    const schema = buildSchema(/* GraphQL */ `
          input AInput {
            b: BInput!
          }
          input BInput {
            c: CInput!
          }
          input CInput {
            a: AInput!
          }
    `);
    const scalars = undefined
    const result = await plugin(schema, [], { schema: 'zodv4', scalars }, {});
    expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
      "
      export function AInputSchema(): z.ZodObject<Properties<AInput>> {
        return z.object({
          b: z.lazy(() => BInputSchema())
        })
      }

      export function BInputSchema(): z.ZodObject<Properties<BInput>> {
        return z.object({
          c: z.lazy(() => CInputSchema())
        })
      }

      export function CInputSchema(): z.ZodObject<Properties<CInput>> {
        return z.object({
          a: z.lazy(() => AInputSchema())
        })
      }
      "
    `)
  })

  it('ref input object w/ schemaNamespacedImportName', async () => {
    const schema = buildSchema(/* GraphQL */ `
          input AInput {
            b: BInput!
          }
          input BInput {
            c: CInput!
          }
          input CInput {
            a: AInput!
          }
    `);
    const scalars = undefined
    const result = await plugin(schema, [], { schema: 'zodv4', scalars, importFrom: './types', schemaNamespacedImportName: 't' }, {});
    expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
      "
      export function AInputSchema(): z.ZodObject<Properties<t.AInput>> {
        return z.object({
          b: z.lazy(() => BInputSchema())
        })
      }

      export function BInputSchema(): z.ZodObject<Properties<t.BInput>> {
        return z.object({
          c: z.lazy(() => CInputSchema())
        })
      }

      export function CInputSchema(): z.ZodObject<Properties<t.CInput>> {
        return z.object({
          a: z.lazy(() => AInputSchema())
        })
      }
      "
    `)
  })

  it('nested input object', async () => {
    const schema = buildSchema(/* GraphQL */ `
          input NestedInput {
            child: NestedInput
            childrens: [NestedInput]
          }
    `);
    const scalars = undefined
    const result = await plugin(schema, [], { schema: 'zodv4', scalars }, {});
    expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
      "
      export function NestedInputSchema(): z.ZodObject<Properties<NestedInput>> {
        return z.object({
          child: z.lazy(() => NestedInputSchema().nullish()),
          childrens: z.array(z.lazy(() => NestedInputSchema().nullable())).nullish()
        })
      }
      "
    `)
  })

  it('enum', async () => {
    const schema = buildSchema(/* GraphQL */ `
          enum PageType {
            PUBLIC
            BASIC_AUTH
          }
          input PageInput {
            pageType: PageType!
          }
    `);
    const scalars = undefined
    const result = await plugin(schema, [], { schema: 'zodv4', scalars }, {});
    expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
      "
      export const PageTypeSchema = z.enum(PageType);

      export function PageInputSchema(): z.ZodObject<Properties<PageInput>> {
        return z.object({
          pageType: PageTypeSchema
        })
      }
      "
    `)
  })

  it('enum w/ schemaNamespacedImportName', async () => {
    const schema = buildSchema(/* GraphQL */ `
          enum PageType {
            PUBLIC
            BASIC_AUTH
          }
          input PageInput {
            pageType: PageType!
          }
    `);
    const scalars = undefined
    const result = await plugin(schema, [], { schema: 'zodv4', scalars, importFrom: './', schemaNamespacedImportName: 't' }, {});
    expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
      "
      export const PageTypeSchema = z.enum(t.PageType);

      export function PageInputSchema(): z.ZodObject<Properties<t.PageInput>> {
        return z.object({
          pageType: PageTypeSchema
        })
      }
      "
    `)
  })

  it('camelcase', async () => {
    const schema = buildSchema(/* GraphQL */ `
          input HTTPInput {
            method: HTTPMethod
            url: URL!
          }

          enum HTTPMethod {
            GET
            POST
          }

          scalar URL # unknown scalar, should be any (definedNonNullAnySchema)
    `);
    const scalars = undefined
    const result = await plugin(schema, [], { schema: 'zodv4', scalars }, {});
    expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
      "
      export const HttpMethodSchema = z.enum(HttpMethod);

      export function HttpInputSchema(): z.ZodObject<Properties<HttpInput>> {
        return z.object({
          method: HttpMethodSchema.nullish(),
          url: definedNonNullAnySchema
        })
      }
      "
    `)
  })

  it('with scalars', async () => {
    const schema = buildSchema(/* GraphQL */ `
      input Say {
        phrase: Text!
        times: Count!
      }

      scalar Count
      scalar Text
    `);
    const result = await plugin(
      schema,
      [],
      {
        schema: 'zodv4',
        scalars: {
          Text: 'string',
          Count: 'number',
        },
      },
      {},
    );
    expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
      "
      export function SaySchema(): z.ZodObject<Properties<Say>> {
        return z.object({
          phrase: z.string(),
          times: z.number()
        })
      }
      "
    `)
  });

  it('with importFrom', async () => {
    const schema = buildSchema(/* GraphQL */ `
      input Say {
        phrase: String!
      }
    `);
    const result = await plugin(
      schema,
      [],
      {
        schema: 'zodv4',
        importFrom: './types',
      },
      {},
    );
    expect(result.prepend).toMatchInlineSnapshot(`
      [
        "import * as z from 'zod'",
        "import { Say } from './types'",
      ]
    `);
    expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
      "
      export function SaySchema(): z.ZodObject<Properties<Say>> {
        return z.object({
          phrase: z.string()
        })
      }
      "
    `)
  });

  it('with importFrom & useTypeImports', async () => {
    const schema = buildSchema(/* GraphQL */ `
      input Say {
        phrase: String!
      }
    `);
    const result = await plugin(
      schema,
      [],
      {
        schema: 'zodv4',
        importFrom: './types',
        useTypeImports: true,
      },
      {},
    );
    expect(result.prepend).toMatchInlineSnapshot(`
      [
        "import * as z from 'zod'",
        "import type { Say } from './types'",
      ]
    `);
    expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
      "
      export function SaySchema(): z.ZodObject<Properties<Say>> {
        return z.object({
          phrase: z.string()
        })
      }
      "
    `)
  });

  it('with importFrom & schemaNamespacedImportName', async () => {
    const schema = buildSchema(/* GraphQL */ `
      input Say {
        phrase: String!
      }
    `);
    const result = await plugin(
      schema,
      [],
      {
        schema: 'zodv4',
        importFrom: './types',
        schemaNamespacedImportName: 't',
      },
      {},
    );
    expect(result.prepend).toMatchInlineSnapshot(`
      [
        "import * as z from 'zod'",
        "import * as t from './types'",
      ]
    `);
    expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
      "
      export function SaySchema(): z.ZodObject<Properties<t.Say>> {
        return z.object({
          phrase: z.string()
        })
      }
      "
    `)
  });

  it('with enumsAsTypes', async () => {
    const schema = buildSchema(/* GraphQL */ `
      enum PageType {
        PUBLIC
        BASIC_AUTH
      }
    `);
    const result = await plugin(
      schema,
      [],
      {
        schema: 'zodv4',
        enumsAsTypes: true,
      },
      {},
    );
    expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
      "
      export const PageTypeSchema = z.enum(['PUBLIC', 'BASIC_AUTH']);
      "
    `)
  });

  it('with enumsAsTypes + schemaNamespacedImportName', async () => {
    const schema = buildSchema(/* GraphQL */ `
      enum PageType {
        PUBLIC
        BASIC_AUTH
      }
    `);
    const result = await plugin(
      schema,
      [],
      {
        schema: 'zodv4',
        enumsAsTypes: true,
        importFrom: './types',
        schemaNamespacedImportName: 't',
      },
      {},
    );
    expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
      "
      export const PageTypeSchema = z.enum(['PUBLIC', 'BASIC_AUTH']);
      "
    `)
  });

  it('with notAllowEmptyString', async () => {
    const schema = buildSchema(/* GraphQL */ `
      input PrimitiveInput {
        a: ID!
        b: String!
        c: Boolean!
        d: Int!
        e: Float!
      }
    `);
    const result = await plugin(
      schema,
      [],
      {
        schema: 'zodv4',
        notAllowEmptyString: true,
        scalars: {
          ID: 'string',
        },
      },
      {},
    );
    expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
      "
      export function PrimitiveInputSchema(): z.ZodObject<Properties<PrimitiveInput>> {
        return z.object({
          a: z.string().min(1),
          b: z.string().min(1),
          c: z.boolean(),
          d: z.number(),
          e: z.number()
        })
      }
      "
    `)
  });

  it('with notAllowEmptyString issue #386', async () => {
    const schema = buildSchema(/* GraphQL */ `
      input InputOne {
        field: InputNested!
      }

      input InputNested {
        field: String!
      }
    `);
    const result = await plugin(
      schema,
      [],
      {
        schema: 'zodv4',
        notAllowEmptyString: true,
        scalars: {
          ID: 'string',
        },
      },
      {},
    );
    expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
      "
      export function InputOneSchema(): z.ZodObject<Properties<InputOne>> {
        return z.object({
          field: z.lazy(() => InputNestedSchema())
        })
      }

      export function InputNestedSchema(): z.ZodObject<Properties<InputNested>> {
        return z.object({
          field: z.string().min(1)
        })
      }
      "
    `)
  });

  it('with scalarSchemas', async () => {
    const schema = buildSchema(/* GraphQL */ `
      input ScalarsInput {
        date: Date!
        email: Email
        str: String!
      }
      scalar Date
      scalar Email
    `);
    const result = await plugin(
      schema,
      [],
      {
        schema: 'zodv4',
        scalarSchemas: {
          Date: 'z.date()',
          Email: 'z.email()',
        },
      },
      {},
    );
    expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
      "
      export function ScalarsInputSchema(): z.ZodObject<Properties<ScalarsInput>> {
        return z.object({
          date: z.date(),
          email: z.email().nullish(),
          str: z.string()
        })
      }
      "
    `)
  });

  it('with defaultScalarTypeSchema', async () => {
    const schema = buildSchema(/* GraphQL */ `
      input ScalarsInput {
        date: Date!
        email: Email
        str: String!
      }
      scalar Date
      scalar Email
    `);
    const result = await plugin(
      schema,
      [],
      {
        schema: 'zodv4',
        scalarSchemas: {
          Email: 'z.email()',
        },
        defaultScalarTypeSchema: 'z.string()',
      },
      {},
    );
    expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
      "
      export function ScalarsInputSchema(): z.ZodObject<Properties<ScalarsInput>> {
        return z.object({
          date: z.string(),
          email: z.email().nullish(),
          str: z.string()
        })
      }
      "
    `)
  });

  it('with typesPrefix', async () => {
    const schema = buildSchema(/* GraphQL */ `
      input Say {
        phrase: String!
      }
    `);
    const result = await plugin(
      schema,
      [],
      {
        schema: 'zodv4',
        typesPrefix: 'I',
        importFrom: './types',
      },
      {},
    );
    expect(result.prepend).toMatchInlineSnapshot(`
      [
        "import * as z from 'zod'",
        "import { ISay } from './types'",
      ]
    `);
    expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
      "
      export function ISaySchema(): z.ZodObject<Properties<ISay>> {
        return z.object({
          phrase: z.string()
        })
      }
      "
    `)
  });

  it('with typesSuffix', async () => {
    const schema = buildSchema(/* GraphQL */ `
      input Say {
        phrase: String!
      }
    `);
    const result = await plugin(
      schema,
      [],
      {
        schema: 'zodv4',
        typesSuffix: 'I',
        importFrom: './types',
      },
      {},
    );
    expect(result.prepend).toMatchInlineSnapshot(`
      [
        "import * as z from 'zod'",
        "import { SayI } from './types'",
      ]
    `);
    expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
      "
      export function SayISchema(): z.ZodObject<Properties<SayI>> {
        return z.object({
          phrase: z.string()
        })
      }
      "
    `)
  });

  it('with default input values as enum types', async () => {
    const schema = buildSchema(/* GraphQL */ `
      enum PageType {
        PUBLIC
        BASIC_AUTH
      }
      input PageInput {
        pageType: PageType! = PUBLIC
        greeting: String = "Hello"
        score: Int = 100
        ratio: Float = 0.5
        isMember: Boolean = true
      }
    `);
    const result = await plugin(
      schema,
      [],
      {
        schema: 'zodv4',
        importFrom: './types',
        useEnumTypeAsDefaultValue: true,
      },
      {
      },
    );

    expect(result.content).toContain('export const PageTypeSchema = z.enum(PageType)');
    expect(result.content).toContain('export function PageInputSchema(): z.ZodObject<Properties<PageInput>>');

    expect(result.content).toContain('pageType: PageTypeSchema.default(PageType.Public)');
    expect(result.content).toContain('greeting: z.string().default("Hello").nullish()');
    expect(result.content).toContain('score: z.number().default(100).nullish()');
    expect(result.content).toContain('ratio: z.number().default(0.5).nullish()');
    expect(result.content).toContain('isMember: z.boolean().default(true).nullish()');
  });

  it('with default input values as enum types with underscores', async () => {
    const schema = buildSchema(/* GraphQL */ `
      enum PageType {
        BASIC_AUTH
        PUBLIC
      }
      input PageInput {
        pageType: PageType! = BASIC_AUTH
        greeting: String = "Hello"
        score: Int = 100
        ratio: Float = 0.5
        isMember: Boolean = true
      }
    `);
    const result = await plugin(
      schema,
      [],
      {
        schema: 'zodv4',
        importFrom: './types',
        useEnumTypeAsDefaultValue: true,
      },
      {
      },
    );

    expect(result.content).toContain('export const PageTypeSchema = z.enum(PageType)');
    expect(result.content).toContain('export function PageInputSchema(): z.ZodObject<Properties<PageInput>>');

    expect(result.content).toContain('pageType: PageTypeSchema.default(PageType.Basic_Auth)');
    expect(result.content).toContain('greeting: z.string().default("Hello").nullish()');
    expect(result.content).toContain('score: z.number().default(100).nullish()');
    expect(result.content).toContain('ratio: z.number().default(0.5).nullish()');
    expect(result.content).toContain('isMember: z.boolean().default(true).nullish()');
  });

  it('with default input values as enum types with no underscores', async () => {
    const schema = buildSchema(/* GraphQL */ `
      enum PageType {
        BASIC_AUTH
        PUBLIC
      }
      input PageInput {
        pageType: PageType! = BASIC_AUTH
        greeting: String = "Hello"
        score: Int = 100
        ratio: Float = 0.5
        isMember: Boolean = true
      }
    `);
    const result = await plugin(
      schema,
      [],
      {
        schema: 'zodv4',
        importFrom: './types',
        useEnumTypeAsDefaultValue: true,
        namingConvention: {
          transformUnderscore: true,
        },
      },
      {
      },
    );

    expect(result.content).toContain('export const PageTypeSchema = z.enum(PageType)');
    expect(result.content).toContain('export function PageInputSchema(): z.ZodObject<Properties<PageInput>>');

    expect(result.content).toContain('pageType: PageTypeSchema.default(PageType.BasicAuth)');
    expect(result.content).toContain('greeting: z.string().default("Hello").nullish()');
    expect(result.content).toContain('score: z.number().default(100).nullish()');
    expect(result.content).toContain('ratio: z.number().default(0.5).nullish()');
    expect(result.content).toContain('isMember: z.boolean().default(true).nullish()');
  });

  it('with default input values', async () => {
    const schema = buildSchema(/* GraphQL */ `
      enum PageType {
        PUBLIC
        BASIC_AUTH
      }
      input PageInput {
        pageType: PageType! = PUBLIC
        greeting: String = "Hello"
        newline: String = "Hello\\nWorld"
        score: Int = 100
        ratio: Float = 0.5
        isMember: Boolean = true
      }
    `);
    const result = await plugin(
      schema,
      [],
      {
        schema: 'zodv4',
        importFrom: './types',
      },
      {},
    );

    expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
      "
      export const PageTypeSchema = z.enum(PageType);

      export function PageInputSchema(): z.ZodObject<Properties<PageInput>> {
        return z.object({
          pageType: PageTypeSchema.default("PUBLIC"),
          greeting: z.string().default("Hello").nullish(),
          newline: z.string().default("Hello\\nWorld").nullish(),
          score: z.number().default(100).nullish(),
          ratio: z.number().default(0.5).nullish(),
          isMember: z.boolean().default(true).nullish()
        })
      }
      "
    `)
  });

  describe('issues #19', () => {
    it('string field', async () => {
      const schema = buildSchema(/* GraphQL */ `
        input UserCreateInput {
          profile: String @constraint(minLength: 1, maxLength: 5000)
        }

        directive @constraint(minLength: Int!, maxLength: Int!) on INPUT_FIELD_DEFINITION
      `);
      const result = await plugin(
        schema,
        [],
        {
          schema: 'zodv4',
          directives: {
            constraint: {
              minLength: ['min', '$1', 'Please input more than $1'],
              maxLength: ['max', '$1', 'Please input less than $1'],
            },
          },
        },
        {},
      );
      expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
        "
        export function UserCreateInputSchema(): z.ZodObject<Properties<UserCreateInput>> {
          return z.object({
            profile: z.string().min(1, "Please input more than 1").max(5000, "Please input less than 5000").nullish()
          })
        }
        "
      `)
    });

    it('not null field', async () => {
      const schema = buildSchema(/* GraphQL */ `
        input UserCreateInput {
          profile: String! @constraint(minLength: 1, maxLength: 5000)
        }

        directive @constraint(minLength: Int!, maxLength: Int!) on INPUT_FIELD_DEFINITION
      `);
      const result = await plugin(
        schema,
        [],
        {
          schema: 'zodv4',
          directives: {
            constraint: {
              minLength: ['min', '$1', 'Please input more than $1'],
              maxLength: ['max', '$1', 'Please input less than $1'],
            },
          },
        },
        {},
      );
      expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
        "
        export function UserCreateInputSchema(): z.ZodObject<Properties<UserCreateInput>> {
          return z.object({
            profile: z.string().min(1, "Please input more than 1").max(5000, "Please input less than 5000")
          })
        }
        "
      `)
    });

    it('list field', async () => {
      const schema = buildSchema(/* GraphQL */ `
        input UserCreateInput {
          profile: [String] @constraint(minLength: 1, maxLength: 5000)
        }

        directive @constraint(minLength: Int!, maxLength: Int!) on INPUT_FIELD_DEFINITION
      `);
      const result = await plugin(
        schema,
        [],
        {
          schema: 'zodv4',
          directives: {
            constraint: {
              minLength: ['min', '$1', 'Please input more than $1'],
              maxLength: ['max', '$1', 'Please input less than $1'],
            },
          },
        },
        {},
      );
      expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
        "
        export function UserCreateInputSchema(): z.ZodObject<Properties<UserCreateInput>> {
          return z.object({
            profile: z.array(z.string().nullable()).min(1, "Please input more than 1").max(5000, "Please input less than 5000").nullish()
          })
        }
        "
      `)
    });
  });

  describe('pR #112', () => {
    it('with notAllowEmptyString', async () => {
      const schema = buildSchema(/* GraphQL */ `
        input UserCreateInput {
          profile: String! @constraint(maxLength: 5000)
          age: Int!
        }

        directive @constraint(maxLength: Int!) on INPUT_FIELD_DEFINITION
      `);
      const result = await plugin(
        schema,
        [],
        {
          schema: 'zodv4',
          notAllowEmptyString: true,
          directives: {
            constraint: {
              maxLength: ['max', '$1', 'Please input less than $1'],
            },
          },
        },
        {},
      );
      expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
        "
        export function UserCreateInputSchema(): z.ZodObject<Properties<UserCreateInput>> {
          return z.object({
            profile: z.string().max(5000, "Please input less than 5000").min(1),
            age: z.number()
          })
        }
        "
      `)
    });

    it('without notAllowEmptyString', async () => {
      const schema = buildSchema(/* GraphQL */ `
        input UserCreateInput {
          profile: String! @constraint(maxLength: 5000)
          age: Int!
        }

        directive @constraint(maxLength: Int!) on INPUT_FIELD_DEFINITION
      `);
      const result = await plugin(
        schema,
        [],
        {
          schema: 'zodv4',
          directives: {
            constraint: {
              maxLength: ['max', '$1', 'Please input less than $1'],
            },
          },
        },
        {},
      );
      expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
        "
        export function UserCreateInputSchema(): z.ZodObject<Properties<UserCreateInput>> {
          return z.object({
            profile: z.string().max(5000, "Please input less than 5000"),
            age: z.number()
          })
        }
        "
      `)
    });
  });

  describe('with withObjectType', () => {
    it('not generate if withObjectType false', async () => {
      const schema = buildSchema(/* GraphQL */ `
        type User {
          id: ID!
          name: String
        }
      `);
      const result = await plugin(
        schema,
        [],
        {
          schema: 'zodv4',
        },
        {},
      );
      expect(result.content).not.toContain('export function UserSchema(): z.ZodObject<Properties<User>>');
    });

    it('generate object type contains object type', async () => {
      const schema = buildSchema(/* GraphQL */ `
        type Book {
          author: Author
          title: String
        }

        type Author {
          books: [Book]
          name: String
        }
      `);
      const result = await plugin(
        schema,
        [],
        {
          schema: 'zodv4',
          withObjectType: true,
        },
        {},
      );
      expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
        "
        export function BookSchema(): z.ZodObject<Properties<Book>> {
          return z.object({
            __typename: z.literal('Book').optional(),
            author: z.lazy(() => AuthorSchema().nullish()),
            title: z.string().nullish()
          })
        }

        export function AuthorSchema(): z.ZodObject<Properties<Author>> {
          return z.object({
            __typename: z.literal('Author').optional(),
            books: z.array(z.lazy(() => BookSchema().nullable())).nullish(),
            name: z.string().nullish()
          })
        }
        "
      `)

      for (const wantNotContain of ['Query', 'Mutation', 'Subscription'])
        expect(result.content).not.toContain(wantNotContain);
    });

    it('generate both input & type', async () => {
      const schema = buildSchema(/* GraphQL */ `
        scalar Date
        scalar Email
        input UserCreateInput {
          name: String!
          date: Date!
          email: Email!
        }
        input UsernameUpdateInput {
          updateInputId: ID!
          updateName: String!
        }
        type User {
          id: ID!
          name: String
          age: Int
          email: Email
          isMember: Boolean
          createdAt: Date!
        }

        type Mutation {
          _empty: String
        }

        type Query {
          _empty: String
        }

        type Subscription {
          _empty: String
        }
      `);
      const result = await plugin(
        schema,
        [],
        {
          schema: 'zodv4',
          withObjectType: true,
          scalarSchemas: {
            Date: 'z.date()',
            Email: 'z.email()',
          },
          scalars: {
            ID: {
              input: 'number',
              output: 'string',
            },
          },
        },
        {},
      );
      expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
        "
        export function UserCreateInputSchema(): z.ZodObject<Properties<UserCreateInput>> {
          return z.object({
            name: z.string(),
            date: z.date(),
            email: z.email()
          })
        }

        export function UsernameUpdateInputSchema(): z.ZodObject<Properties<UsernameUpdateInput>> {
          return z.object({
            updateInputId: z.number(),
            updateName: z.string()
          })
        }

        export function UserSchema(): z.ZodObject<Properties<User>> {
          return z.object({
            __typename: z.literal('User').optional(),
            id: z.string(),
            name: z.string().nullish(),
            age: z.number().nullish(),
            email: z.email().nullish(),
            isMember: z.boolean().nullish(),
            createdAt: z.date()
          })
        }
        "
      `)

      for (const wantNotContain of ['Query', 'Mutation', 'Subscription'])
        expect(result.content).not.toContain(wantNotContain);
    });

    it('generate union types', async () => {
      const schema = buildSchema(/* GraphQL */ `
        type Square {
          size: Int
        }
        type Circle {
          radius: Int
        }
        union Shape = Circle | Square
      `);

      const result = await plugin(
        schema,
        [],
        {
          schema: 'zodv4',
          withObjectType: true,
        },
        {},
      );

      expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
        "
        export function SquareSchema(): z.ZodObject<Properties<Square>> {
          return z.object({
            __typename: z.literal('Square').optional(),
            size: z.number().nullish()
          })
        }

        export function CircleSchema(): z.ZodObject<Properties<Circle>> {
          return z.object({
            __typename: z.literal('Circle').optional(),
            radius: z.number().nullish()
          })
        }

        export function ShapeSchema() {
          return z.union([CircleSchema(), SquareSchema()])
        }
        "
      `)
    });

    it('generate union types + schemaNamespacedImportName', async () => {
      const schema = buildSchema(/* GraphQL */ `
        type Square {
          size: Int
        }
        type Circle {
          radius: Int
        }
        union Shape = Circle | Square
      `);

      const result = await plugin(
        schema,
        [],
        {
          schema: 'zodv4',
          withObjectType: true,
          importFrom: './types',
          schemaNamespacedImportName: 't',
        },
        {},
      );

      expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
        "
        export function SquareSchema(): z.ZodObject<Properties<t.Square>> {
          return z.object({
            __typename: z.literal('Square').optional(),
            size: z.number().nullish()
          })
        }

        export function CircleSchema(): z.ZodObject<Properties<t.Circle>> {
          return z.object({
            __typename: z.literal('Circle').optional(),
            radius: z.number().nullish()
          })
        }

        export function ShapeSchema() {
          return z.union([CircleSchema(), SquareSchema()])
        }
        "
      `)
    });

    it('generate union types with single element', async () => {
      const schema = buildSchema(/* GraphQL */ `
        type Square {
          size: Int
        }
        type Circle {
          radius: Int
        }
        union Shape = Circle | Square

        type Geometry {
          shape: Shape
        }
      `);

      const result = await plugin(
        schema,
        [],
        {
          schema: 'zodv4',
          withObjectType: true,
        },
        {},
      );

      expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
        "
        export function SquareSchema(): z.ZodObject<Properties<Square>> {
          return z.object({
            __typename: z.literal('Square').optional(),
            size: z.number().nullish()
          })
        }

        export function CircleSchema(): z.ZodObject<Properties<Circle>> {
          return z.object({
            __typename: z.literal('Circle').optional(),
            radius: z.number().nullish()
          })
        }

        export function ShapeSchema() {
          return z.union([CircleSchema(), SquareSchema()])
        }

        export function GeometrySchema(): z.ZodObject<Properties<Geometry>> {
          return z.object({
            __typename: z.literal('Geometry').optional(),
            shape: z.lazy(() => ShapeSchema().nullish())
          })
        }
        "
      `)
    });

    it('correctly reference generated union types', async () => {
      const schema = buildSchema(/* GraphQL */ `
        type Circle {
          radius: Int
        }
        union Shape = Circle
      `);

      const result = await plugin(
        schema,
        [],
        {
          schema: 'zodv4',
          withObjectType: true,
        },
        {},
      );

      expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
        "
        export function CircleSchema(): z.ZodObject<Properties<Circle>> {
          return z.object({
            __typename: z.literal('Circle').optional(),
            radius: z.number().nullish()
          })
        }

        export function ShapeSchema() {
          return CircleSchema()
        }
        "
      `)
    });

    it('generate enum union types', async () => {
      const schema = buildSchema(/* GraphQL */ `
        enum PageType {
          PUBLIC
          BASIC_AUTH
        }

        enum MethodType {
          GET
          POST
        }

        union AnyType = PageType | MethodType
      `);

      const result = await plugin(
        schema,
        [],
        {
          schema: 'zodv4',
          withObjectType: true,
        },
        {},
      );

      expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
        "
        export const PageTypeSchema = z.enum(PageType);

        export const MethodTypeSchema = z.enum(MethodType);

        export function AnyTypeSchema() {
          return z.union([PageTypeSchema, MethodTypeSchema])
        }
        "
      `)
    });

    it('generate union types with single element, export as const', async () => {
      const schema = buildSchema(/* GraphQL */ `
        type Square {
          size: Int
        }
        type Circle {
          radius: Int
        }
        union Shape = Circle | Square

        type Geometry {
          shape: Shape
        }
      `);

      const result = await plugin(
        schema,
        [],
        {
          schema: 'zodv4',
          withObjectType: true,
          validationSchemaExportType: 'const',
        },
        {},
      );

      expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
        "
        export const CircleSchema: z.ZodObject<Properties<Circle>> = z.object({
            __typename: z.literal('Circle').optional(),
            radius: z.number().nullish()
        });

        export const SquareSchema: z.ZodObject<Properties<Square>> = z.object({
            __typename: z.literal('Square').optional(),
            size: z.number().nullish()
        });

        export const ShapeSchema = z.union([CircleSchema, SquareSchema]);

        export const GeometrySchema: z.ZodObject<Properties<Geometry>> = z.object({
            __typename: z.literal('Geometry').optional(),
            shape: z.lazy(() => ShapeSchema.nullish())
        });
        "
      `)
    });

    it('with object arguments', async () => {
      const schema = buildSchema(/* GraphQL */ `
        type MyType {
          foo(a: String, b: Int!, c: Boolean, d: Float!, e: Text): String
        }
        scalar Text
      `);
      const result = await plugin(
        schema,
        [],
        {
          schema: 'zodv4',
          withObjectType: true,
          scalars: {
            Text: 'string',
          },
        },
        {},
      );
      expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
        "
        export function MyTypeSchema(): z.ZodObject<Properties<MyType>> {
          return z.object({
            __typename: z.literal('MyType').optional(),
            foo: z.string().nullish()
          })
        }

        export function MyTypeFooArgsSchema(): z.ZodObject<Properties<MyTypeFooArgs>> {
          return z.object({
            a: z.string().nullish(),
            b: z.number(),
            c: z.boolean().nullish(),
            d: z.number(),
            e: z.string().nullish()
          })
        }
        "
      `)
    });

    describe('with InterfaceType', () => {
      it('not generate if withObjectType false', async () => {
        const schema = buildSchema(/* GraphQL */ `
          interface User {
            id: ID!
            name: String
          }
        `);
        const result = await plugin(
          schema,
          [],
          {
            schema: 'zodv4',
            withObjectType: false,
          },
          {},
        );
        expect(result.content).not.toContain('export function UserSchema(): z.ZodObject<Properties<User>>');
      });

      it('generate if withObjectType true', async () => {
        const schema = buildSchema(/* GraphQL */ `
          interface Book {
            title: String
          }
        `);
        const result = await plugin(
          schema,
          [],
          {
            schema: 'zodv4',
            withObjectType: true,
          },
          {},
        );
        expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
          "
          export function BookSchema(): z.ZodObject<Properties<Book>> {
            return z.object({
              title: z.string().nullish()
            })
          }
          "
        `)
        const wantNotContains = ['__typename: z.literal(\'Book\')'];

        for (const wantNotContain of wantNotContains)
          expect(result.content).not.toContain(wantNotContain);
      });

      it('generate interface type contains interface type', async () => {
        const schema = buildSchema(/* GraphQL */ `
          interface Book {
            author: Author
            title: String
          }

          interface Author {
            books: [Book]
            name: String
          }
        `);
        const result = await plugin(
          schema,
          [],
          {
            schema: 'zodv4',
            withObjectType: true,
          },
          {},
        );
        expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
          "
          export function BookSchema(): z.ZodObject<Properties<Book>> {
            return z.object({
              author: z.lazy(() => AuthorSchema().nullish()),
              title: z.string().nullish()
            })
          }

          export function AuthorSchema(): z.ZodObject<Properties<Author>> {
            return z.object({
              books: z.array(z.lazy(() => BookSchema().nullable())).nullish(),
              name: z.string().nullish()
            })
          }
          "
        `)
      });

      it('generate object type contains interface type', async () => {
        const schema = buildSchema(/* GraphQL */ `
          interface Book {
            title: String!
            author: Author!
          }

          type Textbook implements Book {
            title: String!
            author: Author!
            courses: [String!]!
          }

          type ColoringBook implements Book {
            title: String!
            author: Author!
            colors: [String!]!
          }

          type Author {
            books: [Book!]
            name: String
          }
        `);
        const result = await plugin(
          schema,
          [],
          {
            schema: 'zodv4',
            withObjectType: true,
          },
          {},
        );
        expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
          "
          export function BookSchema(): z.ZodObject<Properties<Book>> {
            return z.object({
              title: z.string(),
              author: z.lazy(() => AuthorSchema())
            })
          }

          export function TextbookSchema(): z.ZodObject<Properties<Textbook>> {
            return z.object({
              __typename: z.literal('Textbook').optional(),
              title: z.string(),
              author: z.lazy(() => AuthorSchema()),
              courses: z.array(z.string())
            })
          }

          export function ColoringBookSchema(): z.ZodObject<Properties<ColoringBook>> {
            return z.object({
              __typename: z.literal('ColoringBook').optional(),
              title: z.string(),
              author: z.lazy(() => AuthorSchema()),
              colors: z.array(z.string())
            })
          }

          export function AuthorSchema(): z.ZodObject<Properties<Author>> {
            return z.object({
              __typename: z.literal('Author').optional(),
              books: z.array(z.lazy(() => BookSchema())).nullish(),
              name: z.string().nullish()
            })
          }
          "
        `)
      });
    });
  });

  it('properly generates custom directive values', async () => {
    const schema = buildSchema(/* GraphQL */ `
      input UserCreateInput {
        name: String! @constraint(startsWith: "Sir")
        age: Int! @constraint(min: 0, max: 100)
      }
      directive @constraint(startsWith: String, min: Int, max: Int) on INPUT_FIELD_DEFINITION
    `);
    const result = await plugin(
      schema,
      [],
      {
        schema: 'zodv4',
        directives: {
          constraint: {
            min: 'min',
            max: 'max',
            startsWith: ['regex', '/^$1/'],
          },
        },
      },
      {},
    );
    expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
      "
      export function UserCreateInputSchema(): z.ZodObject<Properties<UserCreateInput>> {
        return z.object({
          name: z.string().regex(/^Sir/),
          age: z.number().min(0).max(100)
        })
      }
      "
    `)
  });

  it('exports as const instead of func', async () => {
    const schema = buildSchema(/* GraphQL */ `
      input Say {
        phrase: String!
      }
    `);
    const result = await plugin(
      schema,
      [],
      {
        schema: 'zodv4',
        validationSchemaExportType: 'const',
      },
      {},
    );
    expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
      "
      export const SaySchema: z.ZodObject<Properties<Say>> = z.object({
          phrase: z.string()
      });
      "
    `)
  });

  it('generate both input & type, export as const', async () => {
    const schema = buildSchema(/* GraphQL */ `
      scalar Date
      scalar Email
      input UserCreateInput {
        name: String!
        date: Date!
        email: Email!
      }
      type User {
        id: ID!
        name: String
        age: Int
        email: Email
        isMember: Boolean
        createdAt: Date!
      }
      type Mutation {
        _empty: String
      }
      type Query {
        _empty: String
      }
      type Subscription {
        _empty: String
      }
    `);
    const result = await plugin(
      schema,
      [],
      {
        schema: 'zodv4',
        withObjectType: true,
        scalarSchemas: {
          Date: 'z.date()',
          Email: 'z.email()',
        },
        validationSchemaExportType: 'const',
      },
      {},
    );

    expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
      "
      export const UserSchema: z.ZodObject<Properties<User>> = z.object({
          __typename: z.literal('User').optional(),
          id: z.string(),
          name: z.string().nullish(),
          age: z.number().nullish(),
          email: z.email().nullish(),
          isMember: z.boolean().nullish(),
          createdAt: z.date()
      });

      export const UserCreateInputSchema: z.ZodObject<Properties<UserCreateInput>> = z.object({
          name: z.string(),
          date: z.date(),
          email: z.email()
      });
      "
    `)

    for (const wantNotContain of ['Query', 'Mutation', 'Subscription'])
      expect(result.content).not.toContain(wantNotContain);
  });

  it('issue #394', async () => {
    const schema = buildSchema(/* GraphQL */ `
      enum Test {
        A
        B
      }

      type Query {
        _dummy: Test
      }

      input QueryInput {
        _dummy: Test
      }
    `);
    const query = introspectionFromSchema(schema);
    const clientSchema = buildClientSchema(query);
    const result = await plugin(
      clientSchema,
      [],
      {
        schema: 'zodv4',
        scalars: {
          ID: 'string',
        },
      },
      {},
    );
    expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
      "
      export const TestSchema = z.enum(Test);

      export function QueryInputSchema(): z.ZodObject<Properties<QueryInput>> {
        return z.object({
          _dummy: TestSchema.nullish()
        })
      }
      "
    `)
  });

  describe('with oneOf directive', () => {
    it('primitive defined', async () => {
      const schema = buildSchema(/* GraphQL */ `
      input PrimitiveInput @oneOf {
        a: ID
        b: String
        c: Boolean
        d: Int
        e: Float
      }

      directive @oneOf on INPUT_OBJECT | FIELD_DEFINITION
    `);
      const scalars = {
        ID: 'string',
      }
      const result = await plugin(schema, [], { schema: 'zodv4', scalars }, {});
      expect(result.prepend).toMatchInlineSnapshot(`
      [
        "import * as z from 'zod'",
      ]
    `);

      expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
        "
        export function PrimitiveInputSchema(): z.ZodUnion<z.ZodObject<OneOf<PrimitiveInput>>[]> {
          return z.union([
            z.object({
              a: z.string(),
              b: z.never(),
              c: z.never(),
              d: z.never(),
              e: z.never()
            }),
            z.object({
              a: z.never(),
              b: z.string(),
              c: z.never(),
              d: z.never(),
              e: z.never()
            }),
            z.object({
              a: z.never(),
              b: z.never(),
              c: z.boolean(),
              d: z.never(),
              e: z.never()
            }),
            z.object({
              a: z.never(),
              b: z.never(),
              c: z.never(),
              d: z.number(),
              e: z.never()
            }),
            z.object({
              a: z.never(),
              b: z.never(),
              c: z.never(),
              d: z.never(),
              e: z.number()
            })
          ])
        }
        "
      `);
    });

    it('array input', async () => {
      const schema = buildSchema(/* GraphQL */ `
          input ArrayInput @oneOf {
            a: [String]
            b: [String!]
            c: [[String]]
            d: [[String]!]
          }

          directive @oneOf on INPUT_OBJECT | FIELD_DEFINITION
    `);
      const scalars = undefined
      const result = await plugin(schema, [], { schema: 'zodv4', scalars }, {});
      expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
        "
        export function ArrayInputSchema(): z.ZodUnion<z.ZodObject<OneOf<ArrayInput>>[]> {
          return z.union([
            z.object({
              a: z.array(z.string().nullable()),
              b: z.never(),
              c: z.never(),
              d: z.never()
            }),
            z.object({
              a: z.never(),
              b: z.array(z.string()),
              c: z.never(),
              d: z.never()
            }),
            z.object({
              a: z.never(),
              b: z.never(),
              c: z.array(z.array(z.string().nullable()).nullish()),
              d: z.never()
            }),
            z.object({
              a: z.never(),
              b: z.never(),
              c: z.never(),
              d: z.array(z.array(z.string().nullable()))
            })
          ])
        }
        "
      `)
    })

    it('array input w/ scalars', async () => {
      const schema = buildSchema(/* GraphQL */ `
          input ArrayInput @oneOf {
            a: [Count]
            b: [Text!]
            c: [[Text]]
            d: [[Count]!]
          }

          scalar Count
          scalar Text

          directive @oneOf on INPUT_OBJECT | FIELD_DEFINITION
    `);

      const scalars = {
        Text: 'string',
        Count: 'number',
      }

      const result = await plugin(schema, [], { schema: 'zodv4', scalars }, {});
      expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
      "
      export function ArrayInputSchema(): z.ZodUnion<z.ZodObject<OneOf<ArrayInput>>[]> {
        return z.union([
          z.object({
            a: z.array(z.number().nullable()),
            b: z.never(),
            c: z.never(),
            d: z.never()
          }),
          z.object({
            a: z.never(),
            b: z.array(z.string()),
            c: z.never(),
            d: z.never()
          }),
          z.object({
            a: z.never(),
            b: z.never(),
            c: z.array(z.array(z.string().nullable()).nullish()),
            d: z.never()
          }),
          z.object({
            a: z.never(),
            b: z.never(),
            c: z.never(),
            d: z.array(z.array(z.number().nullable()))
          })
        ])
      }
      "
    `)
    })

    it('ref input object', async () => {
      const schema = buildSchema(/* GraphQL */ `
          input AInput @oneOf {
            b: BInput
            c: CInput 
          }
          input BInput @oneOf {
            c: CInput
            d: DInput
          }
          input CInput @oneOf {
            d: DInput
            e: EInput
          }
          input DInput @oneOf {
            e: EInput
            a: AInput
          }
          input EInput @oneOf {
            a: AInput
            b: BInput
          }

          directive @oneOf on INPUT_OBJECT | FIELD_DEFINITION
    `);
      const scalars = undefined
      const result = await plugin(schema, [], { schema: 'zodv4', scalars }, {});
      expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
        "
        export function AInputSchema(): z.ZodUnion<z.ZodObject<OneOf<AInput>>[]> {
          return z.union([
            z.object({
              b: z.lazy(() => BInputSchema()),
              c: z.never()
            }),
            z.object({
              b: z.never(),
              c: z.lazy(() => CInputSchema())
            })
          ])
        }

        export function BInputSchema(): z.ZodUnion<z.ZodObject<OneOf<BInput>>[]> {
          return z.union([
            z.object({
              c: z.lazy(() => CInputSchema()),
              d: z.never()
            }),
            z.object({
              c: z.never(),
              d: z.lazy(() => DInputSchema())
            })
          ])
        }

        export function CInputSchema(): z.ZodUnion<z.ZodObject<OneOf<CInput>>[]> {
          return z.union([
            z.object({
              d: z.lazy(() => DInputSchema()),
              e: z.never()
            }),
            z.object({
              d: z.never(),
              e: z.lazy(() => EInputSchema())
            })
          ])
        }

        export function DInputSchema(): z.ZodUnion<z.ZodObject<OneOf<DInput>>[]> {
          return z.union([
            z.object({
              e: z.lazy(() => EInputSchema()),
              a: z.never()
            }),
            z.object({
              e: z.never(),
              a: z.lazy(() => AInputSchema())
            })
          ])
        }

        export function EInputSchema(): z.ZodUnion<z.ZodObject<OneOf<EInput>>[]> {
          return z.union([
            z.object({
              a: z.lazy(() => AInputSchema()),
              b: z.never()
            }),
            z.object({
              a: z.never(),
              b: z.lazy(() => BInputSchema())
            })
          ])
        }
        "
      `)
    })

    it('nested input object', async () => {
      const schema = buildSchema(/* GraphQL */ `
          input NestedInput @oneOf {
            child: NestedInput
            childrens: [NestedInput]
          }

          directive @oneOf on INPUT_OBJECT | FIELD_DEFINITION
    `);
      const scalars = undefined
      const result = await plugin(schema, [], { schema: 'zodv4', scalars }, {});
      expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
        "
        export function NestedInputSchema(): z.ZodUnion<z.ZodObject<OneOf<NestedInput>>[]> {
          return z.union([
            z.object({
              child: z.lazy(() => NestedInputSchema()),
              childrens: z.never()
            }),
            z.object({
              child: z.never(),
              childrens: z.array(z.lazy(() => NestedInputSchema().nullable()))
            })
          ])
        }
        "
      `)
    })

    it('enum', async () => {
      const schema = buildSchema(/* GraphQL */ `
          enum PageType {
            PUBLIC
            BASIC_AUTH
          }
          enum AuthMethod {
            OAUTH
            JWT
            API_KEY
          }
          input PageInput @oneOf {
            pageType: PageType
            authMethod: AuthMethod
          }

          directive @oneOf on INPUT_OBJECT | FIELD_DEFINITION
    `);
      const scalars = undefined
      const result = await plugin(schema, [], { schema: 'zodv4', scalars }, {});
      expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
        "
        export const PageTypeSchema = z.enum(PageType);

        export const AuthMethodSchema = z.enum(AuthMethod);

        export function PageInputSchema(): z.ZodUnion<z.ZodObject<OneOf<PageInput>>[]> {
          return z.union([
            z.object({
              pageType: PageTypeSchema,
              authMethod: z.never()
            }),
            z.object({
              pageType: z.never(),
              authMethod: AuthMethodSchema
            })
          ])
        }
        "
      `)
    })

    it('with scalars', async () => {
      const schema = buildSchema(/* GraphQL */ `
      input Say @oneOf {
        phrase: Text
        times: Count
        word: Word
      }

      scalar Count
      scalar Text
      scalar Word # unknown scalar, should be any

      directive @oneOf on INPUT_OBJECT | FIELD_DEFINITION
    `);
      const result = await plugin(
        schema,
        [],
        {
          schema: 'zodv4',
          scalars: {
            Text: 'string',
            Count: 'number',
          },
        },
        {},
      );
      expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
        "
        export function SaySchema(): z.ZodUnion<z.ZodObject<OneOf<Say>>[]> {
          return z.union([
            z.object({
              phrase: z.string(),
              times: z.never(),
              word: z.never()
            }),
            z.object({
              phrase: z.never(),
              times: z.number(),
              word: z.never()
            }),
            z.object({
              phrase: z.never(),
              times: z.never(),
              word: definedNonNullAnySchema
            })
          ])
        }
        "
      `)
    });

    it('with notAllowEmptyString', async () => {
      const schema = buildSchema(/* GraphQL */ `
        input PrimitiveInput @oneOf {
          a: ID
          b: String
          c: Boolean
          d: Int
          e: Float
        }

        directive @oneOf on INPUT_OBJECT | FIELD_DEFINITION
      `);
      const result = await plugin(
        schema,
        [],
        {
          schema: 'zodv4',
          notAllowEmptyString: true,
          scalars: {
            ID: 'string',
          },
        },
        {},
      );
      expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
        "
        export function PrimitiveInputSchema(): z.ZodUnion<z.ZodObject<OneOf<PrimitiveInput>>[]> {
          return z.union([
            z.object({
              a: z.string().min(1),
              b: z.never(),
              c: z.never(),
              d: z.never(),
              e: z.never()
            }),
            z.object({
              a: z.never(),
              b: z.string().min(1),
              c: z.never(),
              d: z.never(),
              e: z.never()
            }),
            z.object({
              a: z.never(),
              b: z.never(),
              c: z.boolean(),
              d: z.never(),
              e: z.never()
            }),
            z.object({
              a: z.never(),
              b: z.never(),
              c: z.never(),
              d: z.number(),
              e: z.never()
            }),
            z.object({
              a: z.never(),
              b: z.never(),
              c: z.never(),
              d: z.never(),
              e: z.number()
            })
          ])
        }
        "
      `)
    });

    it('with notAllowEmptyString and custom directive', async () => {
      const schema = buildSchema(/* GraphQL */ `
        input PrimitiveInput @oneOf {
          a: ID
          b: String @constraint(maxLength: 5000)
          c: Boolean
          d: Int
          e: Float
        }

        directive @oneOf on INPUT_OBJECT | FIELD_DEFINITION
        directive @constraint(maxLength: Int!) on INPUT_FIELD_DEFINITION
      `);
      const result = await plugin(
        schema,
        [],
        {
          schema: 'zodv4',
          notAllowEmptyString: true,
          directives: {
            constraint: {
              maxLength: ['max', '$1', 'Please input less than $1'],
            },
          },
          scalars: {
            ID: 'string',
          },
        },
        {},
      );
      expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
        "
        export function PrimitiveInputSchema(): z.ZodUnion<z.ZodObject<OneOf<PrimitiveInput>>[]> {
          return z.union([
            z.object({
              a: z.string().min(1),
              b: z.never(),
              c: z.never(),
              d: z.never(),
              e: z.never()
            }),
            z.object({
              a: z.never(),
              b: z.string().max(5000, "Please input less than 5000").min(1),
              c: z.never(),
              d: z.never(),
              e: z.never()
            }),
            z.object({
              a: z.never(),
              b: z.never(),
              c: z.boolean(),
              d: z.never(),
              e: z.never()
            }),
            z.object({
              a: z.never(),
              b: z.never(),
              c: z.never(),
              d: z.number(),
              e: z.never()
            }),
            z.object({
              a: z.never(),
              b: z.never(),
              c: z.never(),
              d: z.never(),
              e: z.number()
            })
          ])
        }
        "
      `)
    });

    it('with notAllowEmptyString and nested input', async () => {
      const schema = buildSchema(/* GraphQL */ `
        input InputOne @oneOf {
          fieldOne: InputNestedOne
          fieldTwo: InputNestedTwo
        }

        input InputNestedOne {
          field: String!
        }

        input InputNestedTwo {
          field: String!
        }

        directive @oneOf on INPUT_OBJECT | FIELD_DEFINITION
      `);
      const result = await plugin(
        schema,
        [],
        {
          schema: 'zodv4',
          notAllowEmptyString: true,
          scalars: {
            ID: 'string',
          },
        },
        {},
      );
      expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
        "
        export function InputOneSchema(): z.ZodUnion<z.ZodObject<OneOf<InputOne>>[]> {
          return z.union([
            z.object({
              fieldOne: z.lazy(() => InputNestedOneSchema()),
              fieldTwo: z.never()
            }),
            z.object({
              fieldOne: z.never(),
              fieldTwo: z.lazy(() => InputNestedTwoSchema())
            })
          ])
        }

        export function InputNestedOneSchema(): z.ZodObject<Properties<InputNestedOne>> {
          return z.object({
            field: z.string().min(1)
          })
        }

        export function InputNestedTwoSchema(): z.ZodObject<Properties<InputNestedTwo>> {
          return z.object({
            field: z.string().min(1)
          })
        }
        "
      `)
    })

    it('with scalarSchemas', async () => {
      const schema = buildSchema(/* GraphQL */ `
        input ScalarsInput @oneOf {
          date: Date
          email: Email
          str: String
        }
        scalar Date
        scalar Email

        directive @oneOf on INPUT_OBJECT | FIELD_DEFINITION
      `);
      const result = await plugin(
        schema,
        [],
        {
          schema: 'zodv4',
          scalarSchemas: {
            Date: 'z.date()',
            Email: 'z.email()',
          },
        },
        {},
      );
      expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
        "
        export function ScalarsInputSchema(): z.ZodUnion<z.ZodObject<OneOf<ScalarsInput>>[]> {
          return z.union([
            z.object({
              date: z.date(),
              email: z.never(),
              str: z.never()
            }),
            z.object({
              date: z.never(),
              email: z.email(),
              str: z.never()
            }),
            z.object({
              date: z.never(),
              email: z.never(),
              str: z.string()
            })
          ])
        }
        "
      `)
    });

    it('with defaultScalarTypeSchema', async () => {
      const schema = buildSchema(/* GraphQL */ `
        input ScalarsInput @oneOf {
          date: Date
          email: Email
          str: String
        }
        scalar Date
        scalar Email

        directive @oneOf on INPUT_OBJECT | FIELD_DEFINITION
      `);
      const result = await plugin(
        schema,
        [],
        {
          schema: 'zodv4',
          scalarSchemas: {
            Email: 'z.email()',
          },
          defaultScalarTypeSchema: 'z.string()',
        },
        {},
      );
      expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
        "
        export function ScalarsInputSchema(): z.ZodUnion<z.ZodObject<OneOf<ScalarsInput>>[]> {
          return z.union([
            z.object({
              date: z.string(),
              email: z.never(),
              str: z.never()
            }),
            z.object({
              date: z.never(),
              email: z.email(),
              str: z.never()
            }),
            z.object({
              date: z.never(),
              email: z.never(),
              str: z.string()
            })
          ])
        }
        "
      `)
    });

    it('properly generates custom directive values', async () => {
      const schema = buildSchema(/* GraphQL */ `
        input UserCreateInput @oneOf {
          name: String @constraint(startsWith: "Sir")
          age: Int @constraint(min: 0, max: 100)
        }

        directive @oneOf on INPUT_OBJECT | FIELD_DEFINITION
        directive @constraint(startsWith: String, min: Int, max: Int) on INPUT_FIELD_DEFINITION
      `);
      const result = await plugin(
        schema,
        [],
        {
          schema: 'zodv4',
          directives: {
            constraint: {
              min: 'min',
              max: 'max',
              startsWith: ['regex', '/^$1/'],
            },
          },
        },
        {},
      );
      expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
        "
        export function UserCreateInputSchema(): z.ZodUnion<z.ZodObject<OneOf<UserCreateInput>>[]> {
          return z.union([
            z.object({
              name: z.string().regex(/^Sir/),
              age: z.never()
            }),
            z.object({
              name: z.never(),
              age: z.number().min(0).max(100)
            })
          ])
        }
        "
      `)
    });

    it('properly generates custom directive values for arrays', async () => {
      const schema = buildSchema(/* GraphQL */ `
        input UserCreateInput @oneOf {
          profile: [String] @constraint(minLength: 1, maxLength: 5000)
          prefs: [String] @constraint(minLength: 1, maxLength: 2000)
        }

        directive @oneOf on INPUT_OBJECT | FIELD_DEFINITION
        directive @constraint(minLength: Int!, maxLength: Int!) on INPUT_FIELD_DEFINITION
      `);
      const result = await plugin(
        schema,
        [],
        {
          schema: 'zodv4',
          directives: {
            constraint: {
              minLength: ['min', '$1', 'Please input more than $1'],
              maxLength: ['max', '$1', 'Please input less than $1'],
            },
          },
        },
        {},
      );
      expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
        "
        export function UserCreateInputSchema(): z.ZodUnion<z.ZodObject<OneOf<UserCreateInput>>[]> {
          return z.union([
            z.object({
              profile: z.array(z.string().nullable()).min(1, "Please input more than 1").max(5000, "Please input less than 5000"),
              prefs: z.never()
            }),
            z.object({
              profile: z.never(),
              prefs: z.array(z.string().nullable()).min(1, "Please input more than 1").max(2000, "Please input less than 2000")
            })
          ])
        }
        "
      `)
    });

    it('exports as const instead of func', async () => {
      const schema = buildSchema(/* GraphQL */ `
      input Say @oneOf {
        phrase: String
        word: String
      }

      directive @oneOf on INPUT_OBJECT | FIELD_DEFINITION
      `);
      const result = await plugin(
        schema,
        [],
        {
          schema: 'zodv4',
          validationSchemaExportType: 'const',
        },
        {},
      );

      expect(removedInitialEmitValue(result.content)).toMatchInlineSnapshot(`
        "
        export const SaySchema = z.union([
            z.object({
              phrase: z.string(),
              word: z.never()
            }),
            z.object({
              phrase: z.never(),
              word: z.string()
            })
        ]);
        "
      `)
    });
  });
});
