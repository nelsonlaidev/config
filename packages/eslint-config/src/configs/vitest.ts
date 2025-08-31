import type { FlatConfig, RuleOverrides } from '../types'

import { vitestPlugin } from '../plugins'

export const vitest = (glob: string, overrides?: RuleOverrides): FlatConfig[] => [
  {
    name: 'nelsonlaidev/vitest/rules',
    files: [glob],
    plugins: {
      vitest: vitestPlugin
    },
    rules: {
      ...vitestPlugin.configs.recommended.rules,

      ...overrides
    }
  }
]
