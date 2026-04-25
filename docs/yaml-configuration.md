# YAML configuration

YAML config is still supported by GraphQL Code Generator. This page keeps the old style examples in one place for projects that already use `codegen.yml`.

New docs in the README use [`codegen.ts`](https://the-guild.dev/graphql/codegen/docs/config-reference/codegen-config), because GraphQL Code Generator's current docs lead with TypeScript config and plugin-level config is easier to read there.

## Quick start

```sh
npm i graphql zod
npm i -D @graphql-codegen/cli @graphql-codegen/typescript graphql-codegen-typescript-validation-schema
```

The examples below use `zodv4` when they need a concrete validator. If your project uses another validator, install that package instead and change `schema` to `yup`, `zod`, `myzod`, or `valibot`.

```yml
schema: ./schema.graphql
generates:
  path/to/graphql.ts:
    plugins:
      - typescript
      - typescript-validation-schema
    config:
      strictScalars: true
      scalars:
        ID:
          input: string
          output: string
      schema: yup
```

The shorter scalar form also works if input and output are the same:

```yml
config:
  scalars:
    ID: string
```

## Plugin-level YAML config

YAML can also attach options directly to the plugin entry:

```yml
schema: ./schema.graphql
generates:
  path/to/graphql.ts:
    plugins:
      - typescript
      - typescript-validation-schema:
          schema: zodv4
          scalarSchemas:
            DateTime: z.string().datetime()
    config:
      scalars:
        ID:
          input: string
          output: string
        DateTime:
          input: string
          output: string
```

Use output-level `config` for options shared by `typescript` and this plugin. Use plugin-level config for validation-only options such as `schema`, `scalarSchemas`, and `directives`.

## Separate types and validation files

```yml
schema: ./schema.graphql
generates:
  path/to/graphql.ts:
    plugins:
      - typescript
    config:
      scalars:
        ID: string
  path/to/validation.ts:
    plugins:
      - typescript-validation-schema:
          schema: zodv4
          importFrom: ./graphql
          scalarSchemas:
            DateTime: z.string().datetime()
    config:
      scalars:
        ID: string
        DateTime: string
```

## Client preset

When using the `client` preset, keep validation generation as a separate output:

```sh
npm i -D @graphql-codegen/client-preset
```

```yml
schema: ./schema.graphql
documents:
  - src/**/*.{graphql,ts,tsx}
generates:
  src/gql/:
    preset: client
  src/validation.ts:
    plugins:
      - typescript-validation-schema:
          schema: zodv4
          importFrom: ./gql/graphql
          scalarSchemas:
            DateTime: z.string().datetime()
    config:
      scalars:
        ID: string
        DateTime: string
```

## Common options

### Select a validation library

```yml
config:
  schema: yup
```

Allowed values are `yup`, `zod`, `zodv4`, `myzod`, and `valibot`.

### Zod v3 compatibility import

```yml
generates:
  path/to/schemas.ts:
    plugins:
      - typescript-validation-schema:
          schema: zod
          zodImportPath: zod/v3
```

### Namespace type imports

```yml
generates:
  path/to/types.ts:
    plugins:
      - typescript
  path/to/schemas.ts:
    plugins:
      - typescript-validation-schema:
          schema: yup
          importFrom: ./path/to/types
          schemaNamespacedImportName: types
```

### Type-only imports

```yml
generates:
  path/to/types.ts:
    plugins:
      - typescript
  path/to/schemas.ts:
    plugins:
      - typescript-validation-schema:
          schema: zodv4
          importFrom: ./path/to/types
          useTypeImports: true
```

### Scalar schemas

```yml
config:
  schema: yup
  scalarSchemas:
    Date: yup.date()
    Email: yup.string().email()
```

```yml
config:
  schema: zodv4
  scalarSchemas:
    Date: z.date()
    Email: z.string().email()
```

```yml
config:
  schema: valibot
  scalarSchemas:
    Date: v.date()
    Email: v.pipe(v.string(), v.email())
```

### Default scalar schema

```yml
config:
  schema: zodv4
  defaultScalarTypeSchema: z.unknown()
```

### Object and operation schemas

```yml
config:
  schema: zodv4
  withObjectType: true
```

```yml
config:
  schema: zodv4
  withOperationType: true
```

```yml
config:
  schema: zodv4
  withObjectType: true
  maxDepth: 1
```

### Zod nullability

```yml
config:
  schema: zodv4
  zodOptionalType: nullable
```

`nullishBehavior` is accepted as an alias.

### Directives

```graphql
input ExampleInput {
  email: String! @required(msg: "Hello, World!") @constraint(minLength: 50, format: "email")
  message: String! @constraint(startsWith: "Hello")
}
```

```yml
generates:
  path/to/graphql.ts:
    plugins:
      - typescript
      - typescript-validation-schema
    config:
      schema: yup
      directives:
        required:
          msg: required
        constraint:
          minLength: min
          startsWith: [matches, /^$1/]
          format:
            email: email
```

```yml
generates:
  path/to/graphql.ts:
    plugins:
      - typescript
      - typescript-validation-schema
    config:
      schema: zodv4
      directives:
        constraint:
          minLength: min
          startsWith: [regex, /^$1/, message]
          format:
            email: email
```

For more directive examples, see [`tests/directive.spec.ts`](../tests/directive.spec.ts).
