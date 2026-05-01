import type { OxlintOverride } from 'oxlint'

import { omit } from 'es-toolkit/object'

import { GLOB_SRC } from '../globs'
import { regexpPlugin } from '../plugins'

export const regexp = (): OxlintOverride[] => [
  {
    files: [GLOB_SRC],
    jsPlugins: ['eslint-plugin-regexp'],
    rules: {
      // Recommended rules enable some rules that are not supported by Oxlint yet.
      ...omit(regexpPlugin.configs.recommended.rules, ['prefer-regex-literals']),
    },
  },
]
