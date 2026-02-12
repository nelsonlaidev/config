import type { FlatConfig } from '../types'

import { gitignorePlugin } from '../plugins'

export const gitignore = (): FlatConfig[] => [
  gitignorePlugin({
    name: 'nelsonlaidev/gitignore',
  }),
]
