import { TypeScriptPluginConfig } from "@graphql-codegen/typescript";

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
  /**
   * @description Generates validation schema for enum as TypeScript `type`
   * @default false
   *
   * @exampleMarkdown
   * ```yml
   * generates:
   *   path/to/file.ts:
   *     plugins:
   *       - graphql-codegen-validation-schema
   *     config:
   *       enumsAsTypes: true
   * ```
   *
   * ```yml
   * generates:
   *   path/to/file.ts:
   *     plugins:
   *       - typescript
   *       - graphql-codegen-validation-schema
   *     config:
   *       enumsAsTypes: true
   * ```
   */
  enumsAsTypes?: boolean;
}
