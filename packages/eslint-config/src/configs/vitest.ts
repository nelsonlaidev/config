import type { FlatConfig } from '../types'

import { vitestPlugin } from '../plugins'
import { mergeConfig } from '../utils'

export const vitest = (options: FlatConfig = {}): FlatConfig => {
  const base: FlatConfig = {
    name: 'nelsonlaidev/vitest',
    plugins: {
      vitest: vitestPlugin,
    },
    settings: {
      vitest: {
        typecheck: true,
      },
    },
    languageOptions: {
      globals: {
        ...vitestPlugin.environments.env.globals,
      },
    },
    rules: {
      ...vitestPlugin.configs.recommended.rules,

      'vitest/consistent-test-it': ['error', { fn: 'test' }],
      'vitest/prefer-mock-return-shorthand': 'error',
      'vitest/warn-todo': 'error',
    },
  }

  return mergeConfig(base, options)
}
