import type { OxlintOverride } from 'oxlint'

import { regexpRecommendedRules } from '../generated/plugin-snapshots'
import { GLOB_SRC } from '../globs'

export const regexp = (): OxlintOverride[] => [
  {
    files: [GLOB_SRC],
    jsPlugins: ['eslint-plugin-regexp'],
    rules: {
      ...regexpRecommendedRules,
    },
  },
]
