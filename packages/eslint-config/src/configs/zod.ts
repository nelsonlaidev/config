import type { FlatConfig } from '../types'

import { importZodPlugin } from '../plugins'

export const zod = (): FlatConfig[] => [
  {
    name: 'nelsonlaidev/zod/rules',
    plugins: {
      'import-zod': importZodPlugin
    },
    rules: {
      'import-zod/prefer-zod-namespace': 'error'
    }
  }
]
