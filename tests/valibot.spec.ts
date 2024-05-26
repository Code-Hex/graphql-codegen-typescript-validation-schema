import { buildSchema } from 'graphql';

import { plugin } from '../src/index';

describe('valibot', () => {
  it.each([
    [
      'non-null and defined',
      {
        textSchema: /* GraphQL */ `
          input PrimitiveInput {
            a: ID!
            b: String!
            c: Boolean!
            d: Int!
            e: Float!
          }
        `,
        wantContains: [
          'export function PrimitiveInputSchema()',
          'a: v.string(),',
          'b: v.string(),',
          'c: v.boolean(),',
          'd: v.number(),',
          'e: v.number()',
        ],
        scalars: {
          ID: 'string',
        },
      },
    ],
    [
      'nullish',
      {
        textSchema: /* GraphQL */ `
          input PrimitiveInput {
            a: ID
            b: String
            c: Boolean
            d: Int
            e: Float
            z: String! # no defined check
          }
        `,
        wantContains: [
          'export function PrimitiveInputSchema()',
          // alphabet order
          'a: v.nullish(v.string()),',
          'b: v.nullish(v.string()),',
          'c: v.nullish(v.boolean()),',
          'd: v.nullish(v.number()),',
          'e: v.nullish(v.number()),',
        ],
        scalars: {
          ID: 'string',
        },
      },
    ],
    [
      'array',
      {
        textSchema: /* GraphQL */ `
          input ArrayInput {
            a: [String]
            b: [String!]
            c: [String!]!
            d: [[String]]
            e: [[String]!]
            f: [[String]!]!
          }
        `,
        wantContains: [
          'export function ArrayInputSchema()',
          'a: v.nullish(v.array(v.nullable(v.string()))),',
          'b: v.nullish(v.array(v.string())),',
          'c: v.array(v.string()),',
          'd: v.nullish(v.array(v.nullish(v.array(v.nullable(v.string()))))),',
          'e: v.nullish(v.array(v.array(v.nullable(v.string())))),',
          'f: v.array(v.array(v.nullable(v.string())))',
        ],
        scalars: undefined,
      },
    ],
  ])('%s', async (_, { textSchema, wantContains, scalars }) => {
    const schema = buildSchema(textSchema);
    const result = await plugin(schema, [], { schema: 'valibot', scalars }, {});
    expect(result.prepend).toContain('import * as v from \'valibot\'');

    for (const wantContain of wantContains)
      expect(result.content).toContain(wantContain);
  });

  it.todo('ref input object')
  it.todo('nested input object')

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
    const result = await plugin(schema, [], { schema: 'valibot', scalars }, {});
    expect(result.content).toMatchInlineSnapshot(`
        "
        export const PageTypeSchema = v.enum_(PageType);

        export function PageInputSchema() {
          return v.object({
            pageType: PageTypeSchema
          })
        }
        "
      `);
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

      scalar URL # unknown scalar, should be any
    `);
    const scalars = undefined
    const result = await plugin(schema, [], { schema: 'valibot', scalars }, {});
    expect(result.content).toMatchInlineSnapshot(`
      "
      export const HttpMethodSchema = v.enum_(HttpMethod);

      export function HttpInputSchema() {
        return v.object({
          method: v.nullish(HttpMethodSchema),
          url: v.any()
        })
      }
      "
    `);
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
        schema: 'valibot',
        scalars: {
          Text: 'string',
          Count: 'number',
        },
      },
      {},
    );
    expect(result.content).toMatchInlineSnapshot(`
      "

      export function SaySchema() {
        return v.object({
          phrase: v.string(),
          times: v.number()
        })
      }
      "
    `);
  });

  it.todo('with importFrom');
  it.todo('with importFrom & useTypeImports')

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
        schema: 'valibot',
        enumsAsTypes: true,
      },
      {},
    );
    expect(result.content).toMatchInlineSnapshot(`
      "
      export const PageTypeSchema = v.picklist([\'PUBLIC\', \'BASIC_AUTH\']);
      "
    `);
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
        schema: 'valibot',
        notAllowEmptyString: true,
        scalars: {
          ID: 'string',
        },
      },
      {},
    );
    expect(result.content).toMatchInlineSnapshot(`
      "

      export function PrimitiveInputSchema() {
        return v.object({
          a: v.string([v.minLength(1)]),
          b: v.string([v.minLength(1)]),
          c: v.boolean(),
          d: v.number(),
          e: v.number()
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
        schema: 'valibot',
        notAllowEmptyString: true,
        scalars: {
          ID: 'string',
        },
      },
      {},
    );
    expect(result.content).toMatchInlineSnapshot(`
      "

      export function InputOneSchema() {
        return v.object({
          field: InputNestedSchema()
        })
      }

      export function InputNestedSchema() {
        return v.object({
          field: v.string([v.minLength(1)])
        })
      }
      "
    `);
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
        schema: 'valibot',
        scalarSchemas: {
          Date: 'v.date()',
          Email: 'v.string([v.email()])',
        },
      },
      {},
    );
    expect(result.content).toMatchInlineSnapshot(`
      "

      export function ScalarsInputSchema() {
        return v.object({
          date: v.date(),
          email: v.nullish(v.string([v.email()])),
          str: v.string()
        })
      }
      "
    `)
  });

  it.todo('with typesPrefix');
  it.todo('with typesSuffix');

  it('with default input values', async () => {
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
        schema: 'valibot',
        importFrom: './types',
      },
      {},
    );

    expect(result.content).toMatchInlineSnapshot(`
      "
      export const PageTypeSchema = v.enum_(PageType);

      export function PageInputSchema() {
        return v.object({
          pageType: v.optional(PageTypeSchema, "PUBLIC"),
          greeting: v.nullish(v.optional(v.string(), "Hello")),
          score: v.nullish(v.optional(v.number(), 100)),
          ratio: v.nullish(v.optional(v.number(), 0.5)),
          isMember: v.nullish(v.optional(v.boolean(), true))
        })
      }
      "
    `)
  });
})
