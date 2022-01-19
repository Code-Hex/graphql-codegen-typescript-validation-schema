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

  return {
    prepend: [importSchema(config.schema)],
    content: [
      new YupGenerator({ inputObjects, enums, scalars }).generate(),
    ].join("\n"),
  };
};

const importSchema = (schema?: ValidationSchema): string => {
  if (schema === "yup") {
    return ImportYup();
  }
  // TODO(codehex): support zod
  return ImportYup();
};
