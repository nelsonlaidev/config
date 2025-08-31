import type { FlatConfig, RuleOverrides } from '../types'

import { deMorganPlugin } from '../plugins'

export const deMorgan = (overrides?: RuleOverrides): FlatConfig[] => [
  {
    name: 'nelsonlaidev/de-morgan/rules',
    plugins: {
      'de-morgan': deMorganPlugin
    },
    rules: {
      ...deMorganPlugin.configs.recommended.rules,

      ...overrides
    }
  }
]
