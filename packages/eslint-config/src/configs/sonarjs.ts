import type { FlatConfig } from '../types'

import { sonarjsPlugin } from '../plugins'

export const sonarjs = (): FlatConfig[] => [
  {
    name: 'nelsonlaidev/sonarjs/rules',
    plugins: {
      sonarjs: sonarjsPlugin
    },
    rules: {
      ...sonarjsPlugin.configs.recommended.rules,

      // Disable due to poor performance
      // https://community.sonarsource.com/t/eslint-plugin-sonarjs-performance-issues-on-large-codebase/138392
      'sonarjs/no-commented-code': 'off'
    }
  }
]
