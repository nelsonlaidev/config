import type { Linter } from 'eslint'

import { commentsPlugin } from '../plugins'

export const comments: Linter.Config[] = [
  {
    name: 'nelsonlaidev/eslint-comments/rules',
    plugins: {
      '@eslint-community/eslint-comments': commentsPlugin
    },
    rules: {
      ...commentsPlugin.configs.recommended.rules,

      'eslint-comments/require-description': 'error',
      'eslint-comments/no-unused-disable': 'error',
      'eslint-comments/no-restricted-disable': 'error',
      'eslint-comments/no-use': 'error'
    }
  }
]
