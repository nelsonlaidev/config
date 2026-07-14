import type { FlatConfig } from '../types'

import { unusedImportsPlugin } from '../plugins'

export const unusedImports = (): FlatConfig => ({
  name: 'nelsonlaidev/unused-imports',
  plugins: {
    'unused-imports': unusedImportsPlugin,
  },
  rules: {
    // Recommended to disable
    // https://github.com/sweepline/eslint-plugin-unused-imports?tab=readme-ov-file#usage
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',

    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
})
