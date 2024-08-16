import { buildClientSchema, buildSchema, introspectionFromSchema } from 'graphql';
import dedent from 'ts-dedent';
import { describe, expect, it, test } from 'vitest';

import { plugin } from '../src';

describe('yup', () => {
  test.each([
    [
      'defined',
      {
        textSchema: /* GraphQL */ `
          input PrimitiveInput {
            """
            A和名
            Aコメント
            """
            a: ID!
            "B和名"
            b: String!
            c: Boolean!
            d: Int!
            e: Float!
          }
        `,
        wantContains: [
          'export function PrimitiveInputSchema(): yup.ObjectSchema<PrimitiveInput>',
          'a: yup.string().label("A和名").nonNullable().defined(),',
          'b: yup.string().label("B和名").nonNullable().defined(),',
          'c: yup.boolean().nonNullable().defined()',
          'd: yup.number().nonNullable().defined()',
          'e: yup.number().nonNullable().defined()',
        ],
        scalars: {
          ID: 'string',
        },
        lazyTypes: undefined,
      },
    ],
    [
      'optional',
      {
        textSchema: /* GraphQL */ `
          input PrimitiveInput {
            """
            A和名
            Aコメント
            """
            a: ID
            "B和名"
            b: String
            c: Boolean
            d: Int
            e: Float
            z: String! # no defined check
          }
        `,
        wantContains: [
          'export function PrimitiveInputSchema(): yup.ObjectSchema<PrimitiveInput>',
          // alphabet order
          'a: yup.string().label("A和名").nullable(),',
          'b: yup.string().label("B和名").nullable(),',
          'c: yup.boolean().nullable(),',
          'd: yup.number().nullable(),',
          'e: yup.number().nullable(),',
        ],
        scalars: {
          ID: 'string',
        },
        lazyTypes: undefined,
      },
    ],
    [
      'array',
      {
        textSchema: /* GraphQL */ `
          input ArrayInput {
            """
            A和名
            Aコメント
            """
            a: [String]
            b: [String!]
            c: [String!]!
            d: [[String]]
            e: [[String]!]
            f: [[String]!]!
          }
        `,
        wantContains: [
          'export function ArrayInputSchema(): yup.ObjectSchema<ArrayInput>',
          'a: yup.array(yup.string().label("A和名").nullable().defined()).label("A和名").nullable(),',
          'b: yup.array(yup.string().nonNullable().defined()).nullable(),',
          'c: yup.array(yup.string().nonNullable().defined()).nonNullable().defined(),',
          'd: yup.array(yup.array(yup.string().nullable().defined()).nullable().defined()).nullable(),',
          'e: yup.array(yup.array(yup.string().nullable().defined()).nonNullable().defined()).nullable(),',
          'f: yup.array(yup.array(yup.string().nullable().defined()).nonNullable().defined()).nonNullable().defined()',
        ],
        scalars: undefined,
        lazyTypes: undefined,
      },
    ],
    [
      'ref input object',
      {
        textSchema: /* GraphQL */ `
          input AInput {
            b: BInput!
          }
          input BInput {
            c: CInput!
          }
          input CInput {
            """
            A和名
            Aコメント
            """
            a: AInput!
          }
        `,
        wantContains: [
          'export function AInputSchema(): yup.ObjectSchema<AInput>',
          'b: yup.lazy(() => BInputSchema().nonNullable().defined())',
          'export function BInputSchema(): yup.ObjectSchema<BInput>',
          'c: CInputSchema().nonNullable().defined()',
          'export function CInputSchema(): yup.ObjectSchema<CInput>',
          'a: AInputSchema().label("A和名").nonNullable().defined()',
        ],
        scalars: undefined,
        lazyTypes: ['BInput'],
      },
    ],
    [
      'nested input object',
      {
        textSchema: /* GraphQL */ `
          input NestedInput {
            """
            child和名
            """
            child: NestedInput
            """
            children和名
            """
            childrens: [NestedInput]
          }
        `,
        wantContains: [
          'export function NestedInputSchema(): yup.ObjectSchema<NestedInput>',
          'child: yup.lazy(() => NestedInputSchema().label("child和名").nullable()),',
          'childrens: yup.lazy(() => yup.array(NestedInputSchema().label("children和名").nullable().defined()).label("children和名").nullable())',
        ],
        scalars: undefined,
        lazyTypes: ['NestedInput'],
      },
    ],
    [
      'enum',
      {
        textSchema: /* GraphQL */ `
          enum PageType {
            PUBLIC
            BASIC_AUTH
          }
          input PageInput {
            """
            pageType和名
            """
            pageType: PageType!
          }
        `,
        wantContains: [
          'export const PageTypeSchema = yup.string<PageType>().oneOf([PageType.Public, PageType.BasicAuth]);',
          'export function PageInputSchema(): yup.ObjectSchema<PageInput>',
          'pageType: PageTypeSchema.label("pageType和名").nonNullable()',
        ],
        scalars: undefined,
        lazyTypes: undefined,
      },
    ],
    [
      'camelcase',
      {
        textSchema: /* GraphQL */ `
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
        wantContains: [
          'export function HttpInputSchema(): yup.ObjectSchema<HttpInput>',
          'export const HttpMethodSchema = yup.string<HttpMethod>().oneOf([HttpMethod.Get, HttpMethod.Post]);',
          'method: HttpMethodSchema.nullable(),',
          'url: yup.mixed().nonNullable().defined()',
        ],
        scalars: undefined,
        lazyTypes: undefined,
      },
    ],
  ])('%s', async (_, { textSchema, wantContains, scalars, lazyTypes }) => {
    const schema = buildSchema(textSchema);
    const result = await plugin(schema, [], { scalars, lazyTypes }, {});
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
    expect(result.content).toContain('phrase: yup.string()');
    expect(result.content).toContain('times: yup.number()');
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
    expect(result.content).toContain('phrase: yup.string()');
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
        importFrom: './types',
        useTypeImports: true,
      },
      {}
    );
    expect(result.prepend).toContain("import type { Say } from './types'");
    expect(result.content).toContain('phrase: yup.string()');
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
    expect(result.content).toContain("export const PageTypeSchema = yup.string().oneOf(['PUBLIC', 'BASIC_AUTH']);");
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
        scalarSchemas: {
          String: 'yup.string().required()',
          ID: 'yup.string().required()',
        },
      },
      {}
    );
    const wantContains = [
      'export function PrimitiveInputSchema(): yup.ObjectSchema<PrimitiveInput>',
      'a: yup.string().required().nonNullable().defined(),',
      'b: yup.string().required().nonNullable().defined(),',
      'c: yup.boolean().nonNullable().defined(),',
      'd: yup.number().nonNullable().defined(),',
      'e: yup.number().nonNullable().defined()',
    ];
    for (const wantContain of wantContains) {
      expect(result.content).toContain(wantContain);
    }
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
        scalarSchemas: {
          String: 'yup.string().required()',
          ID: 'yup.string().required()',
        },
      },
      {}
    );
    const wantContain = dedent`
    export function InputNestedSchema(): yup.ObjectSchema<InputNested> {
      return yup.object({
        field: yup.string().required().nonNullable().defined()
      }).strict()
    }`;
    expect(result.content).toContain(wantContain);
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
      'export function ScalarsInputSchema(): yup.ObjectSchema<ScalarsInput>',
      'date: yup.date().nonNullable().defined(),',
      'email: yup.string().email().nullable()',
      'str: yup.string().nonNullable().defined()',
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
    expect(result.content).toContain('export function ISaySchema(): yup.ObjectSchema<ISay> {');
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
    expect(result.content).toContain('export function SayISchema(): yup.ObjectSchema<SayI> {');
  });
  describe('with withObjectType', () => {
    it('not generate if withObjectType false', async () => {
      const schema = buildSchema(/* GraphQL */ `
        type User {
          id: ID!
          name: String
        }
      `);
      const result = await plugin(schema, [], {}, {});
      expect(result.content).not.toContain('export function UserSchema(): yup.ObjectSchema<User> {');
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
          withObjectType: 'all',
        },
        {}
      );
      const wantContains = [
        'export function AuthorSchema(): yup.ObjectSchema<Author> {',
        "__typename: yup.string<'Author'>(),",
        'books: yup.array(BookSchema().nullable().defined()).nullable(),',
        'name: yup.string().nullable()',

        'export function BookSchema(): yup.ObjectSchema<Book> {',
        "__typename: yup.string<'Book'>(),",
        'author: AuthorSchema().nullable(),',
        'title: yup.string().nonNullable().defined()',

        'export function Book2Schema(): yup.ObjectSchema<Book2> {',
        "__typename: yup.string<'Book2'>(),",
        'author: AuthorSchema().nonNullable().defined(),',
        'title: yup.string().nullable()',
      ];
      for (const wantContain of wantContains) {
        expect(result.content).toContain(wantContain);
      }

      for (const wantNotContain of ['Query', 'Mutation', 'Subscription']) {
        expect(result.content).not.toContain(wantNotContain);
      }
    });

    it('generate both input & type if withObjectType all', async () => {
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
          withObjectType: 'all',
          scalarSchemas: {
            Date: 'yup.date()',
            Email: 'yup.string().email()',
          },
          scalars: {
            ID: {
              input: 'number',
              output: 'string',
            },
          },
        },
        {}
      );
      const wantContains = [
        // User Create Input
        'export function UserCreateInputSchema(): yup.ObjectSchema<UserCreateInput> {',
        'name: yup.string().nonNullable().defined(),',
        'date: yup.date().nonNullable().defined(),',
        'email: yup.string().email().nonNullable().defined()',
        // Username Update Input
        'export function UsernameUpdateInputSchema(): yup.ObjectSchema<UsernameUpdateInput> {',
        'updateInputId: yup.number().nonNullable().defined(),',
        'updateName: yup.string().nonNullable().defined()',
        // User
        'export function UserSchema(): yup.ObjectSchema<User> {',
        "__typename: yup.string<'User'>(),",
        'id: yup.string().nonNullable().defined(),',
        'name: yup.string().nullable(),',
        'age: yup.number().nullable(),',
        'isMember: yup.boolean().nullable(),',
        'email: yup.string().email().nullable(),',
        'createdAt: yup.date().nonNullable().defined()',
      ];
      for (const wantContain of wantContains) {
        expect(result.content).toContain(wantContain);
      }

      for (const wantContain of ['Query', 'Mutation', 'Subscription']) {
        expect(result.content).toContain(wantContain);
      }
    });

    it('generate both input & type if withObjectType no-reserved', async () => {
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
          withObjectType: 'no-reserved',
          scalarSchemas: {
            Date: 'yup.date()',
            Email: 'yup.string().email()',
          },
          scalars: {
            ID: {
              input: 'number',
              output: 'string',
            },
          },
        },
        {}
      );
      const wantContains = [
        // User Create Input
        'export function UserCreateInputSchema(): yup.ObjectSchema<UserCreateInput> {',
        'name: yup.string().nonNullable().defined(),',
        'date: yup.date().nonNullable().defined(),',
        'email: yup.string().email().nonNullable().defined()',
        // Username Update Input
        'export function UsernameUpdateInputSchema(): yup.ObjectSchema<UsernameUpdateInput> {',
        'updateInputId: yup.number().nonNullable().defined(),',
        'updateName: yup.string().nonNullable().defined()',
        // User
        'export function UserSchema(): yup.ObjectSchema<User> {',
        "__typename: yup.string<'User'>(),",
        'id: yup.string().nonNullable().defined(),',
        'name: yup.string().nullable(),',
        'age: yup.number().nullable(),',
        'isMember: yup.boolean().nullable(),',
        'email: yup.string().email().nullable(),',
        'createdAt: yup.date().nonNullable().defined()',
      ];
      for (const wantContain of wantContains) {
        expect(result.content).toContain(wantContain);
      }

      for (const wantNotContain of ['Query', 'Mutation', 'Subscription']) {
        expect(result.content).not.toContain(wantNotContain);
      }
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
          withObjectType: 'all',
        },
        {}
      );

      const wantContains = [
        // Shape Schema
        'export function ShapeSchema(): yup.ObjectSchema<Shape> {',
        'union<Shape>({',
        'Circle: CircleSchema(),',
        'Square: SquareSchema(),',
        '})',
        '}',
      ];
      for (const wantContain of wantContains) {
        expect(result.content).toContain(wantContain);
      }
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
          withObjectType: 'all',
        },
        {}
      );

      const wantContains = [
        'export function GeometrySchema(): yup.ObjectSchema<Geometry> {',
        'return yup.object({',
        "__typename: yup.string<'Geometry'>(),",
        'shape: ShapeSchema().nullable()',
        '})',
      ];
      for (const wantContain of wantContains) {
        expect(result.content).toContain(wantContain);
      }
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
          withObjectType: 'all',
        },
        {}
      );

      const wantContains = [
        // Shape Schema
        'export function ShapeSchema(): yup.ObjectSchema<Shape> {',
        'return union<Shape>({',
        'Circle: CircleSchema(),',
        '})',
        '}',
      ];
      for (const wantContain of wantContains) {
        expect(result.content).toContain(wantContain);
      }
    });

    // FIXME: TODO: broken
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
          withObjectType: 'all',
        },
        {}
      );

      const wantContains = [
        'export function AnyTypeSchema(): yup.ObjectSchema<AnyType> {',
        'union<AnyType>({',
        'PageType: PageTypeSchema,',
        'MethodType: MethodTypeSchema,',
        '})',
        '}',
      ];
      for (const wantContain of wantContains) {
        expect(result.content).toContain(wantContain);
      }
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
          withObjectType: 'all',
          validationSchemaExportType: 'const',
        },
        {}
      );

      const wantContains = [
        'export const GeometrySchema: yup.ObjectSchema<Geometry> = yup.object({',
        "__typename: yup.string<'Geometry'>(),",
        'shape: ShapeSchema.nullable()',
        '})',
      ];
      for (const wantContain of wantContains) {
        expect(result.content).toContain(wantContain);
      }
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
          withObjectType: 'all',
          scalars: {
            Text: 'string',
          },
        },
        {}
      );
      const wantContain = dedent`
      export function MyTypeFooArgsSchema(): yup.ObjectSchema<MyTypeFooArgs> {
        return yup.object({
          a: yup.string().nullable(),
          b: yup.number().nonNullable().defined(),
          c: yup.boolean().nullable(),
          d: yup.number().nonNullable().defined(),
          e: yup.string().nullable()
        }).strict()
      }`;
      expect(result.content).toContain(wantContain);
    });
  });

  it('properly generates custom directive values', async () => {
    const schema = buildSchema(/* GraphQL */ `
      input UserCreateInput {
        id: ID! @rules(apply: ["exists"])
        name: String! @rules(apply: ["startsWith:Sir", "required_without:nickname"])
        age: Int! @rules(apply: ["min:0", "max:100"])
        keyword: String! @rules(apply: ["regex:/^[a-zA-Z0-9]+$/"])
        nickname: String @rules(apply: ["max:10", "sometimes", "required_without:name"])
      }
      directive @rules(apply: [String!]!) on INPUT_FIELD_DEFINITION
    `);
    const result = await plugin(
      schema,
      [],
      {
        rules: {
          regex: 'matches',
        },
        ignoreRules: ['exists'],
        lazyRules: ['required_without'],
      },
      {}
    );
    const wantContains = [
      // User Create Input
      'export function UserCreateInputSchema(): yup.ObjectSchema<UserCreateInput> {',
      'name: yup.lazy(() => yup.string().startsWith("Sir").required_without("nickname").nonNullable().defined()),',
      'age: yup.number().min(0).max(100).nonNullable().defined()',
      'keyword: yup.string().matches(/^[a-zA-Z0-9]+$/).nonNullable().defined()',
      'nickname: yup.lazy(() => yup.string().sometimes(schema => schema.max(10).required_without("name")).nullable())',
    ];
    for (const wantContain of wantContains) {
      expect(result.content).toContain(wantContain);
    }
    const wantNotContains = ['id: yup.string().nonNullable().exists(),'];
    for (const wantNotContain of wantNotContains) {
      expect(result.content).not.toContain(wantNotContain);
    }
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
        validationSchemaExportType: 'const',
      },
      {}
    );
    expect(result.content).toContain('export const SaySchema: yup.ObjectSchema<Say> = yup.object({');
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
        withObjectType: 'all',
        scalarSchemas: {
          Date: 'yup.date()',
          Email: 'yup.string().email()',
        },
        validationSchemaExportType: 'const',
      },
      {}
    );
    const wantContains = [
      // User Create Input
      'export const UserCreateInputSchema: yup.ObjectSchema<UserCreateInput> = yup.object({',
      'name: yup.string().nonNullable().defined(),',
      'date: yup.date().nonNullable().defined(),',
      'email: yup.string().email().nonNullable().defined()',
      // User
      'export const UserSchema: yup.ObjectSchema<User> = yup.object({',
      "__typename: yup.string<'User'>(),",
      'id: yup.string().nonNullable().defined(),',
      'name: yup.string().nullable(),',
      'age: yup.number().nullable()',
      'email: yup.string().email().nullable()',
      'isMember: yup.boolean().nullable()',
      'createdAt: yup.date().nonNullable().defined()',
    ];
    for (const wantContain of wantContains) {
      expect(result.content).toContain(wantContain);
    }

    for (const wantContain of ['Query', 'Mutation', 'Subscription']) {
      expect(result.content).toContain(wantContain);
    }
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
        scalars: {
          ID: 'string',
        },
      },
      {}
    );
    const wantContain = dedent`
    export function QueryInputSchema(): yup.ObjectSchema<QueryInput> {
      return yup.object({
        _dummy: TestSchema.nullable()
      }).strict()
    }`;
    expect(result.content).toContain(wantContain);
  });
});
