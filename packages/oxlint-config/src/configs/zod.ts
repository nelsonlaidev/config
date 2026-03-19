import type { Overrides } from '../types'

export const zod: Overrides = [
  {
    files: ['**/*.{ts,tsx}'],
    jsPlugins: ['eslint-plugin-import-zod'],
    rules: {
      'import-zod/prefer-zod-namespace': 'error',
    },
  },
]
