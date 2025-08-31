import type { FlatConfig, RuleOverrides } from '../types'

import { nextPlugin } from '../plugins'

export const nextjs = (overrides?: RuleOverrides): FlatConfig[] => [
  {
    name: 'nelsonlaidev/nextjs/rules',
    plugins: {
      '@next/next': nextPlugin
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,

      ...overrides
    }
  }
]
