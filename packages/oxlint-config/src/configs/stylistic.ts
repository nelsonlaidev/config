import type { OxlintOverride } from 'oxlint'

import { GLOB_SRC } from '../globs'

export const stylistic = (): OxlintOverride[] => [
  {
    files: [GLOB_SRC],
    jsPlugins: ['@stylistic/eslint-plugin'],
    rules: {
      '@stylistic/multiline-comment-style': ['error', 'separate-lines'],
    },
  },
]
