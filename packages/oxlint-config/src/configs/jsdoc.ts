import type { OxlintOverride } from 'oxlint'

import { GLOB_SRC } from '../globs'

export const jsdoc = (): OxlintOverride[] => [
  {
    files: [GLOB_SRC],
    plugins: ['jsdoc'],
    rules: {
      'jsdoc/check-tag-names': 'error',
      'jsdoc/empty-tags': 'error',
    },
  },
]
