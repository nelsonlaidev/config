import type { OxlintOverride } from 'oxlint'

import { GLOB_SRC } from '../globs'

export const zod = (): OxlintOverride[] => [
  {
    files: [GLOB_SRC],
    jsPlugins: ['eslint-plugin-import-zod'],
    rules: {
      'import-zod/prefer-zod-namespace': 'error',
    },
  },
]
