import type { FlatConfig } from '../types'

import { promisePlugin } from '../plugins'

export const promise = (): FlatConfig[] => [
  {
    name: 'nelsonlaidev/promise/rules',
    plugins: {
      promise: promisePlugin,
    },
    rules: {
      ...promisePlugin.configs.recommended.rules,

      'promise/no-multiple-resolved': 'error',
      'promise/prefer-await-to-callbacks': 'error',
      'promise/prefer-await-to-then': 'error',
      'promise/prefer-catch': 'error',
      'promise/spec-only': 'error',
    },
  },
]
