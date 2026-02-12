import type { FlatConfig, VitestOptions } from '../types'

import { vitestPlugin } from '../plugins'

export const vitest = (options: VitestOptions): FlatConfig[] => [
  {
    name: 'nelsonlaidev/vitest/rules',
    files: options.files,
    plugins: {
      vitest: vitestPlugin,
    },
    rules: {
      ...vitestPlugin.configs.all.rules,

      // Too restrictive
      'vitest/max-expects': 'off',

      'vitest/consistent-test-it': ['error', { fn: 'test' }],
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
]
