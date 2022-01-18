import { TypeScriptPluginConfig } from '@graphql-codegen/typescript';

// THIS ARE TYPES IN THE CONTEXT OF THE FIELD
export const TYPE_LIST = "ListType";
export const TYPE_NONULL = "NonNullType";
export const TYPE_NAMED = "NamedType";

// THIS ARE TYPES OF FIELD VALUE
export const TYPE_INPUT = "Input";
export const TYPE_BOOLEAN = "Boolean";
export const TYPE_STRINGS = ["ID", "String"];
export const TYPE_NUMBERS = ["Int", "Float"];

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

