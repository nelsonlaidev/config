import type { FlatConfig } from '../types'

import gitignorePlugin from 'eslint-config-flat-gitignore'

export const gitignore = (): FlatConfig[] => [
  gitignorePlugin({
    name: 'nelsonlaidev/gitignore'
  })
]
