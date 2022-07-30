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
        notAllowEmptyString: true,
      },
      {}
    );
    const wantContains = [
      'export function PrimitiveInputSchema(): yup.SchemaOf<PrimitiveInput>',
      'a: yup.string().required(),',
      'b: yup.string().required(),',
      'c: yup.boolean().defined(),',
      'd: yup.number().defined(),',
      'e: yup.number().defined()',
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
        scalarSchemas: {
          Date: 'yup.date()',
          Email: 'yup.string().email()',
        },
      },
      {}
    );
    const wantContains = [
      'export function ScalarsInputSchema(): yup.SchemaOf<ScalarsInput>',
      'date: yup.date().defined(),',
      'email: yup.string().email(),',
      'str: yup.string().defined()',
    ];
    for (const wantContain of wantContains) {
      expect(result.content).toContain(wantContain);
    }
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
        typesPrefix: 'I',
        importFrom: './types',
      },
      {}
    );
    expect(result.prepend).toContain("import { ISay } from './types'");
    expect(result.content).toContain('export function ISaySchema(): yup.SchemaOf<ISay> {');
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
        typesSuffix: 'I',
        importFrom: './types',
      },
      {}
    );
    expect(result.prepend).toContain("import { SayI } from './types'");
    expect(result.content).toContain('export function SayISchema(): yup.SchemaOf<SayI> {');
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
          schema: 'yup',
        },
        {}
      );
      expect(result.content).not.toContain('export function UserSchema(): yup.SchemaOf<User> {');
    });

    it('generate object type contains object type', async () => {
      const schema = buildSchema(/* GraphQL */ `
        type Book {
          author: Author
          title: String
        }

        type Book2 {
          author: Author!
          title: String!
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
          schema: 'yup',
          withObjectType: true,
        },
        {}
      );
      const wantContains = [
        'export function AuthorSchema(): yup.SchemaOf<Author> {',
        "__typename: yup.mixed().oneOf(['Author', undefined]),",
        'books: yup.array().of(BookSchema().optional()).optional(),',
        'name: yup.string()',

        'export function BookSchema(): yup.SchemaOf<Book> {',
        "__typename: yup.mixed().oneOf(['Book', undefined]),",
        'author: AuthorSchema().optional(),',
        'title: yup.string()',

        'export function Book2Schema(): yup.SchemaOf<Book2> {',
        "__typename: yup.mixed().oneOf(['Book2', undefined]),",
        'author: AuthorSchema().optional().defined(),',
        'title: yup.string().defined()',
      ];
      for (const wantContain of wantContains) {
        expect(result.content).toContain(wantContain);
      }

      for (const wantNotContain of ['Query', 'Mutation', 'Subscription']) {
        expect(result.content).not.toContain(wantNotContain);
      }
    });

    it('generate both input & type if withObjectType true', async () => {
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
          schema: 'yup',
          withObjectType: true,
          scalarSchemas: {
            Date: 'yup.date()',
            Email: 'yup.string().email()',
          },
        },
        {}
      );
      const wantContains = [
        // User Create Input
        'export function UserCreateInputSchema(): yup.SchemaOf<UserCreateInput> {',
        'name: yup.string().defined(),',
        'date: yup.date().defined(),',
        'email: yup.string().email().defined()',
        // User
        'export function UserSchema(): yup.SchemaOf<User> {',
        "__typename: yup.mixed().oneOf(['User', undefined]),",
        'id: yup.string().defined(),',
        'name: yup.string(),',
        'age: yup.number(),',
        'isMember: yup.boolean(),',
        'email: yup.string().email(),',
        'createdAt: yup.date().defined()',
      ];
      for (const wantContain of wantContains) {
        expect(result.content).toContain(wantContain);
      }

      for (const wantNotContain of ['Query', 'Mutation', 'Subscription']) {
        expect(result.content).not.toContain(wantNotContain);
      }
    });
  });
});
