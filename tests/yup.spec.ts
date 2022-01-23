import { buildSchema } from 'graphql';
import { plugin } from '../src/index';

describe('yup', () => {
  test.each([
    [
      'defined',
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
        'export function PrimitiveInputSchema(): yup.SchemaOf<PrimitiveInput>',
        'a: yup.string().defined()',
        'b: yup.string().defined()',
        'c: yup.boolean().defined()',
        'd: yup.number().defined()',
        'e: yup.number().defined()',
      ],
    ],
    [
      'optional',
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
        'export function PrimitiveInputSchema(): yup.SchemaOf<PrimitiveInput>',
        // alphabet order
        'a: yup.string(),',
        'b: yup.string(),',
        'c: yup.boolean(),',
        'd: yup.number(),',
        'e: yup.number(),',
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
        'export function ArrayInputSchema(): yup.SchemaOf<ArrayInput>',
        'a: yup.array().of(yup.string()).optional(),',
        'b: yup.array().of(yup.string().defined()).optional(),',
        'c: yup.array().of(yup.string().defined()).defined(),',
        'd: yup.array().of(yup.array().of(yup.string()).optional()).optional(),',
        'e: yup.array().of(yup.array().of(yup.string()).defined()).optional(),',
        'f: yup.array().of(yup.array().of(yup.string()).defined()).defined()',
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
        'export function AInputSchema(): yup.SchemaOf<AInput>',
        'b: yup.lazy(() => BInputSchema().defined()) as never',
        'export function BInputSchema(): yup.SchemaOf<BInput>',
        'c: yup.lazy(() => CInputSchema().defined()) as never',
        'export function CInputSchema(): yup.SchemaOf<CInput>',
        'a: yup.lazy(() => AInputSchema().defined()) as never',
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
        'export function NestedInputSchema(): yup.SchemaOf<NestedInput>',
        'child: yup.lazy(() => NestedInputSchema()) as never,',
        'childrens: yup.array().of(yup.lazy(() => NestedInputSchema()) as never).optional()',
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
        'export const PageTypeSchema = yup.mixed().oneOf([PageType.Public, PageType.BasicAuth])',
        'export function PageInputSchema(): yup.SchemaOf<PageInput>',
        'pageType: PageTypeSchema.defined()',
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

        scalar URL # unknown scalar, should be any (yup.mixed())
      `,
      [
        'export function HttpInputSchema(): yup.SchemaOf<HttpInput>',
        'export const HttpMethodSchema = yup.mixed().oneOf([HttpMethod.Get, HttpMethod.Post])',
        'method: HttpMethodSchema',
        'url: yup.mixed().defined()',
      ],
    ],
  ])('%s', async (_, textSchema, wantContains) => {
    const schema = buildSchema(textSchema);
    const result = await plugin(schema, [], {}, {});
    expect(result.prepend).toContain("import * as yup from 'yup'");

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
        scalars: {
          Text: 'string',
          Count: 'number',
        },
      },
      {}
    );
    expect(result.content).toContain('phrase: yup.string().defined()');
    expect(result.content).toContain('times: yup.number().defined()');
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
        importFrom: './types',
      },
      {}
    );
    expect(result.prepend).toContain("import { Say } from './types'");
    expect(result.content).toContain('phrase: yup.string().defined()');
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
        enumsAsTypes: true,
      },
      {}
    );
    expect(result.content).toContain("export const PageTypeSchema = yup.mixed().oneOf(['PUBLIC', 'BASIC_AUTH'])");
  });
});
