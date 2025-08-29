import type { Linter } from 'eslint'

import { unicornPlugin } from '../plugins'

export const unicorn: Linter.Config[] = [
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
