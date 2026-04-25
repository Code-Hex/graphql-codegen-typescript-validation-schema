# graphql-codegen-typescript-validation-schema

[![Test](https://github.com/Code-Hex/graphql-codegen-typescript-validation-schema/actions/workflows/ci.yml/badge.svg)](https://github.com/Code-Hex/graphql-codegen-typescript-validation-schema/actions/workflows/ci.yml) [![npm version](https://badge.fury.io/js/graphql-codegen-typescript-validation-schema.svg)](https://badge.fury.io/js/graphql-codegen-typescript-validation-schema)

[GraphQL Code Generator](https://github.com/dotansimha/graphql-code-generator) plugin that generates validation schemas from your GraphQL schema.

- [x] [yup](https://github.com/jquense/yup)
- [x] [zod](https://github.com/colinhacks/zod)
- [x] [zod v4](https://github.com/colinhacks/zod) (`zodv4`)
- [x] [myzod](https://github.com/davidmdm/myzod)
- [x] [valibot](https://valibot.dev/)

## Quick start

GraphQL Code Generator's docs now lead with [`codegen.ts`](https://the-guild.dev/graphql/codegen/docs/config-reference/codegen-config). YAML still works, but new examples here use TypeScript config so plugin options can be typed and kept close to the plugin that consumes them.

```sh
npm i graphql zod
npm i -D @graphql-codegen/cli @graphql-codegen/typescript graphql-codegen-typescript-validation-schema
```

The example below uses `zodv4`. If you use another validator, install that package instead and change `schema` to `yup`, `zod`, `myzod`, or `valibot`. The generated schema code imports the matching library, so lying here will fail in the least interesting way.

```ts
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './schema.graphql',
  generates: {
    './src/graphql.ts': {
      plugins: [
        'typescript',
        {
          'typescript-validation-schema': {
            schema: 'zodv4',
            scalarSchemas: {
              DateTime: 'z.string().datetime()',
            },
          },
        },
      ],
      config: {
        strictScalars: true,
        scalars: {
          ID: {
            input: 'string',
            output: 'string',
          },
          DateTime: {
            input: 'string',
            output: 'string',
          },
        },
      },
    },
  },
};

export default config;
```

Run Codegen with:

```sh
npx graphql-codegen --config codegen.ts
```

The `scalars.ID` mapping is worth keeping even though it feels boring. It makes the generated TypeScript type for `ID` line up with the validation schema. See [#375](https://github.com/Code-Hex/graphql-codegen-typescript-validation-schema/pull/375) for the original footgun.

YAML configuration remains supported. Existing projects can keep it, and the old style examples live in [docs/yaml-configuration.md](./docs/yaml-configuration.md).

For larger examples, see the [example](https://github.com/Code-Hex/graphql-codegen-typescript-validation-schema/tree/main/example) directory. Each schema package has extra notes in its own example README.

## Where plugin config belongs

GraphQL Code Generator accepts config at the [root, output, and plugin level](https://the-guild.dev/graphql/codegen/docs/config-reference/config-field). For this plugin, put validation-specific options on the `typescript-validation-schema` plugin entry when possible:

```ts
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './schema.graphql',
  generates: {
    './src/validation.ts': {
      plugins: [
        {
          'typescript-validation-schema': {
            schema: 'zodv4',
            scalarSchemas: {
              DateTime: 'z.string().datetime()',
            },
          },
        },
      ],
      config: {
        scalars: {
          ID: {
            input: 'string',
            output: 'string',
          },
          DateTime: {
            input: 'string',
            output: 'string',
          },
        },
      },
    },
  },
};

export default config;
```

Shared options such as `scalars`, `strictScalars`, `typesPrefix`, or `enumsAsTypes` can still live at output level when they should apply to both `typescript` and this plugin.

## Client preset

For client apps, GraphQL Code Generator recommends the [`client` preset](https://the-guild.dev/graphql/codegen/plugins/presets/client-preset). Install the preset, then generate client artifacts and validation schemas as separate outputs:

```sh
npm i -D @graphql-codegen/client-preset
```

```ts
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './schema.graphql',
  documents: ['src/**/*.{graphql,ts,tsx}'],
  generates: {
    './src/gql/': {
      preset: 'client',
    },
    './src/validation.ts': {
      plugins: [
        {
          'typescript-validation-schema': {
            schema: 'zodv4',
            importFrom: './gql/graphql',
            scalarSchemas: {
              DateTime: 'z.string().datetime()',
            },
          },
        },
      ],
      config: {
        scalars: {
          ID: {
            input: 'string',
            output: 'string',
          },
          DateTime: {
            input: 'string',
            output: 'string',
          },
        },
      },
    },
  },
};

export default config;
```

This avoids relying on preset internals to pass a shared `config` object through to every plugin.

## Config API reference

All snippets below are values for the `typescript-validation-schema` plugin config object unless the example shows a full `CodegenConfig`.

### `schema`

type: `ValidationSchema` default: `'yup'`

Selects the validation library.

```ts
{
  schema: 'yup',
}
```

Supported values are `yup`, `zod`, `zodv4`, `myzod`, and `valibot`.

### `zodImportPath`

type: `string` default: `'zod'`

Sets a custom import path for Zod. This only applies when `schema` is `zod`.

```ts
{
  schema: 'zod',
  zodImportPath: 'zod/v3',
}
```

Use this if your project uses Zod v4 but wants this plugin's Zod v3-compatible output.

### `importFrom`

type: `string`

Imports GraphQL TypeScript types from another generated file. If you skip this option, the generator omits the type import.

```ts
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './schema.graphql',
  generates: {
    './src/graphql.ts': {
      plugins: ['typescript'],
    },
    './src/validation.ts': {
      plugins: [
        {
          'typescript-validation-schema': {
            schema: 'zodv4',
            importFrom: './graphql',
          },
        },
      ],
    },
  },
};

export default config;
```

Generated code imports from that file:

```ts
import { GeneratedInput } from './graphql'
```

### `schemaNamespacedImportName`

type: `string`

Uses a namespace import from `importFrom` instead of one named import per type.

```ts
{
  schema: 'yup',
  importFrom: './graphql',
  schemaNamespacedImportName: 'types',
}
```

Generated code:

```ts
import * as types from './graphql'
```

### `useTypeImports`

type: `boolean` default: `false`

Uses `import type {}` when importing generated TypeScript types. Use it with `importFrom`.

```ts
{
  schema: 'zodv4',
  importFrom: './graphql',
  useTypeImports: true,
}
```

### `typesPrefix`

type: `string` default: `''`

Prefixes imported generated type names.

```ts
{
  schema: 'zodv4',
  importFrom: './graphql',
  typesPrefix: 'I',
}
```

### `typesSuffix`

type: `string` default: `''`

Suffixes imported generated type names.

```ts
{
  schema: 'zodv4',
  importFrom: './graphql',
  typesSuffix: 'I',
}
```

### `enumsAsTypes`

type: `boolean` default: `false`

Generates enum validation schemas for TypeScript string union types instead of TypeScript `enum`.

```ts
{
  schema: 'zodv4',
  enumsAsTypes: true,
}
```

### `notAllowEmptyString`

type: `boolean` default: `false`

Disallows empty strings in generated string schemas.

```ts
{
  schema: 'yup',
  notAllowEmptyString: true,
}
```

### `scalarSchemas`

type: `ScalarSchemas`

Overrides validation schemas for built-in scalars and custom GraphQL scalars.

```ts
{
  schema: 'yup',
  scalarSchemas: {
    Date: 'yup.date()',
    Email: 'yup.string().email()',
  },
}
```

```ts
{
  schema: 'zodv4',
  scalarSchemas: {
    Date: 'z.date()',
    Email: 'z.string().email()',
  },
}
```

```ts
{
  schema: 'valibot',
  scalarSchemas: {
    Date: 'v.date()',
    Email: 'v.pipe(v.string(), v.email())',
  },
}
```

### `defaultScalarTypeSchema`

type: `string`

Fallback validation schema for scalar types not listed in `scalarSchemas`.

```ts
{
  schema: 'zodv4',
  defaultScalarTypeSchema: 'z.unknown()',
}
```

### `withObjectType`

type: `boolean` default: `false`

Generates validation schemas for GraphQL object types. `Query`, `Mutation`, and `Subscription` are excluded.

```ts
{
  schema: 'zodv4',
  withObjectType: true,
}
```

This option was added for projects that need simple object schemas. See [#20](https://github.com/Code-Hex/graphql-codegen-typescript-validation-schema/issues/20#issuecomment-1058969191) and [#107](https://github.com/Code-Hex/graphql-codegen-typescript-validation-schema/issues/107).

`withObjectType` does not support fragment generation.

### `withOperationType`

type: `boolean` default: `false`

Generates Zod schemas for GraphQL operation result selection sets. Use this when `withObjectType` is too broad because your query selects only part of an object.

```ts
{
  schema: 'zodv4',
  withOperationType: true,
}
```

Currently supported for `schema: 'zod'` and `schema: 'zodv4'`.

### `maxDepth`

type: `number`

Limits nested object validation depth for `withObjectType` schemas generated by `schema: 'zod'` and `schema: 'zodv4'`.

```ts
{
  schema: 'zodv4',
  withObjectType: true,
  maxDepth: 1,
}
```

Use this for cyclic output graphs where validating the whole object graph would recurse forever.

### `validationSchemaExportType`

type: `ValidationSchemaExportType` default: `'function'`

Controls whether schemas are exported as functions or constants.

```ts
{
  schema: 'zodv4',
  validationSchemaExportType: 'const',
}
```

### `zodOptionalType`

type: `'nullish' | 'nullable' | 'optional'` default: `'nullish'`

Controls how nullable GraphQL fields are generated for `schema: 'zod'` and `schema: 'zodv4'`.

```ts
{
  schema: 'zodv4',
  zodOptionalType: 'nullable',
}
```

The default `nullish` mode matches GraphQL input coercion, where a nullable input field may be omitted or passed as `null`. Use `nullable` or `optional` only when your generated TypeScript `Maybe` or `InputMaybe` contract differs from GraphQL's default behavior.

`nullishBehavior` is accepted as an alias.

### `strictObjectSchemas`

type: `boolean` default: `false`

Appends `.strict()` to generated Zod object schemas.

```ts
{
  schema: 'zodv4',
  strictObjectSchemas: true,
}
```

### `withDescriptions`

type: `boolean` default: `false`

Appends `.describe()` to generated Zod fields and object schemas from GraphQL descriptions.

```ts
{
  schema: 'zodv4',
  withDescriptions: true,
}
```

### `onlyEnums`

type: `boolean` default: `false`

Generates only enum validation schemas.

```ts
{
  schema: 'zodv4',
  onlyEnums: true,
}
```

### `useEnumTypeAsDefaultValue`

type: `boolean` default: `false`

Uses the enum type path as the default value instead of the stringified enum value.

```ts
{
  schema: 'zodv4',
  useEnumTypeAsDefaultValue: true,
}
```

### `namingConvention`

type: `NamingConventionMap` default: `{ enumValues: 'change-case-all#pascalCase' }`

Controls generated names. This follows GraphQL Code Generator's [`namingConvention`](https://the-guild.dev/graphql/codegen/docs/config-reference/naming-convention#namingconvention) option.

```ts
{
  schema: 'zodv4',
  namingConvention: {
    enumValues: 'change-case-all#upperCase',
  },
}
```

### `directives`

type: `DirectiveConfig`

Maps GraphQL directives to validation library APIs.

Given this schema:

```graphql
input ExampleInput {
  email: String! @required(msg: "Hello, World!") @constraint(minLength: 50, format: "email")
  message: String! @constraint(startsWith: "Hello")
}
```

Yup config:

```ts
{
  schema: 'yup',
  directives: {
    required: {
      msg: 'required',
    },
    constraint: {
      minLength: 'min',
      startsWith: ['matches', /^$1/],
      format: {
        email: 'email',
      },
    },
  },
}
```

Generated Yup schema:

```ts
export function ExampleInputSchema(): yup.ObjectSchema<ExampleInput> {
  return yup.object({
    email: yup.string().defined().required('Hello, World!').min(50).email(),
    message: yup.string().defined().matches(/^Hello/)
  })
}
```

Zod config:

```ts
{
  schema: 'zodv4',
  directives: {
    constraint: {
      minLength: 'min',
      startsWith: ['regex', /^$1/, 'message'],
      format: {
        email: 'email',
      },
    },
  },
}
```

Generated Zod schema:

```ts
export function ExampleInputSchema(): z.ZodObject<Properties<ExampleInput>> {
  return z.object({
    email: z.string().min(50).email(),
    message: z.string().regex(/^Hello/, 'message')
  })
}
```

Other validation libraries use the same directive shape, but the API names differ. The generated examples in `example/` and `tests/directive.spec.ts` are the best source when wiring a new directive. Annoying, but honest.
