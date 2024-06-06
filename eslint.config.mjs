import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
  ignores: [
    'dist/**',
    'node_modules/**',
    'example/**',
    'vitest.config.ts',
    'tsconfig.json',
    'README.md',
  ],
}, {
  rules: {
    'style/semi': 'off',
    'regexp/no-unused-capturing-group': 'off',
  },
})
