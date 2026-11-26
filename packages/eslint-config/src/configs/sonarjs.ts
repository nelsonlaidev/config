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

    // Enable only for test files below.
    'sonarjs/no-empty-test-file': 'off',

    // Duplicate
    'sonarjs/no-unused-vars': 'off',

    // Replaced by React rules
    'sonarjs/jsx-no-leaked-render': 'off',
  },
})

export const sonarjsTests = (): FlatConfig => ({
  name: 'nelsonlaidev/sonarjs/tests',
  files: ['**/*.{spec,test,cy}.{js,jsx,ts,tsx,cjs,cts,mjs,mts}'],
  rules: {
    'sonarjs/no-empty-test-file': 'error',
  },
})
