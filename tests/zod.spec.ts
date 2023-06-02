import { buildSchema } from 'graphql';
import { plugin } from '../src/index';

describe('zod', () => {
  test.each([
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
          'export function PrimitiveInputSchema(): z.ZodObject<Properties<PrimitiveInput>>',
          'a: z.string()',
          'b: z.string()',
          'c: z.boolean()',
          'd: z.number()',
          'e: z.number()',
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
          'export function PrimitiveInputSchema(): z.ZodObject<Properties<PrimitiveInput>>',
          // alphabet order
          'a: z.string().nullish(),',
          'b: z.string().nullish(),',
          'c: z.boolean().nullish(),',
          'd: z.number().nullish(),',
          'e: z.number().nullish(),',
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
          'export function ArrayInputSchema(): z.ZodObject<Properties<ArrayInput>>',
          'a: z.array(z.string().nullable()).nullish(),',
          'b: z.array(z.string()).nullish(),',
          'c: z.array(z.string()),',
          'd: z.array(z.array(z.string().nullable()).nullish()).nullish(),',
          'e: z.array(z.array(z.string().nullable())).nullish(),',
          'f: z.array(z.array(z.string().nullable()))',
        ],
        scalars: undefined,
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
          'export function AInputSchema(): z.ZodObject<Properties<AInput>>',
          'b: z.lazy(() => BInputSchema())',
          'export function BInputSchema(): z.ZodObject<Properties<BInput>>',
          'c: z.lazy(() => CInputSchema())',
          'export function CInputSchema(): z.ZodObject<Properties<CInput>>',
          'a: z.lazy(() => AInputSchema())',
        ],
        scalars: undefined,
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
          'export function NestedInputSchema(): z.ZodObject<Properties<NestedInput>>',
          'child: z.lazy(() => NestedInputSchema().nullish()),',
          'childrens: z.array(z.lazy(() => NestedInputSchema().nullable())).nullish()',
        ],
        scalars: undefined,
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
          'export const PageTypeSchema = z.nativeEnum(PageType)',
          'export function PageInputSchema(): z.ZodObject<Properties<PageInput>>',
          'pageType: PageTypeSchema',
        ],
        scalars: undefined,
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

          scalar URL # unknown scalar, should be any (definedNonNullAnySchema)
        `,
        wantContains: [
          'export function HttpInputSchema(): z.ZodObject<Properties<HttpInput>>',
          'export const HttpMethodSchema = z.nativeEnum(HttpMethod)',
          'method: HttpMethodSchema',
          'url: definedNonNullAnySchema',
        ],
        scalars: undefined,
      },
    ],
  ])('%s', async (_, { textSchema, wantContains, scalars }) => {
    const schema = buildSchema(textSchema);
    const result = await plugin(schema, [], { schema: 'zod', scalars }, {});
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
        schema: 'zod',
        importFrom: './types',
        useTypeImports: true,
      },
      {}
    );
    expect(result.prepend).toContain("import type { Say } from './types'");
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
        scalars: {
          ID: 'string',
        },
      },
      {}
    );
    const wantContains = [
      'export function PrimitiveInputSchema(): z.ZodObject<Properties<PrimitiveInput>>',
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
      'export function ScalarsInputSchema(): z.ZodObject<Properties<ScalarsInput>>',
      'date: z.date(),',
      'email: z.string().email().nullish(),',
      'str: z.string()',
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
        schema: 'zod',
        typesPrefix: 'I',
        importFrom: './types',
      },
      {}
    );
    expect(result.prepend).toContain("import { ISay } from './types'");
    expect(result.content).toContain('export function ISaySchema(): z.ZodObject<Properties<ISay>> {');
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
        schema: 'zod',
        typesSuffix: 'I',
        importFrom: './types',
      },
      {}
    );
    expect(result.prepend).toContain("import { SayI } from './types'");
    expect(result.content).toContain('export function SayISchema(): z.ZodObject<Properties<SayI>> {');
  });

  describe('issues #19', () => {
    it('string field', async () => {
      const schema = buildSchema(/* GraphQL */ `
        input UserCreateInput {
          profile: String @constraint(minLength: 1, maxLength: 5000)
        }

        directive @constraint(minLength: Int!, maxLength: Int!) on INPUT_FIELD_DEFINITION
      `);
      const result = await plugin(
        schema,
        [],
        {
          schema: 'zod',
          directives: {
            constraint: {
              minLength: ['min', '$1', 'Please input more than $1'],
              maxLength: ['max', '$1', 'Please input less than $1'],
            },
          },
        },
        {}
      );
      const wantContains = [
        'export function UserCreateInputSchema(): z.ZodObject<Properties<UserCreateInput>>',
        'profile: z.string().min(1, "Please input more than 1").max(5000, "Please input less than 5000").nullish()',
      ];
      for (const wantContain of wantContains) {
        expect(result.content).toContain(wantContain);
      }
    });

    it('not null field', async () => {
      const schema = buildSchema(/* GraphQL */ `
        input UserCreateInput {
          profile: String! @constraint(minLength: 1, maxLength: 5000)
        }

        directive @constraint(minLength: Int!, maxLength: Int!) on INPUT_FIELD_DEFINITION
      `);
      const result = await plugin(
        schema,
        [],
        {
          schema: 'zod',
          directives: {
            constraint: {
              minLength: ['min', '$1', 'Please input more than $1'],
              maxLength: ['max', '$1', 'Please input less than $1'],
            },
          },
        },
        {}
      );
      const wantContains = [
        'export function UserCreateInputSchema(): z.ZodObject<Properties<UserCreateInput>>',
        'profile: z.string().min(1, "Please input more than 1").max(5000, "Please input less than 5000")',
      ];
      for (const wantContain of wantContains) {
        expect(result.content).toContain(wantContain);
      }
    });

    it('list field', async () => {
      const schema = buildSchema(/* GraphQL */ `
        input UserCreateInput {
          profile: [String] @constraint(minLength: 1, maxLength: 5000)
        }

        directive @constraint(minLength: Int!, maxLength: Int!) on INPUT_FIELD_DEFINITION
      `);
      const result = await plugin(
        schema,
        [],
        {
          schema: 'zod',
          directives: {
            constraint: {
              minLength: ['min', '$1', 'Please input more than $1'],
              maxLength: ['max', '$1', 'Please input less than $1'],
            },
          },
        },
        {}
      );
      const wantContains = [
        'export function UserCreateInputSchema(): z.ZodObject<Properties<UserCreateInput>>',
        'profile: z.array(z.string().nullable()).min(1, "Please input more than 1").max(5000, "Please input less than 5000").nullish()',
      ];
      for (const wantContain of wantContains) {
        expect(result.content).toContain(wantContain);
      }
    });
  });

  describe('PR #112', () => {
    it('with notAllowEmptyString', async () => {
      const schema = buildSchema(/* GraphQL */ `
        input UserCreateInput {
          profile: String! @constraint(maxLength: 5000)
          age: Int!
        }

        directive @constraint(maxLength: Int!) on INPUT_FIELD_DEFINITION
      `);
      const result = await plugin(
        schema,
        [],
        {
          schema: 'zod',
          notAllowEmptyString: true,
          directives: {
            constraint: {
              maxLength: ['max', '$1', 'Please input less than $1'],
            },
          },
        },
        {}
      );
      const wantContains = [
        'export function UserCreateInputSchema(): z.ZodObject<Properties<UserCreateInput>>',
        'profile: z.string().max(5000, "Please input less than 5000").min(1),',
      ];
      for (const wantContain of wantContains) {
        expect(result.content).toContain(wantContain);
      }
    });

    it('without notAllowEmptyString', async () => {
      const schema = buildSchema(/* GraphQL */ `
        input UserCreateInput {
          profile: String! @constraint(maxLength: 5000)
          age: Int!
        }

        directive @constraint(maxLength: Int!) on INPUT_FIELD_DEFINITION
      `);
      const result = await plugin(
        schema,
        [],
        {
          schema: 'zod',
          directives: {
            constraint: {
              maxLength: ['max', '$1', 'Please input less than $1'],
            },
          },
        },
        {}
      );
      const wantContains = [
        'export function UserCreateInputSchema(): z.ZodObject<Properties<UserCreateInput>>',
        'profile: z.string().max(5000, "Please input less than 5000"),',
      ];
      for (const wantContain of wantContains) {
        expect(result.content).toContain(wantContain);
      }
    });
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
          schema: 'zod',
        },
        {}
      );
      expect(result.content).not.toContain('export function UserSchema(): z.ZodObject<Properties<User>>');
    });

    it('generate object type contains object type', async () => {
      const schema = buildSchema(/* GraphQL */ `
        type Book {
          author: Author
          title: String
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
          schema: 'zod',
          withObjectType: true,
        },
        {}
      );
      const wantContains = [
        'export function AuthorSchema(): z.ZodObject<Properties<Author>> {',
        "__typename: z.literal('Author').optional(),",
        'books: z.array(BookSchema().nullable()).nullish(),',
        'name: z.string().nullish()',

        'export function BookSchema(): z.ZodObject<Properties<Book>> {',
        "__typename: z.literal('Book').optional(),",
        'author: AuthorSchema().nullish(),',
        'title: z.string().nullish()',
      ];
      for (const wantContain of wantContains) {
        expect(result.content).toContain(wantContain);
      }

      for (const wantNotContain of ['Query', 'Mutation', 'Subscription']) {
        expect(result.content).not.toContain(wantNotContain);
      }
    });

    it('generate both input & type', async () => {
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
          schema: 'zod',
          withObjectType: true,
          scalarSchemas: {
            Date: 'z.date()',
            Email: 'z.string().email()',
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
        'export function UserCreateInputSchema(): z.ZodObject<Properties<UserCreateInput>> {',
        'name: z.string(),',
        'date: z.date(),',
        'email: z.string().email()',
        // Username Update Input
        'export function UsernameUpdateInputSchema(): z.ZodObject<Properties<UsernameUpdateInput>> {',
        'updateInputId: z.number(),',
        'updateName: z.string()',
        // User
        'export function UserSchema(): z.ZodObject<Properties<User>> {',
        "__typename: z.literal('User').optional()",
        'id: z.string(),',
        'name: z.string().nullish(),',
        'age: z.number().nullish(),',
        'isMember: z.boolean().nullish(),',
        'email: z.string().email().nullish(),',
        'createdAt: z.date()',
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
          schema: 'zod',
          withObjectType: true,
        },
        {}
      );

      const wantContains = [
        // Shape Schema
        'export function ShapeSchema() {',
        'return z.union([CircleSchema(), SquareSchema()])',
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
          schema: 'zod',
          withObjectType: true,
        },
        {}
      );

      const wantContains = [
        'export function GeometrySchema(): z.ZodObject<Properties<Geometry>> {',
        "__typename: z.literal('Geometry').optional(),",
        'shape: ShapeSchema().nullish()',
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
          schema: 'zod',
          withObjectType: true,
        },
        {}
      );

      const wantContains = [
        // Shape Schema
        'export function ShapeSchema() {',
        'return CircleSchema()',
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
          schema: 'zod',
          withObjectType: true,
        },
        {}
      );

      const wantContains = [
        'export function AnyTypeSchema() {',
        'return z.union([PageTypeSchema, MethodTypeSchema])',
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
          schema: 'zod',
          withObjectType: true,
          validationSchemaExportType: 'const',
        },
        {}
      );

      const wantContains = [
        'export const GeometrySchema: z.ZodObject<Properties<Geometry>> = z.object({',
        "__typename: z.literal('Geometry').optional(),",
        'shape: ShapeSchema.nullish()',
      ];
      for (const wantContain of wantContains) {
        expect(result.content).toContain(wantContain);
      }
    });
  });

  it('properly generates custom directive values', async () => {
    const schema = buildSchema(/* GraphQL */ `
      input UserCreateInput {
        name: String! @constraint(startsWith: "Sir")
        age: Int! @constraint(min: 0, max: 100)
      }
      directive @constraint(startsWith: String, min: Int, max: Int) on INPUT_FIELD_DEFINITION
    `);
    const result = await plugin(
      schema,
      [],
      {
        schema: 'zod',
        directives: {
          constraint: {
            min: 'min',
            max: 'max',
            startsWith: ['regex', '/^$1/'],
          },
        },
      },
      {}
    );
    const wantContains = [
      // User Create Input
      'export function UserCreateInputSchema(): z.ZodObject<Properties<UserCreateInput>> {',
      'name: z.string().regex(/^Sir/),',
      'age: z.number().min(0).max(100)',
    ];
    for (const wantContain of wantContains) {
      expect(result.content).toContain(wantContain);
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
        schema: 'zod',
        validationSchemaExportType: 'const',
      },
      {}
    );
    expect(result.content).toContain('export const SaySchema: z.ZodObject<Properties<Say>> = z.object({');
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
        schema: 'zod',
        withObjectType: true,
        scalarSchemas: {
          Date: 'z.date()',
          Email: 'z.string().email()',
        },
        validationSchemaExportType: 'const',
      },
      {}
    );
    const wantContains = [
      // User Create Input
      'export const UserCreateInputSchema: z.ZodObject<Properties<UserCreateInput>> = z.object({',
      'name: z.string(),',
      'date: z.date(),',
      'email: z.string().email()',
      // User
      'export const UserSchema: z.ZodObject<Properties<User>> = z.object({',
      "__typename: z.literal('User').optional()",
      'id: z.string(),',
      'name: z.string().nullish(),',
      'age: z.number().nullish(),',
      'isMember: z.boolean().nullish(),',
      'email: z.string().email().nullish(),',
      'createdAt: z.date()',
    ];
    for (const wantContain of wantContains) {
      expect(result.content).toContain(wantContain);
    }

    for (const wantNotContain of ['Query', 'Mutation', 'Subscription']) {
      expect(result.content).not.toContain(wantNotContain);
    }
  });
});
