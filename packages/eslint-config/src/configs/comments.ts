import type { FlatConfig, RuleOverrides } from '../types'

import { commentsPlugin } from '../plugins'

export const comments = (overrides?: RuleOverrides): FlatConfig[] => [
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
      '@eslint-community/eslint-comments/no-use': ['error', { allow: ['eslint-disable-next-line'] }],

      ...overrides
    }
  }
]
