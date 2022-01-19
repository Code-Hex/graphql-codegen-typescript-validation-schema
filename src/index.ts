import { transformSchemaAST } from "@graphql-codegen/schema-ast";
import { YupSchemaVisitor } from "./yup/index";
import { ValidationSchemaPluginConfig } from "./types";
import { PluginFunction, Types } from "@graphql-codegen/plugin-helpers";
import { GraphQLSchema, visit } from "graphql";

export const plugin: PluginFunction<ValidationSchemaPluginConfig> = async (
  schema: GraphQLSchema,
  _documents: Types.DocumentFile[],
  config: ValidationSchemaPluginConfig
): Promise<Types.PluginOutput> => {
  const { schema: _schema, ast } = transformSchemaAST(schema, config);
  const { buildImports, ...visitor } = YupSchemaVisitor(_schema, config);

  const result = visit(ast, {
    leave: visitor,
  });

  // @ts-ignore
  const generated = result.definitions.filter((def) => typeof def === "string");

  return {
    prepend: buildImports(),
    content: "\n" + [...generated].join("\n"),
  };
};
