import type { FlatConfig, RuleOverrides } from '../types'

import { unicornPlugin } from '../plugins'

export const unicorn = (overrides?: RuleOverrides): FlatConfig[] => [
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

      ...overrides
    }
  }
]
