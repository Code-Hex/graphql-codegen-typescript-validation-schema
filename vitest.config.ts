import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    singleThread: true,
    environment: 'node',
    reporters: ['default'],
    cache: { dir: 'node_modules/.vitest' }, // default
    include: ['tests/*.spec.ts'],
    exclude: ['node_modules', 'dist', 'example', '.idea', '.git', '.cache', '.github'],
    server: {
      deps: {
        fallbackCJS: true,
      },
    },
  },
});
