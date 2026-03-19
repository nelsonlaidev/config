import type { OxlintOverride } from 'oxlint'

export const importSort = (): OxlintOverride[] => [
  {
    files: ['**/*.{ts,tsx}'],
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
