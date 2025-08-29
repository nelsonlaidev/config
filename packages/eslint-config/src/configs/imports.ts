import type { Linter } from 'eslint'

import { importLitePlugin } from '../plugins'

export const imports: Linter.Config[] = [
  {
    name: 'nelsonlaidev/imports/rules',
    plugins: {
      import: importLitePlugin
    },
    rules: {
      'import/consistent-type-specifier-style': ['error', 'top-level'],
      'import/first': 'error',
      'import/newline-after-import': ['error', { count: 1 }],
      'import/no-duplicates': 'error',
      'import/no-mutable-exports': 'error',
      'import/no-named-default': 'error'
    }
  }
]
