import type { Overrides } from '../types'

export const unusedImports: Overrides = [
  {
    files: ['**/*.{ts,tsx}'],
    jsPlugins: ['eslint-plugin-unused-imports'],
    rules: {
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
  },
]
