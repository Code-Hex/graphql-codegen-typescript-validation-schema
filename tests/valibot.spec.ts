import { buildSchema } from 'graphql';

import { plugin } from '../src/index';

describe('valibot', () => {
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
    const result = await plugin(schema, [], { schema: 'valibot', scalars }, {});
    expect(result.content).toMatchInlineSnapshot(`
      "
      export function PrimitiveInputSchema(): v.GenericSchema<PrimitiveInput> {
        return v.object({
          a: v.string(),
          b: v.string(),
          c: v.boolean(),
          d: v.number(),
          e: v.number()
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
    const result = await plugin(schema, [], { schema: 'valibot', scalars }, {});
    expect(result.content).toMatchInlineSnapshot(`
      "
      export function PrimitiveInputSchema(): v.GenericSchema<PrimitiveInput> {
        return v.object({
          a: v.nullish(v.string()),
          b: v.nullish(v.string()),
          c: v.nullish(v.boolean()),
          d: v.nullish(v.number()),
          e: v.nullish(v.number()),
          z: v.string()
        })
      }
      "
    `);
  })
  it('array', async () => {
    const schema = buildSchema(/* GraphQL */ `
      input PrimitiveInput {
        a: [String]
        b: [String!]
        c: [String!]!
        d: [[String]]
        e: [[String]!]
        f: [[String]!]!
      }
    `);
    const scalars = undefined
    const result = await plugin(schema, [], { schema: 'valibot', scalars }, {});
    expect(result.content).toMatchInlineSnapshot(`
      "
      export function PrimitiveInputSchema(): v.GenericSchema<PrimitiveInput> {
        return v.object({
          a: v.nullish(v.array(v.nullable(v.string()))),
          b: v.nullish(v.array(v.string())),
          c: v.array(v.string()),
          d: v.nullish(v.array(v.nullish(v.array(v.nullable(v.string()))))),
          e: v.nullish(v.array(v.array(v.nullable(v.string())))),
          f: v.array(v.array(v.nullable(v.string())))
        })
      }
      "
    `);
  })
})