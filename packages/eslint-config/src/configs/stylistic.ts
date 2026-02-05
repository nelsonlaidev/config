import type { FlatConfig } from '../types'

import { stylisticPlugin } from '../plugins'

export const stylistic = (): FlatConfig[] => [
  {
    name: 'nelsonlaidev/stylistic/rules',
    plugins: {
      '@stylistic': stylisticPlugin
    },
    rules: {
      '@stylistic/multiline-comment-style': ['error', 'separate-lines']
    }
  }
]
