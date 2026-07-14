import type { FlatConfig } from '../types'

import { importSortPlugin } from '../plugins'

export const importSort = (): FlatConfig => ({
  name: 'nelsonlaidev/import-sort',
  plugins: {
    'import-sort': importSortPlugin,
  },
  rules: {
    'import-sort/imports': [
      'error',
      {
        groups: [
          ['^\\u0000'],

          ['^node:.*\\u0000$', '^@?\\w.*\\u0000$', '^(@/|~/|[^.]).*\\u0000$', '^\\.\\..*\\u0000$', '^\\..*\\u0000$'],

          ['^node:'],

          ['^@?\\w'],

          ['^@/', '^~/', '^[^.]'],

          ['^\\.\\.', '^\\.'],
        ],
      },
    ],
    'import-sort/exports': 'error',
  },
})
