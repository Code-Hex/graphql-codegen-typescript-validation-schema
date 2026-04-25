import { buildSchema } from 'graphql';

import { plugin } from '../../src/index.js';
import type { ValidationSchemaPluginConfig } from '../../src/config.js';

export type { ValidationSchemaPluginConfig };

/**
 * Build a GraphQL schema from a SDL string and run the plugin with the given
 * config. Reduces the boilerplate of `buildSchema` + `plugin(schema, [], config, {})`
 * that appears identically in every spec file.
 */
export async function runPlugin(
  schemaStr: string,
  config: Partial<ValidationSchemaPluginConfig> = {},
) {
  const schema = buildSchema(schemaStr);
  return plugin(schema, [], config, {});
}
