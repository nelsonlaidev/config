import type { FlatConfig } from '../types'

import { nodePlugin } from '../plugins'

export const node = (): FlatConfig[] => [
  {
    name: 'nelsonlaidev/node/rules',
    plugins: {
      n: nodePlugin,
    },
    rules: {
      ...nodePlugin.configs['recommended-module'].rules,

      'n/no-new-require': 'error',
      'n/no-path-concat': 'error',
      'n/prefer-node-protocol': 'error',
      'n/prefer-promises/fs': 'error',
      'n/prefer-promises/dns': 'error',
    },
  },
]
