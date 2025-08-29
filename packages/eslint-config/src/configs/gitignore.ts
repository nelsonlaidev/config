import type { Linter } from 'eslint'

import gitignorePlugin from 'eslint-config-flat-gitignore'

export const gitignore: Linter.Config[] = [
  gitignorePlugin({
    name: 'nelsonlaidev/gitignore'
  })
]
