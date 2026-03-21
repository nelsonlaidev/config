import type { OxlintOverride } from 'oxlint'

import { GLOB_SRC } from '../globs'

export const promise = (): OxlintOverride[] => [
  {
    files: [GLOB_SRC],
    plugins: ['promise'],
    rules: {
      'promise/always-return': 'error',
      'promise/avoid-new': 'error',
      'promise/catch-or-return': 'error',
      'promise/no-callback-in': 'error',
      'promise/no-multiple-resolved': 'error',
      'promise/no-nesting': 'error',
      'promise/no-new-statics': 'error',
      'promise/no': 'error',
      'promise/no-return-in-finally': 'error',
      'promise/no-return-wrap': 'error',
      'promise/param-names': 'error',
      'promise/prefer-await-to-callbacks': 'error',
      'promise/prefer-await-to-then': 'error',
      'promise/prefer-catch': 'error',
      'promise/spec-only': 'error',
      'promise/valid-params': 'error',
    },
  },
]
