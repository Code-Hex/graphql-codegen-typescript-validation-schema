# Tips for yup schema

## How to overwrite generated schema?

You can use yup [shape API](https://github.com/jquense/yup#objectshapefields-object-nosortedges-arraystring-string-schema).

```ts
const AttributeInputSchemaWithUUID = AttributeInputSchema().shape({
  key: z.string().uuid(),
});
```