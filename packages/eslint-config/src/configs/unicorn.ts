import type { FlatConfig } from '../types'

import { unicornPlugin } from '../plugins'

export const unicorn = (): FlatConfig => ({
  name: 'nelsonlaidev/unicorn',
  plugins: {
    unicorn: unicornPlugin,
  },
  rules: {
    ...unicornPlugin.configs.recommended.rules,

    'unicorn/text-encoding-identifier-case': ['error', { withDash: true }],

    // Too opinionated
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/no-null': 'off',

    // Unnecessary
    'unicorn/no-document-cookie': 'off',
    'unicorn/prefer-string-raw': 'off',
    'unicorn/prefer-number-coercion': 'off',
    'unicorn/max-nested-calls': 'off',
  },
})
