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
            a: ID!
            b: String!
            c: Boolean!
            d: Int!
            e: Float!
          }
        `,
        wantContains: [
          'export function PrimitiveInputSchema(): yup.ObjectSchema<PrimitiveInput>',
          'a: yup.string()',
          'b: yup.string()',
          'c: yup.boolean()',
          'd: yup.number()',
          'e: yup.number()',
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
            a: ID
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
          'a: yup.string().nullable().optional(),',
          'b: yup.string().nullable().optional(),',
          'c: yup.boolean().nullable().optional(),',
          'd: yup.number().nullable().optional(),',
          'e: yup.number().nullable().optional(),',
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
          'a: yup.array(yup.string().nullable()).nullable().optional(),',
          'b: yup.array(yup.string().defined().nonNullable()).nullable().optional(),',
          'c: yup.array(yup.string().defined().nonNullable()).defined(),',
          'd: yup.array(yup.array(yup.string().nullable()).nullable()).nullable().optional(),',
          'e: yup.array(yup.array(yup.string().nullable()).defined()).nullable().optional(),',
          'f: yup.array(yup.array(yup.string().nullable()).defined()).defined()',
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
            a: AInput!
          }
        `,
        wantContains: [
          'export function AInputSchema(): yup.ObjectSchema<AInput>',
          'b: yup.lazy(() => BInputSchema().defined().nonNullable())',
          'export function BInputSchema(): yup.ObjectSchema<BInput>',
          'c: CInputSchema().defined().nonNullable()',
          'export function CInputSchema(): yup.ObjectSchema<CInput>',
          'a: AInputSchema().defined().nonNullable()',
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
            child: NestedInput
            childrens: [NestedInput]
          }
        `,
        wantContains: [
          'export function NestedInputSchema(): yup.ObjectSchema<NestedInput>',
          'child: yup.lazy(() => NestedInputSchema()).optional(),',
          'childrens: yup.array(yup.lazy(() => NestedInputSchema())).nullable().optional()',
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
            pageType: PageType!
          }
        `,
        wantContains: [
          'export const PageTypeSchema = yup.string<PageType>().oneOf([PageType.Public, PageType.BasicAuth]);',
          'export function PageInputSchema(): yup.ObjectSchema<PageInput>',
          'pageType: PageTypeSchema.defined().nonNullable()',
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
          'method: HttpMethodSchema.nullable().optional(),',
          'url: yup.mixed().defined().nonNullable()',
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
        notAllowEmptyString: true,
        scalars: {
          ID: 'string',
        },
      },
      {}
    );
    const wantContains = [
      'export function PrimitiveInputSchema(): yup.ObjectSchema<PrimitiveInput>',
      'a: yup.string().defined().required(),',
      'b: yup.string().defined().required(),',
      'c: yup.boolean().defined().nonNullable(),',
      'd: yup.number().defined().nonNullable(),',
      'e: yup.number().defined().nonNullable()',
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
        notAllowEmptyString: true,
        scalars: {
          ID: 'string',
        },
      },
      {}
    );
    const wantContain = dedent`
    export function InputNestedSchema(): yup.ObjectSchema<InputNested> {
      return yup.object({
        field: yup.string().defined().required()
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
      'date: yup.date().defined().nonNullable(),',
      'email: yup.string().email().nullable().optional(),',
      'str: yup.string().defined().nonNullable()',
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
        "__typename: yup.string<'Author'>().optional(),",
        'books: yup.array(BookSchema().nullable()).nullable().optional(),',
        'name: yup.string().nullable().optional()',

        'export function BookSchema(): yup.ObjectSchema<Book> {',
        "__typename: yup.string<'Book'>().optional(),",
        'author: AuthorSchema().nullable().optional(),',
        'title: yup.string().defined().nonNullable()',

        'export function Book2Schema(): yup.ObjectSchema<Book2> {',
        "__typename: yup.string<'Book2'>().optional(),",
        'author: AuthorSchema().defined().nonNullable(),',
        'title: yup.string().nullable().optional()',
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
        'name: yup.string().defined().nonNullable(),',
        'date: yup.date().defined().nonNullable(),',
        'email: yup.string().email().defined().nonNullable()',
        // Username Update Input
        'export function UsernameUpdateInputSchema(): yup.ObjectSchema<UsernameUpdateInput> {',
        'updateInputId: yup.number().defined().nonNullable(),',
        'updateName: yup.string().defined().nonNullable()',
        // User
        'export function UserSchema(): yup.ObjectSchema<User> {',
        "__typename: yup.string<'User'>().optional(),",
        'id: yup.string().defined().nonNullable(),',
        'name: yup.string().nullable().optional(),',
        'age: yup.number().nullable().optional(),',
        'isMember: yup.boolean().nullable().optional(),',
        'email: yup.string().email().nullable().optional(),',
        'createdAt: yup.date().defined().nonNullable()',
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
        'name: yup.string().defined().nonNullable(),',
        'date: yup.date().defined().nonNullable(),',
        'email: yup.string().email().defined().nonNullable()',
        // Username Update Input
        'export function UsernameUpdateInputSchema(): yup.ObjectSchema<UsernameUpdateInput> {',
        'updateInputId: yup.number().defined().nonNullable(),',
        'updateName: yup.string().defined().nonNullable()',
        // User
        'export function UserSchema(): yup.ObjectSchema<User> {',
        "__typename: yup.string<'User'>().optional(),",
        'id: yup.string().defined().nonNullable(),',
        'name: yup.string().nullable().optional(),',
        'age: yup.number().nullable().optional(),',
        'isMember: yup.boolean().nullable().optional(),',
        'email: yup.string().email().nullable().optional(),',
        'createdAt: yup.date().defined().nonNullable()',
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
        'export function ShapeSchema(): yup.MixedSchema<Shape> {',
        'union<Shape>(CircleSchema(), SquareSchema())',
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
        "__typename: yup.string<'Geometry'>().optional(),",
        'shape: ShapeSchema().nullable().optional()',
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
        'export function ShapeSchema(): yup.MixedSchema<Shape> {',
        'return union<Shape>(CircleSchema())',
        '}',
      ];
      for (const wantContain of wantContains) {
        expect(result.content).toContain(wantContain);
      }
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
          withObjectType: 'all',
        },
        {}
      );

      const wantContains = [
        'export function AnyTypeSchema(): yup.MixedSchema<AnyType> {',
        'union<AnyType>(PageTypeSchema, MethodTypeSchema)',
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
        "__typename: yup.string<'Geometry'>().optional(),",
        'shape: ShapeSchema.nullable().optional()',
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
          withObjectType: true,
          scalars: {
            Text: 'string',
          },
        },
        {}
      );
      const wantContain = dedent`
      export function MyTypeFooArgsSchema(): yup.ObjectSchema<MyTypeFooArgs> {
        return yup.object({
          a: yup.string().nullable().optional(),
          b: yup.number().defined().nonNullable(),
          c: yup.boolean().nullable().optional(),
          d: yup.number().defined().nonNullable(),
          e: yup.string().nullable().optional()
        }).strict()
      }`;
      expect(result.content).toContain(wantContain);
    });
  });

  it('properly generates custom directive values', async () => {
    const schema = buildSchema(/* GraphQL */ `
      input UserCreateInput {
        id: ID! @rules(apply: ["exists"])
        name: String! @rules(apply: ["startsWith:Sir"])
        age: Int! @rules(apply: ["min:0", "max:100"])
        keyword: String! @rules(apply: ["regex:/^[a-zA-Z0-9]+$/"])
        nickname: String @rules(apply: ["max:10", "sometimes", "required"])
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
      },
      {}
    );
    const wantContains = [
      // User Create Input
      'export function UserCreateInputSchema(): yup.ObjectSchema<UserCreateInput> {',
      'name: yup.string().startsWith("Sir").defined().nonNullable(),',
      'age: yup.number().min(0).max(100).defined().nonNullable()',
      'keyword: yup.string().matches(/^[a-zA-Z0-9]+$/).defined().nonNullable()',
      'nickname: yup.string().sometimes("nickname", schema => schema.max(10).required()).nullable().optional()',
    ];
    for (const wantContain of wantContains) {
      expect(result.content).toContain(wantContain);
    }
    const wantNotContains = ['id: yup.string().defined().nonNullable().exists(),'];
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
      'name: yup.string().defined().nonNullable(),',
      'date: yup.date().defined().nonNullable(),',
      'email: yup.string().email().defined().nonNullable()',
      // User
      'export const UserSchema: yup.ObjectSchema<User> = yup.object({',
      "__typename: yup.string<'User'>().optional(),",
      'id: yup.string().defined().nonNullable(),',
      'name: yup.string().nullable().optional(),',
      'age: yup.number().nullable().optional(),',
      'email: yup.string().email().nullable().optional(),',
      'isMember: yup.boolean().nullable().optional(),',
      'createdAt: yup.date().defined().nonNullable()',
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
        _dummy: TestSchema.nullable().optional()
      }).strict()
    }`;
    expect(result.content).toContain(wantContain);
  });
});
