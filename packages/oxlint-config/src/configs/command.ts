import type { OxlintOverride } from 'oxlint'

import { GLOB_SRC } from '../globs'

export const command = (): OxlintOverride[] => [
  {
    files: [GLOB_SRC],
    jsPlugins: ['eslint-plugin-command'],
    rules: {
      'command/command': 'error',
    },
  },
]
