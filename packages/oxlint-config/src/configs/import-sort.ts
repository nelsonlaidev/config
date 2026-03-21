import type { OxlintOverride } from 'oxlint'

import { GLOB_SRC } from '../globs'

export const importSort = (): OxlintOverride[] => [
  {
    files: [GLOB_SRC],
    jsPlugins: [{ name: 'import-sort', specifier: 'eslint-plugin-simple-import-sort' }],
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
