import type { Linter } from 'eslint'

import { importLitePlugin } from '../plugins'

export const imports: Linter.Config[] = [
  {
    name: 'nelsonlaidev/imports/rules',
    plugins: {
      'import-lite': importLitePlugin
    },
    rules: {
      'import-lite/first': 'error',
      'import-lite/newline-after-import': ['error', { count: 1 }],
      'import-lite/no-duplicates': 'error',
      'import-lite/no-mutable-exports': 'error',
      'import-lite/no-named-default': 'error'
    }
  }
]
