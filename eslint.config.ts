import { defineConfig } from '@nelsonlaidev/eslint-config'

export default defineConfig(
  undefined,
  {
    rules: {
      // ESLint rule visitors are structurally nested by design (visitor → loop → type checks → fix),
      // which inflates cognitive complexity scores without reflecting actual code complexity.
      'sonarjs/cognitive-complexity': 'off',
    },
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      'import-x/no-unassigned-import': 'off',
    },
  },
)
