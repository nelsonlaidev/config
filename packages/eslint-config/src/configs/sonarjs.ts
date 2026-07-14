import type { FlatConfig } from '../types'

import { sonarjsPlugin } from '../plugins'

export const sonarjs = (): FlatConfig => ({
  name: 'nelsonlaidev/sonarjs',
  plugins: {
    sonarjs: sonarjsPlugin,
  },
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
    'sonarjs/assertions-in-tests': 'off',

    // Replaced by React rules
    'sonarjs/jsx-no-leaked-render': 'off',
  },
})
