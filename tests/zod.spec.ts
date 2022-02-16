import { buildSchema } from 'graphql';
import { plugin } from '../src/index';

describe('zod', () => {
  test.each([
    [
      'non-null and defined',
      /* GraphQL */ `
        input PrimitiveInput {
          a: ID!
          b: String!
          c: Boolean!
          d: Int!
          e: Float!
        }
      `,
      [
        'export function PrimitiveInputSchema(): z.ZodSchema<PrimitiveInput>',
        'a: z.string()',
        'b: z.string()',
        'c: z.boolean()',
        'd: z.number()',
        'e: z.number()',
      ],
    ],
    [
      'nullish',
      /* GraphQL */ `
        input PrimitiveInput {
          a: ID
          b: String
          c: Boolean
          d: Int
          e: Float
          z: String! # no defined check
        }
      `,
      [
        'export function PrimitiveInputSchema(): z.ZodSchema<PrimitiveInput>',
        // alphabet order
        'a: z.string().nullish(),',
        'b: z.string().nullish(),',
        'c: z.boolean().nullish(),',
        'd: z.number().nullish(),',
        'e: z.number().nullish(),',
      ],
    ],
    [
      'array',
      /* GraphQL */ `
        input ArrayInput {
          a: [String]
          b: [String!]
          c: [String!]!
          d: [[String]]
          e: [[String]!]
          f: [[String]!]!
        }
      `,
      [
        'export function ArrayInputSchema(): z.ZodSchema<ArrayInput>',
        'a: z.array(z.string().nullable()).nullish(),',
        'b: z.array(z.string()).nullish(),',
        'c: z.array(z.string()),',
        'd: z.array(z.array(z.string().nullable()).nullish()).nullish(),',
        'e: z.array(z.array(z.string().nullable())).nullish(),',
        'f: z.array(z.array(z.string().nullable()))',
      ],
    ],
    [
      'ref input object',
      /* GraphQL */ `
        input AInput {
          b: BInput!
        }
        input BInput {
          c: CInput!
        }
        input CInput {
          a: AInput!
        }
      `,
      [
        'export function AInputSchema(): z.ZodSchema<AInput>',
        'b: z.lazy(() => BInputSchema())',
        'export function BInputSchema(): z.ZodSchema<BInput>',
        'c: z.lazy(() => CInputSchema())',
        'export function CInputSchema(): z.ZodSchema<CInput>',
        'a: z.lazy(() => AInputSchema())',
      ],
    ],
    [
      'nested input object',
      /* GraphQL */ `
        input NestedInput {
          child: NestedInput
          childrens: [NestedInput]
        }
      `,
      [
        'export function NestedInputSchema(): z.ZodSchema<NestedInput>',
        'child: z.lazy(() => NestedInputSchema().nullish()),',
        'childrens: z.array(z.lazy(() => NestedInputSchema().nullable())).nullish()',
      ],
    ],
    [
      'enum',
      /* GraphQL */ `
        enum PageType {
          PUBLIC
          BASIC_AUTH
        }
        input PageInput {
          pageType: PageType!
        }
      `,
      [
        'export const PageTypeSchema = z.nativeEnum(PageType)',
        'export function PageInputSchema(): z.ZodSchema<PageInput>',
        'pageType: PageTypeSchema',
      ],
    ],
    [
      'camelcase',
      /* GraphQL */ `
        input HTTPInput {
          method: HTTPMethod
          url: URL!
        }

        enum HTTPMethod {
          GET
          POST
        }

        scalar URL # unknown scalar, should be any (definedNonNullAnySchema)
      `,
      [
        'export function HttpInputSchema(): z.ZodSchema<HttpInput>',
        'export const HttpMethodSchema = z.nativeEnum(HttpMethod)',
        'method: HttpMethodSchema',
        'url: definedNonNullAnySchema',
      ],
    ],
  ])('%s', async (_, textSchema, wantContains) => {
    const schema = buildSchema(textSchema);
    const result = await plugin(schema, [], { schema: 'zod' }, {});
    expect(result.prepend).toContain("import { z } from 'zod'");

    for (const wantContain of wantContains) {
      expect(result.content).toContain(wantContain);
    }
  });

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
        schema: 'zod',
        scalars: {
          Text: 'string',
          Count: 'number',
        },
      },
      {}
    );
    expect(result.content).toContain('phrase: z.string()');
    expect(result.content).toContain('times: z.number()');
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
        schema: 'zod',
        importFrom: './types',
      },
      {}
    );
    expect(result.prepend).toContain("import { Say } from './types'");
    expect(result.content).toContain('phrase: z.string()');
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
        schema: 'zod',
        enumsAsTypes: true,
      },
      {}
    );
    expect(result.content).toContain("export const PageTypeSchema = z.enum(['PUBLIC', 'BASIC_AUTH'])");
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
        schema: 'zod',
        notAllowEmptyString: true,
      },
      {}
    );
    const wantContains = [
      'export function PrimitiveInputSchema(): z.ZodSchema<PrimitiveInput>',
      'a: z.string().min(1),',
      'b: z.string().min(1),',
      'c: z.boolean(),',
      'd: z.number(),',
      'e: z.number()',
    ];
    for (const wantContain of wantContains) {
      expect(result.content).toContain(wantContain);
    }
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
        schema: 'zod',
        scalarSchemas: {
          Date: 'z.date()',
          Email: 'z.string().email()',
        },
      },
      {}
    );
    const wantContains = [
      'export function ScalarsInputSchema(): z.ZodSchema<ScalarsInput>',
      'date: z.date(),',
      'email: z.string().email().nullish(),',
      'str: z.string()',
    ];
    for (const wantContain of wantContains) {
      expect(result.content).toContain(wantContain);
    }
  });
});
