import type { FlatConfig, RuleOverrides } from '../types'

import { sonarjsPlugin } from '../plugins'

export const sonarjs = (overrides?: RuleOverrides): FlatConfig[] => [
  {
    name: 'nelsonlaidev/sonarjs/rules',
    plugins: {
      sonarjs: sonarjsPlugin
    },
    rules: {
      ...sonarjsPlugin.configs.recommended.rules,

      /*
       * Disable due to poor performance
       * https://community.sonarsource.com/t/eslint-plugin-sonarjs-performance-issues-on-large-codebase/138392
       */
      'sonarjs/no-commented-code': 'off',

      ...overrides
    }
  }
]
