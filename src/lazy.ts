import type { TypeNode } from 'graphql';
import { isEnumType, isScalarType } from 'graphql';

import type { Visitor } from './visitor.js';
import { isNamedType } from './graphql.js';

/**
 * Wraps a schema expression in a library-specific lazy reference when the type
 * is a complex (non-scalar, non-enum) named type — avoiding issues with
 * mutually-recursive input types.
 *
 * Each validation library has its own lazy syntax (z.lazy, v.lazy, etc.), so
 * callers supply the wrapper function.
 *
 * @param lazyWrapper - e.g. `(s) => \`z.lazy(() => ${s})\``
 */
export function buildMaybeLazy(
  visitor: Visitor,
  type: TypeNode,
  schema: string,
  lazyWrapper: (schema: string) => string,
): string {
  if (!isNamedType(type))
    return schema;

  const schemaType = visitor.getType(type.name.value);
  const isComplexType = !isScalarType(schemaType) && !isEnumType(schemaType);
  return isComplexType ? lazyWrapper(schema) : schema;
}
