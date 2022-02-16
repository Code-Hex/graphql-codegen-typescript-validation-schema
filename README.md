# graphql-codegen-typescript-validation-schema

[![Test](https://github.com/Code-Hex/graphql-codegen-typescript-validation-schema/actions/workflows/ci.yml/badge.svg)](https://github.com/Code-Hex/graphql-codegen-typescript-validation-schema/actions/workflows/ci.yml) [![npm version](https://badge.fury.io/js/graphql-codegen-typescript-validation-schema.svg)](https://badge.fury.io/js/graphql-codegen-typescript-validation-schema)

[GraphQL code generator](https://github.com/dotansimha/graphql-code-generator) plugin to generate form validation schema from your GraphQL schema.

- [x] support [yup](https://github.com/jquense/yup)
- [x] support [zod](https://github.com/colinhacks/zod)

## Quick Start

Start by installing this plugin and write simple plugin config;

```sh
$ npm i graphql-codegen-typescript-validation-schema
```

```yml
generates:
  path/to/graphql.ts:
    plugins:
      - typescript
      - typescript-validation-schema # specify to use this plugin
    config:
      # You can put the config for typescript plugin here
      # see: https://www.graphql-code-generator.com/plugins/typescript
      strictScalars: true
      # You can also write the config for this plugin together
      schema: yup # or zod
```

You can check [example directory](https://github.com/Code-Hex/graphql-codegen-typescript-validation-schema/tree/main/example) if you want to see more complex config example or how is generated some files.

...And I wrote some tips in there.

## Config API Reference

### `schema`

type: `ValidationSchema` default: `'yup'`

Specify generete validation schema you want.

You can specify `yup` or `zod`.

```yml
generates:
  path/to/graphql.ts:
    plugins:
      - typescript
      - typescript-validation-schema
    config:
      schema: yup
```

### `importFrom`

type: `string`

When provided, import types from the generated typescript types file path. if not given, omit import statement.

```yml
generates:
  path/to/graphql.ts:
    plugins:
      - typescript
  path/to/validation.ts:
    plugins:
      - typescript-validation-schema
    config:
      importFrom: ./graphql # path for generated ts code
```

Then the generator generates code with import statement like below.

```ts
import { GeneratedInput } from './graphql'

/* generates validation schema here */
```

### `enumsAsTypes`

type: `boolean` default: `false`

Generates enum as TypeScript `type` instead of `enum`.

### `notAllowEmptyString`

type: `boolean` default: `false`

Generates validation string schema as do not allow empty characters by default.

### `scalarSchemas`

type: `ScalarSchemas`

Extends or overrides validation schema for the built-in scalars and custom GraphQL scalars.

#### yup schema

```yml
config:
  schema: yup
  scalarSchemas:
    Date: yup.date()
    Email: yup.string().email()
```

#### zod schema

```yml
config:
  schema: zod
  scalarSchemas:
    Date: z.date()
    Email: z.string().email()
```

### `directives`

type: `DirectiveConfig`

Generates validation schema with more API based on directive schema. For example, yaml config and GraphQL schema is here.

```graphql
input ExampleInput {
  email: String! @required(msg: "Hello, World!") @constraint(minLength: 50, format: "email")
  message: String! @constraint(startsWith: "Hello")
}
```

#### yup schema

```yml
generates:
  path/to/graphql.ts:
    plugins:
      - typescript
      - typescript-validation-schema
    config:
      schema: yup
      directives:
        # Write directives like
        #
        # directive:
        #   arg1: schemaApi
        #   arg2: ["schemaApi2", "Hello $1"]
        #
        # See more examples in `./tests/directive.spec.ts`
        # https://github.com/Code-Hex/graphql-codegen-typescript-validation-schema/blob/main/tests/directive.spec.ts
        required:
          msg: required
        constraint:
          minLength: min
          # Replace $1 with specified `startsWith` argument value of the constraint directive
          startsWith: ["matches", "/^$1/"]
          format:
            email: email
```

Then generates yup validation schema like below.

```ts
export function ExampleInputSchema(): yup.SchemaOf<ExampleInput> {
  return yup.object({
    email: yup.string().defined().required("Hello, World!").min(50).email(),
    message: yup.string().defined().matches(/^Hello/)
  })
}
```

#### zod schema

```yml
generates:
  path/to/graphql.ts:
    plugins:
      - typescript
      - typescript-validation-schema
    config:
      schema: zod
      directives:
        # Write directives like
        #
        # directive:
        #   arg1: schemaApi
        #   arg2: ["schemaApi2", "Hello $1"]
        #
        # See more examples in `./tests/directive.spec.ts`
        # https://github.com/Code-Hex/graphql-codegen-typescript-validation-schema/blob/main/tests/directive.spec.ts
        constraint:
          minLength: min
          # Replace $1 with specified `startsWith` argument value of the constraint directive
          startsWith: ["regex", "/^$1/", "message"]
          format:
            email: email
```

Then generates zod validation schema like below.

```ts
export function ExampleInputSchema(): z.ZodSchema<ExampleInput> {
  return z.object({
    email: z.string().min(50).email(),
    message: z.string().regex(/^Hello/, "message")
  })
}
```
