import type { FlatConfig } from '../types'

import eslint from '@eslint/js'
import globals from 'globals'

export const javascript = (): FlatConfig => ({
  name: 'nelsonlaidev/javascript',
  languageOptions: {
    ecmaVersion: 2022,
    globals: {
      ...globals.browser,
      ...globals.es2021,
      ...globals.node,
      document: 'readonly',
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    sourceType: 'module',
  },
  linterOptions: {
    reportUnusedDisableDirectives: 'error',
    reportUnusedInlineConfigs: 'error',
  },
  rules: {
    ...eslint.configs.recommended.rules,

    // Enable more rules
    'array-callback-return': 'error',
    eqeqeq: 'error',
    'no-alert': 'error',
    'no-await-in-loop': 'error',
    'no-eval': 'error',
    'no-extra-bind': 'error',
    'no-label-var': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-param-reassign': 'error',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-promise-executor-return': 'error',
    'no-return-assign': 'error',
    'no-script-url': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-template-curly-in-string': 'error',
    'no-unneeded-ternary': 'error',
    'no-useless-call': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-concat': 'error',
    'no-useless-rename': 'error',
    'no-useless-return': 'error',
    'no-var': 'error',
    'no-void': ['error', { allowAsStatement: true }],
    'prefer-object-has-own': 'error',
    'prefer-object-spread': 'error',
    'prefer-template': 'error',
    'preserve-caught-error': 'error',
    'symbol-description': 'error',
  },
})
