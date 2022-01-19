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

  /**
   * @description import types from generated typescript type path
   * if not given, omit import statement.
   *
   * @exampeMarkdown
   * ```yml
   * generates:
   *   path/to/types.ts:
   *     plugins:
   *       - typescript
   *   path/to/schemas.ts:
   *     plugins:
   *       - graphql-codegen-validation-schema
   *     config:
   *       schema: yup
   *       importFrom: ./path/to/types
   * ```
   */
  importFrom?: string;
}

export interface Nodes {
  inputObjects: InputObjectTypeDefinitionNode[];
  enums: Record<string, EnumTypeDefinitionNode>;
  scalars: Record<string, ScalarTypeDefinitionNode>;
}
