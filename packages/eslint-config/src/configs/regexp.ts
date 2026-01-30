import type { FlatConfig, RuleOverrides } from '../types'

import { regexpPlugin } from '../plugins'

export const regexp = (overrides?: RuleOverrides): FlatConfig[] => [
  {
    name: 'nelsonlaidev/regexp/rules',
    plugins: {
      regexp: regexpPlugin
    },
    rules: {
      ...regexpPlugin.configs.recommended.rules,

      ...overrides
    }
  }
]
