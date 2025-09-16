import type { FlatConfig, RuleOverrides } from '../types'

import { stylisticPlugin } from '../plugins'

export const stylistic = (overrides?: RuleOverrides): FlatConfig[] => [
  {
    name: 'nelsonlaidev/stylistic/rules',
    plugins: {
      '@stylistic': stylisticPlugin
    },
    rules: {
      '@stylistic/multiline-comment-style': 'error',

      ...overrides
    }
  }
]
