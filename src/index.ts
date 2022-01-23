import { transformSchemaAST } from "@graphql-codegen/schema-ast";
import { YupSchemaVisitor } from "./yup/index";
import { ValidationSchemaPluginConfig } from "./config";
import {
  oldVisit,
  PluginFunction,
  Types,
} from "@graphql-codegen/plugin-helpers";
import { GraphQLSchema } from "graphql";

export const plugin: PluginFunction<
  ValidationSchemaPluginConfig,
  Types.ComplexPluginOutput
> = (
  schema: GraphQLSchema,
  _documents: Types.DocumentFile[],
  config: ValidationSchemaPluginConfig
): Types.ComplexPluginOutput => {
  const { schema: _schema, ast } = transformSchemaAST(schema, config);
  const { buildImports, ...visitor } = YupSchemaVisitor(_schema, config);

  const result = oldVisit(ast, {
    leave: visitor,
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const generated = result.definitions.filter((def) => typeof def === "string");

  return {
    prepend: buildImports(),
    content: "\n" + [...generated].join("\n"),
  };
};
