import type { FlatConfig, VitestOptions } from '../types'

import { vitestPlugin } from '../plugins'

export const vitest = (options: VitestOptions): FlatConfig[] => [
  {
    name: 'nelsonlaidev/vitest/setup',
    files: options.files,
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
  },
  {
    name: 'nelsonlaidev/vitest/rules',
    files: options.files,
    rules: {
      ...vitestPlugin.configs.recommended.rules,

      'vitest/consistent-test-it': ['error', { fn: 'test' }],
      'vitest/prefer-mock-return-shorthand': 'error',
      'vitest/warn-todo': 'error',
    },
  },
]
