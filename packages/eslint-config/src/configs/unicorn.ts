import type { FlatConfig } from '../types'

import { unicornPlugin } from '../plugins'

export const unicorn = (): FlatConfig[] => [
  {
    name: 'nelsonlaidev/unicorn/rules',
    plugins: {
      unicorn: unicornPlugin
    },
    rules: {
      ...unicornPlugin.configs.recommended.rules,

      // Too opinionated
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-null': 'off',

      // Unnecessary
      'unicorn/no-document-cookie': 'off',
      'unicorn/prefer-string-raw': 'off'
    }
  }
]
