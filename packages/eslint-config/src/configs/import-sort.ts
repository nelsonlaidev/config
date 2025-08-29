import type { Linter } from 'eslint'

import { importSortPlugin } from '../plugins'

export const importSort: Linter.Config[] = [
  {
    name: 'nelsonlaidev/import-sort/rules',
    plugins: {
      'import-sort': importSortPlugin
    },
    rules: {
      'import-sort/imports': [
        'error',
        {
          groups: [
            // Type imports
            [
              String.raw`^.*\u0000$`,
              String.raw`^node:.*\u0000$`,
              String.raw`^@?\w.*\u0000$`,
              String.raw`^\.\..*\u0000$`,
              String.raw`^\..*\u0000$`
            ],

            // Side effect imports (e.g., `import 'some-module'`)
            [String.raw`^\u0000`],

            // Node.js builtins prefixed with `node:`
            ['^node:'],

            // Things that start with a letter (or digit or underscore), or `@` followed by a letter
            [String.raw`^@?\w`],

            // Absolute imports (e.g., `import something from 'src/utils'`)
            ['^[^.]'],

            // Parent directory relative imports (e.g., `import something from '../utils'`)
            [String.raw`^\.\.`],

            // Current directory relative imports (e.g., `import something from './utils'`)
            [String.raw`^\.`]
          ]
        }
      ],
      'import-sort/exports': 'error'
    }
  }
]
