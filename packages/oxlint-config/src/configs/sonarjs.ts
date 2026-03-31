import type { OxlintOverride } from 'oxlint'

import { GLOB_SRC } from '../globs'
import { sonarjsPlugin } from '../plugins'

export const sonarjs = (): OxlintOverride[] => [
  {
    files: [GLOB_SRC],
    jsPlugins: ['eslint-plugin-sonarjs'],
    rules: {
      ...sonarjsPlugin.configs.recommended.rules,

      // Disable due to poor performance
      // https://community.sonarsource.com/t/eslint-plugin-sonarjs-performance-issues-on-large-codebase/138392
      'sonarjs/no-commented-code': 'off',
      'sonarjs/deprecation': 'off',
      'sonarjs/arguments-order': 'off',

      // Unnecessary
      'sonarjs/pseudo-random': 'off',
      'sonarjs/function-return-type': 'off',
      'sonarjs/prefer-read-only-props': 'off',
      'sonarjs/argument-type': 'off',
      'sonarjs/cognitive-complexity': 'off',

      // Replaced by React rules
      'sonarjs/jsx-no-leaked-render': 'off',
    },
  },
]
