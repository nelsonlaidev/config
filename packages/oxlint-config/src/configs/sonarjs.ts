import type { OxlintOverride } from 'oxlint'

import { sonarjsRecommendedRules } from '../generated/plugin-snapshots'
import { GLOB_SRC } from '../globs'

export const sonarjs = (): OxlintOverride[] => [
  {
    files: [GLOB_SRC],
    jsPlugins: ['eslint-plugin-sonarjs'],
    rules: {
      ...sonarjsRecommendedRules,

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
      'sonarjs/assertions-in-tests': 'off',

      // Replaced by React rules
      'sonarjs/jsx-no-leaked-render': 'off',
    },
  },
]
