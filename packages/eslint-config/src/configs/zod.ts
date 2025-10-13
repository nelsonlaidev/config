import type { FlatConfig, RuleOverrides } from '../types'

import { importZodPlugin } from '../plugins'

export const zod = (overrides?: RuleOverrides): FlatConfig[] => [
  {
    name: 'nelsonlaidev/zod/rules',
    plugins: {
      'import-zod': importZodPlugin
    },
    rules: {
      'import-zod/prefer-zod-namespace': 'error',

      ...overrides
    }
  }
]
