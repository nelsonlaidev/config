import type { Overrides } from './types'

export const importSort: Overrides = [
  {
    files: ['**/*.{ts,tsx}'],
    jsPlugins: ['eslint-plugin-simple-import-sort'],
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
  },
]
