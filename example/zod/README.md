# Tips for zod schema

## How to overwrite generated schema?

You can use zod [extend API](https://github.com/colinhacks/zod#extend).

```ts
const AttributeInputSchemaWithCUID = AttributeInputSchema().extend({
  key: z.string().cuid(),
});
```

## Apply input validator via ts decorator

Validate the input object via typescript decorators when implementing resolvers. See: #190

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
type ZodResolver<T extends ZodType<any, any, any>> = ResolverFn<
  any,
  any,
  any,
  { input: TypeOf<T> }
>

/**
 * Method decorator that validates the argument of the target function against the given schema.
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