import { TypeScriptPluginConfig } from '@graphql-codegen/typescript';

export type ValidationSchemaExportType = 'function' | 'const';

/**
 * directive example:
 *
 * email: Email! @rules(apply: ["email:rfc", "minLength:100"])
 *
 * {
 *   email: "email",
 *   minLength: ["min", "$1"],
 * }
 */
export type Rule =
  | string // "integer"
  | string[]; // ["size", "255"]
export type Rules = {
  [ruleName: string]: Rule;
};

interface ScalarSchemas {
  [name: string]: string;
}

export interface ValidationSchemaPluginConfig extends TypeScriptPluginConfig {
  /**
   * @description import types from generated typescript type path
   * if not given, omit import statement.
   *
   * @exampleMarkdown
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
   * @description Will use `import type {}` rather than `import {}` when importing generated typescript types.
   * This gives compatibility with TypeScript's "importsNotUsedAsValues": "error" option
   * Should used in conjunction with `importFrom` option.
   * @default false
   *
   * @exampleMarkdown
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
   *       useTypeImports: true
   * ```
   */
  useTypeImports?: boolean;
  /**
   * @description Prefixes all import types from generated typescript type.
   * @default ""
   *
   * @exampleMarkdown
   * ```yml
   * generates:
   *   path/to/types.ts:
   *     plugins:
   *       - typescript
   *   path/to/schemas.ts:
   *     plugins:
   *       - graphql-codegen-validation-schema
   *     config:
   *       typesPrefix: I
   *       importFrom: ./path/to/types
   * ```
   */
  typesPrefix?: string;
  /**
   * @description Suffixes all import types from generated typescript type.
   * @default ""
   *
   * @exampleMarkdown
   * ```yml
   * generates:
   *   path/to/types.ts:
   *     plugins:
   *       - typescript
   *   path/to/schemas.ts:
   *     plugins:
   *       - graphql-codegen-validation-schema
   *     config:
   *       typesSuffix: I
   *       importFrom: ./path/to/types
   * ```
   */
  typesSuffix?: string;
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
  /**
   * @description Generates validation string schema as do not allow empty characters by default.
   * @default false
   *
   * @exampleMarkdown
   * ```yml
   * generates:
   *   path/to/file.ts:
   *     plugins:
   *       - graphql-codegen-validation-schema
   *     config:
   *       notAllowEmptyString: true
   * ```
   */
  notAllowEmptyString?: boolean;
  /**
   * @description Extends or overrides validation schema for the built-in scalars and custom GraphQL scalars.
   *
   * @exampleMarkdown
   * ```yml
   * config:
   *   schema: yup
   *   scalarSchemas:
   *     Date: yup.date()
   *     Email: yup.string().email()
   * ```
   *
   */
  scalarSchemas?: ScalarSchemas;
  /**
   * @description Generates validation schema with GraphQL type objects.
   * but excludes "Query", "Mutation", "Subscription" objects.
   *
   * @exampleMarkdown
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
   *       withObjectType: true
   * ```
   */
  withObjectType?: boolean;
  /**
   * @description Specify validation schema export type.
   * @default function
   *
   * @exampleMarkdown
   * ```yml
   * generates:
   *   path/to/file.ts:
   *     plugins:
   *       - typescript
   *       - graphql-codegen-validation-schema
   *     config:
   *       validationSchemaExportType: const
   * ```
   */
  validationSchemaExportType?: ValidationSchemaExportType;
  /**
   * @description Generates validation schema with more API based on directive schema.
   * @exampleMarkdown
   * ```yml
   * generates:
   *   path/to/file.ts:
   *     plugins:
   *       - graphql-codegen-validation-schema
   *     config:
   *       schema: yup
   *       rules:
   *         minLength: min # same as ['min', '$1']
   *         maxLength: max
   * ```
   */
  rules?: Rules;
}
