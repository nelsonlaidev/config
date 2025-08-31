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

      'unicorn/prevent-abbreviations': 'off',

      ...overrides
    }
  }
]
