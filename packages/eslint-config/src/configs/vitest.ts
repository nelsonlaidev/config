import type { FlatConfig } from '../types'

import { loadOptionalDependency, mergeConfig } from '../utils'

export const vitest = async (options: FlatConfig = {}): Promise<FlatConfig> => {
  const vitestPlugin = await loadOptionalDependency('@vitest/eslint-plugin')

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
