import type { Linter } from 'eslint'

import eslint from '@eslint/js'
import globals from 'globals'

import { unusedImportsPlugin } from '../plugins'

export const javascript: Linter.Config[] = [
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
        window: 'readonly'
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: 2022,
        sourceType: 'module'
      },
      sourceType: 'module'
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
      reportUnusedInlineConfigs: 'error'
    }
  },
  {
    name: 'nelsonlaidev/javascript/rules',
    plugins: {
      'unused-imports': unusedImportsPlugin
    },
    rules: {
      ...eslint.configs.recommended.rules,

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
          argsIgnorePattern: '^_'
        }
      ]
    }
  }
]
