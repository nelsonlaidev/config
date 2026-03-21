import type { OxlintOverride } from 'oxlint'

import { GLOB_SRC } from '../globs'

export const deMorgan = (): OxlintOverride[] => [
  {
    files: [GLOB_SRC],
    jsPlugins: ['eslint-plugin-de-morgan'],
    rules: {
      'de-morgan/no-negated-conjunction': 'error',
      'de-morgan/no-negated-disjunction': 'error',
    },
  },
]
