import type { FlatConfig } from '../types'

import eslint from '@eslint/js'
import globals from 'globals'

import { unusedImportsPlugin } from '../plugins'

export const javascript = (): FlatConfig[] => [
  {
    name: 'nelsonlaidev/javascript/setup',
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        document: 'readonly',
        navigator: 'readonly',
        window: 'readonly',
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
  },
  {
    name: 'nelsonlaidev/javascript/rules',
    plugins: {
      'unused-imports': unusedImportsPlugin,
    },
    rules: {
      ...eslint.configs.recommended.rules,

      // Enable more rules
      'accessor-pairs': 'error',
      'array-callback-return': 'error',
      'arrow-body-style': 'error',
      'block-scoped-var': 'error',
      'capitalized-comments': ['error', 'always', { ignorePattern: 'i18n-check', ignoreConsecutiveComments: true }],
      complexity: 'error',
      'default-case': 'error',
      'default-case-last': 'error',
      eqeqeq: 'error',
      'func-names': 'error',
      'max-classes-per-file': 'error',
      'max-depth': 'error',
      'max-nested-callbacks': 'error',
      'new-cap': ['error', { capIsNew: false }],
      'no-alert': 'error',
      'no-await-in-loop': 'error',
      'no-bitwise': 'error',
      'no-caller': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-constructor-return': 'error',
      'no-else-return': 'error',
      'no-eq-null': 'error',
      'no-eval': 'error',
      'no-extend-native': 'error',
      'no-extra-bind': 'error',
      'no-extra-label': 'error',
      'no-implicit-coercion': 'error',
      'no-label-var': 'error',
      'no-labels': 'error',
      'no-lone-blocks': 'error',
      'no-lonely-if': 'error',
      'no-multi-assign': 'error',
      'no-multi-str': 'error',
      'no-new': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-object-constructor': 'error',
      'no-param-reassign': 'error',
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      'no-promise-executor-return': 'error',
      'no-restricted-globals': 'error',
      'no-return-assign': 'error',
      'no-script-url': 'error',
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-template-curly-in-string': 'error',
      'no-unassigned-vars': 'error',
      'no-unneeded-ternary': 'error',
      'no-useless-call': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-concat': 'error',
      'no-useless-rename': 'error',
      'no-useless-return': 'error',
      'no-void': ['error', { allowAsStatement: true }],
      'no-warning-comments': 'error',
      'operator-assignment': 'error',
      'prefer-destructuring': [
        'error',
        {
          VariableDeclarator: { array: false, object: true },
          AssignmentExpression: { array: false, object: false },
        },
      ],
      'prefer-exponentiation-operator': 'error',
      'prefer-numeric-literals': 'error',
      'prefer-object-has-own': 'error',
      'prefer-object-spread': 'error',
      'preserve-caught-error': 'error',
      radix: 'error',
      'symbol-description': 'error',
      'unicode-bom': 'error',
      yoda: 'error',

      // Recommended to disable
      // https://github.com/sweepline/eslint-plugin-unused-imports?tab=readme-ov-file#usage
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',

      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
]
