# Tips for zod schema

## How to overwrite generated schema?

You can use zod [extend API](https://github.com/colinhacks/zod#extend).

```ts
const AttributeInputSchemaWithCUID = AttributeInputSchema().extend({
  key: z.string().cuid(),
});
```