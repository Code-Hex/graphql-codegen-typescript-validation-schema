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
})
