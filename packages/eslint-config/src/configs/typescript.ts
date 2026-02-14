import type { FlatConfig } from '../types'

import parser from '@typescript-eslint/parser'

import { GLOB_TS, GLOB_TSX } from '../globs'
import { typescriptPlugin } from '../plugins'

export const typescript = (): FlatConfig[] => [
  {
    name: 'nelsonlaidev/typescript/setup',
    languageOptions: {
      parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: process.cwd(),
      },
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
  },
  {
    name: 'nelsonlaidev/typescript/rules',
    files: [GLOB_TS, GLOB_TSX],
    rules: {
      ...typescriptPlugin.configs['eslint-recommended'].overrides[0].rules,
      ...typescriptPlugin.configs['strict-type-checked'].rules,
      ...typescriptPlugin.configs['stylistic-type-checked'].rules,

      '@typescript-eslint/no-restricted-types': 'error',
      '@typescript-eslint/no-unnecessary-parameter-property-assignment': 'error',
      '@typescript-eslint/no-useless-empty-export': 'error',
      '@typescript-eslint/prefer-enum-initializers': 'error',
      '@typescript-eslint/promise-function-async': 'error',
      '@typescript-eslint/require-array-sort-compare': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/class-methods-use-this': 'error',
      '@typescript-eslint/default-param-last': 'error',
      '@typescript-eslint/no-loop-func': 'error',
      '@typescript-eslint/no-invalid-this': 'error',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/array-type': ['error', { default: 'array-simple', readonly: 'array-simple' }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      '@typescript-eslint/consistent-type-exports': ['error', { fixMixedExportsWithInlineTypeSpecifier: false }],
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
      '@typescript-eslint/only-throw-error': [
        'error',
        { allow: [{ from: 'package', package: '@tanstack/router-core', name: 'Redirect' }] },
      ],
      '@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'with-single-extends' }],

      // Recommended to disable
      // https://github.com/sweepline/eslint-plugin-unused-imports?tab=readme-ov-file#usage
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    name: 'nelsonlaidev/typescript/declarations',
    files: ['**/*.d.ts'],
    rules: {
      // We sometimes need to use `interface` in declaration files,
      // especially when we want to extend from a type from another package,
      // and that type is an interface.
      '@typescript-eslint/consistent-type-definitions': 'off',
      // Similar to the above rule, interfaces support index signatures only when
      // we define object types with them.
      '@typescript-eslint/consistent-indexed-object-style': 'off',
    },
  },
]
