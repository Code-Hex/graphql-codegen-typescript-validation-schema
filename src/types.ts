import { TypeScriptPluginConfig } from "@graphql-codegen/typescript";
import {
  EnumTypeDefinitionNode,
  InputObjectTypeDefinitionNode,
  ScalarTypeDefinitionNode,
} from "graphql";

export type ValidationSchema = "yup";

export interface ValidationSchemaPluginConfig extends TypeScriptPluginConfig {
  /**
   * @description specify generate schema.
   * @default yup
   *
   * @exampleMarkdown
   * ```yml
   * generates:
   *   path/to/file.ts:
   *     plugins:
   *       - typescript
   *       - graphql-codegen-validation-schema
   *     config:
   *       schema: yup
   * ```
   */
  schema?: ValidationSchema;
}

export interface Nodes {
  inputObjects: InputObjectTypeDefinitionNode[];
  enums: Record<string, EnumTypeDefinitionNode>;
  scalars: Record<string, ScalarTypeDefinitionNode>;
}
