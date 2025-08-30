import type { FlatConfig } from '../types'

import { nodePlugin } from '../plugins'

export const node = (): FlatConfig[] => [
  {
    name: 'nelsonlaidev/node/rules',
    plugins: {
      n: nodePlugin
    },
    rules: {
      'n/handle-callback-err': ['error', '^(err|error)$'],
      'n/no-deprecated-api': 'error',
      'n/no-exports-assign': 'error',
      'n/no-new-require': 'error',
      'n/no-path-concat': 'error',
      'n/prefer-global/buffer': ['error', 'never'],
      'n/prefer-global/process': ['error', 'never'],
      'n/prefer-promises/fs': 'error',
      'n/process-exit-as-throw': 'error'
    }
  }
]
