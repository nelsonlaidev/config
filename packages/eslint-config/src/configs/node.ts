import type { FlatConfig } from '../types'

import { nodePlugin } from '../plugins'

export const node = (): FlatConfig[] => [
  {
    name: 'nelsonlaidev/node/rules',
    plugins: {
      n: nodePlugin,
    },
    rules: {
      'n/no-deprecated-api': 'error',
      'n/no-exports-assign': 'error',
      'n/no-path-concat': 'error',
      'n/prefer-node-protocol': 'error',
      'n/prefer-promises/fs': 'error',
      'n/prefer-promises/dns': 'error',
    },
  },
]
