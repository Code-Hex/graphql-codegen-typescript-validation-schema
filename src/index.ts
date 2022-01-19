import { ImportYup, YupGenerator } from "./yup/index";
import { ValidationSchema, ValidationSchemaPluginConfig } from "./types";
import { PluginFunction, Types } from "@graphql-codegen/plugin-helpers";
import { GraphQLSchema } from "graphql";
import { retrieveSchema } from "./graphql";

export const plugin: PluginFunction<ValidationSchemaPluginConfig> = async (
  schema: GraphQLSchema,
  _documents: Types.DocumentFile[],
  config: ValidationSchemaPluginConfig
): Promise<Types.PluginOutput> => {
  const { inputObjects, enums, scalars } = retrieveSchema(schema, config);

  const prepend = [importSchema(config.schema)];
  if (config.importFrom) {
    prepend.push(
      buildImportStatement(
        [
          // Should put on Scalar here?
          ...Object.values(enums).map((enumdef) => enumdef.name.value),
          ...inputObjects.map((inputObject) => inputObject.name.value),
        ],
        config.importFrom
      )
    );
  }
  return {
    prepend,
    content:
      "\n" +
      [new YupGenerator({ inputObjects, enums, scalars }).generate()].join(
        "\n"
      ),
  };
};

const buildImportStatement = (types: string[], importFrom: string): string =>
  `import { ${types.join(", ")} } from "${importFrom}";`;

const importSchema = (schema?: ValidationSchema): string => {
  if (schema === "yup") {
    return ImportYup();
  }
  // TODO(codehex): support zod
  return ImportYup();
};
