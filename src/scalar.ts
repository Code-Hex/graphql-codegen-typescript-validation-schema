import type { ValidationSchemaPluginConfig } from './config.js';
import type { Visitor } from './visitor.js';

/**
 * Builds a library-specific scalar schema expression.
 *
 * All five validation libraries follow the same pattern: check for a custom
 * `scalarSchemas` override, fall back to a built-in type map for the resolved
 * TypeScript type (string/number/boolean), then apply `defaultScalarTypeSchema`,
 * and finally warn and return the library fallback.
 *
 * The only per-library differences are the strings in `typeMap`, the `fallback`
 * value, and whether custom schemas need wrapping (yup appends `.defined()`).
 */
export function buildScalarSchema(
  config: ValidationSchemaPluginConfig,
  visitor: Visitor,
  scalarName: string,
  options: {
    typeMap: Record<'string' | 'number' | 'boolean', string>;
    fallback: string;
    wrapCustom?: (schema: string) => string;
  },
): string {
  if (config.scalarSchemas?.[scalarName]) {
    const custom = config.scalarSchemas[scalarName];
    return options.wrapCustom ? options.wrapCustom(custom) : custom;
  }

  const tsType = visitor.getScalarType(scalarName);
  if (tsType != null && tsType in options.typeMap)
    return options.typeMap[tsType as keyof typeof options.typeMap];

  if (config.defaultScalarTypeSchema)
    return config.defaultScalarTypeSchema;

  console.warn('unhandled scalar name:', scalarName);
  return options.fallback;
}
