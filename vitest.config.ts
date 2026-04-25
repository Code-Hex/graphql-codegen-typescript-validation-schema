import { createRequire } from 'node:module';
import { defineConfig } from 'vitest/config';

const require = createRequire(import.meta.url);

export default defineConfig({
  resolve: {
    alias: {
      graphql: require.resolve('graphql/index.js'),
    },
  },
  test: {
    globals: true,
    environment: 'node',
    reporters: ['default'],
    include: ['tests/*.spec.ts'],
    exclude: ['node_modules', 'dist', 'example', '.idea', '.git', '.cache', '.github'],
    server: {
      deps: {
        external: ['graphql'],
        fallbackCJS: true,
      },
    },
  },
});
