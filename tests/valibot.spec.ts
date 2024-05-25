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
  ])('%s', async (_, { textSchema, wantContains, scalars }) => {
    const schema = buildSchema(textSchema);
    const result = await plugin(schema, [], { schema: 'valibot', scalars }, {});
    expect(result.prepend).toContain('import * as v from \'valibot\'');

    for (const wantContain of wantContains)
      expect(result.content).toContain(wantContain);
  });
})
