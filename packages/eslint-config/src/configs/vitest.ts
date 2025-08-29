import type { Linter } from 'eslint'

import { vitestPlugin } from '../plugins'

export const vitest = (glob: string): Linter.Config[] => [
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
