import type { OxlintOverride } from 'oxlint'

import { GLOB_SRC } from '../globs'

export const node = (): OxlintOverride[] => [
  {
    files: [GLOB_SRC],
    plugins: ['node'],
    rules: {
      'node/global-require': 'error',
      'node/handle-callback-err': 'error',
      'node/no-exports-assign': 'error',
      'node/no-new-require': 'error',
      'node/no-path-concat': 'error',
    },
  },
]
