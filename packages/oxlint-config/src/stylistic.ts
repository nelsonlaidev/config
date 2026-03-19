import type { Overrides } from './types'

export const stylistic: Overrides = [
  {
    files: ['**/*.{ts,tsx}'],
    jsPlugins: ['@stylistic/eslint-plugin'],
    rules: {
      '@stylistic/multiline-comment-style': ['error', 'separate-lines'],
    },
  },
]
