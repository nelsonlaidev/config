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

      'unicorn/prevent-abbreviations': 'off'
    }
  }
]
