import type { Overrides } from '../types'

export const jsdoc: Overrides = [
  {
    files: ['**/*.{ts,tsx}'],
    plugins: ['jsdoc'],
    rules: {
      'jsdoc/check-tag-names': 'error',
      'jsdoc/empty-tags': 'error',
    },
  },
]
