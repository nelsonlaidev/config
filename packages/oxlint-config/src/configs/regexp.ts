import type { OxlintOverride } from 'oxlint'

import { GLOB_SRC } from '../globs'
import { regexpPlugin } from '../plugins'

export const regexp = (): OxlintOverride[] => [
  {
    files: [GLOB_SRC],
    jsPlugins: ['eslint-plugin-regexp'],
    rules: {
      ...regexpPlugin.configs.recommended.rules,
    },
  },
]
