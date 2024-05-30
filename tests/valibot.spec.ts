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
    const result = await plugin(schema, [], { schema: 'valibot', scalars }, {});
    expect(result.content).toMatchInlineSnapshot(`
      "

      export function AInputSchema(): v.GenericSchema<AInput> {
        return v.object({
          b: v.lazy(() => BInputSchema())
        })
      }

      export function BInputSchema(): v.GenericSchema<BInput> {
        return v.object({
          c: v.lazy(() => CInputSchema())
        })
      }

      export function CInputSchema(): v.GenericSchema<CInput> {
        return v.object({
          a: v.lazy(() => AInputSchema())
        })
      }
      "
    `);
  })
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

      export function PageInputSchema(): v.GenericSchema<PageInput> {
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

      export function HttpInputSchema(): v.GenericSchema<HttpInput> {
        return v.object({
          method: v.nullish(HttpMethodSchema),
          url: v.any()
        })
      }
      "
    `);
  })
})
