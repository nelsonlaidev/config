import type { FlatConfig, VitestOptions } from '../types'

import { vitestPlugin } from '../plugins'

export const vitest = (options: VitestOptions): FlatConfig[] => [
  {
    name: 'nelsonlaidev/vitest/rules',
    files: options.files,
    plugins: {
      vitest: vitestPlugin
    },
    rules: {
      ...vitestPlugin.configs.recommended.rules
    }
  }
]
