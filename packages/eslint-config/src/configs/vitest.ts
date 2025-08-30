import type { FlatConfig } from '../types'

import { vitestPlugin } from '../plugins'

export const vitest = (glob: string): FlatConfig[] => [
  {
    name: 'nelsonlaidev/vitest/rules',
    files: [glob],
    plugins: {
      vitest: vitestPlugin
    },
    rules: {
      ...vitestPlugin.configs.recommended.rules
    }
  }
]
