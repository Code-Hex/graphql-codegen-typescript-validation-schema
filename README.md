# graphql-codegen-typescript-validation-schema

[![Test](https://github.com/Code-Hex/graphql-codegen-typescript-validation-schema/actions/workflows/ci.yml/badge.svg)](https://github.com/Code-Hex/graphql-codegen-typescript-validation-schema/actions/workflows/ci.yml) [![npm version](https://badge.fury.io/js/graphql-codegen-typescript-validation-schema.svg)](https://badge.fury.io/js/graphql-codegen-typescript-validation-schema)

[GraphQL code generator](https://github.com/dotansimha/graphql-code-generator) plugin to generate form validation schema from your GraphQL schema.

- [x] support [yup](https://github.com/jquense/yup)
- [ ] support [zod](https://github.com/colinhacks/zod)

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
      schema: yup
```

## Config API Reference

### `schema`

type: `ValidationSchema` default: `'yup'`

Specify generete validation schema you want.

```yml
generates:
  path/to/graphql.ts:
    plugins:
      - typescript
      - graphql-codegen-validation-schema
    config:
      schema: yup
```

### `importFrom`

type: `string`

import types from generated typescript type path. if not given, omit import statement.

```yml
generates:
  path/to/graphql.ts:
    plugins:
      - typescript
  path/to/validation.ts:
    plugins:
      - graphql-codegen-validation-schema
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

### `directives`

type: `DirectiveConfig`

Generates validation schema with more API based on directive schema. For example, yaml config and GraphQL schema is here.

```yml
generates:
  path/to/graphql.ts:
    plugins:
      - typescript
      - graphql-codegen-validation-schema
    config:
      schema: yup
      directives:
        required:
          msg: required
        constraint:
          minLength: min
          # Replace $1 with specified `startsWith` argument value of the constraint directive
          startsWith: ["matches", "/^$1/"]
          format:
            email: email
```

```graphql
input ExampleInput {
  email: String! @required(msg: "Hello, World!") @constraint(minLength: 50)
  message: String! @constraint(startsWith: "Hello")
}
```

Then generates yup validation schema like below.

```ts
export function ExampleInputSchema(): yup.SchemaOf<ExampleInput> {
  return yup.object({
    email: yup.string().defined().required("Hello, World!").min(50),
    message: yup.string().defined().matches(/^Hello/)
  })
}
```