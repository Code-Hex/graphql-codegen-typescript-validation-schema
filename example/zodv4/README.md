# Tips for zod v4 schema

## Overview

The `zodv4` schema type is designed to work with Zod v4, which introduces significant changes to the type system and API. This implementation uses the updated type definitions and APIs that are compatible with Zod v4.

## Key Differences from Zod v3

### Type System Changes

Zod v4 introduces changes to the `ZodType` generic parameters:

```ts
// Zod v3
z.ZodType<Output, Def extends z.ZodTypeDef, Input = Output>

// Zod v4  
z.ZodType<Output = unknown, Input = unknown>
```

The `Properties` type definition has been updated accordingly:

```ts
// Updated for Zod v4
type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K]>;
}>;
```

### Enum Handling

Zod v4 changes how enums are handled:

```ts
// Zod v3
z.nativeEnum(ButtonComponentType)

// Zod v4
z.enum(ButtonComponentType)
```

## How to overwrite generated schema?

You can use zod [extend API](https://zod.dev/api#extend), same as with Zod v3:

```ts
const AttributeInputSchemaWithCUID = AttributeInputSchema().extend({
  key: z.string().cuid(),
});
```

## Apply input validator via ts decorator

Validate the input object via typescript decorators when implementing resolvers. The implementation is compatible with Zod v4's type system:

### Usage

```ts
class Mutation {
  @validateInput(SignupInputSchema)
  async signup(
    _root: Record<string, never>,
    { input: { email, password } }: MutationSignupArgs,
    context: Context
  ): Promise<SignupPayload> {
    // The input here is automatically valid to adhere to SignupInputSchema
  }
}
```

### Implementation:

```ts
type ZodResolver<T extends ZodType<any, any>> = ResolverFn<
  any,
  any,
  any,
  { input: TypeOf<T> }
>

/**
 * Method decorator that validates the argument of the target function against the given schema.
 * Updated for Zod v4 type system.
 *
 * @export
 * @template T The type of the zod schema.
 * @param {T} arg The zod schema used for the validation.
 * @return {MethodDecorator} A {@link MethodDecorator}.
 */
export function validateInput<T extends AnyZodObject>(
  arg: T | (() => T)
): MethodDecorator<ZodResolver<T>> {
  return function (_target, _propertyKey, descriptor) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const originalMethod = descriptor.value!
    // @ts-expect-error: should be fine
    descriptor.value = function (root, { input }, context, info) {
      const schema = typeof arg === 'function' ? arg() : arg
      const result = schema.safeParse(input)

      if (result.success) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return originalMethod.call(
          this,
          root,
          { input: result.data },
          context,
          info
        )
      } else {
        return { problems: result.error.issues }
      }
    }
    return descriptor
  }
}
```

## Migration from Zod v3

If you're migrating from Zod v3 to v4, consider the following:

### 1. Using Zod v4 with v3 compatibility layer

You can use the `zodImportPath` option to import from Zod v4's v3 compatibility layer:

```yml
generates:
  path/to/schemas.ts:
    plugins:
      - graphql-codegen-validation-schema
    config:
      schema: zod
      zodImportPath: zod/v3  # Use v3 compatibility layer
```

### 2. Using zodv4 schema type

Alternatively, use the `zodv4` schema type for full Zod v4 compatibility:

```yml
generates:
  path/to/schemas.ts:
    plugins:
      - graphql-codegen-validation-schema
    config:
      schema: zodv4  # Use zodv4 schema type
```

## Performance and Type Safety

Zod v4 provides improvements in:

1. **Stricter Type Checking**: Enhanced type safety with simplified generic parameters
2. **Better API Design**: More intuitive and consistent API
3. **Internal Optimizations**: Performance improvements in validation logic

These changes result in more reliable and maintainable validation code.
