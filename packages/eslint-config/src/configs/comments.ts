import type { FlatConfig } from '../types'

import { commentsPlugin } from '../plugins'

export const comments = (): FlatConfig[] => [
  {
    name: 'nelsonlaidev/eslint-comments/rules',
    plugins: {
      '@eslint-community/eslint-comments': commentsPlugin
    },
    rules: {
      ...commentsPlugin.configs.recommended.rules,

      '@eslint-community/eslint-comments/require-description': 'error',
      '@eslint-community/eslint-comments/no-unused-disable': 'error',
      '@eslint-community/eslint-comments/no-restricted-disable': 'error',
      '@eslint-community/eslint-comments/no-use': ['error', { allow: ['eslint-disable-next-line'] }]
    }
  }
]
