import type { FlatConfig } from '../types'

import * as parserBase from '@typescript-eslint/parser'

import { GLOB_TS, GLOB_TSX } from '../globs'
import { typescriptPlugin } from '../plugins'

export const typescript = (): FlatConfig => ({
  name: 'nelsonlaidev/typescript',
  files: [GLOB_TS, GLOB_TSX],
  // Based on https://github.com/typescript-eslint/typescript-eslint/blob/1e4ba78abd6fa23f723cb874790e156edc0ec6d4/packages/eslint-plugin/src/configs/flat/base.ts
  languageOptions: {
    parser: {
      meta: parserBase.meta,
      parseForESLint: parserBase.parseForESLint,
    },
    parserOptions: {
      projectService: true,
      tsconfigRootDir: process.cwd(),
    },
    sourceType: 'module',
  },
  plugins: {
    '@typescript-eslint': typescriptPlugin,
  },
  rules: {
    // https://github.com/typescript-eslint/typescript-eslint/blob/1e4ba78abd6fa23f723cb874790e156edc0ec6d4/packages/eslint-plugin/src/configs/eslintrc/strict-type-checked.ts
    // base.ts (rules only)
    ...typescriptPlugin.configs['eslint-recommended'].overrides[0].rules,
    // strict-type-checked.ts (rules only)
    ...typescriptPlugin.configs['strict-type-checked'].rules,

    // https://github.com/typescript-eslint/typescript-eslint/blob/1e4ba78abd6fa23f723cb874790e156edc0ec6d4/packages/eslint-plugin/src/configs/eslintrc/stylistic-type-checked.ts
    // stylistic-type-checked.ts (rules only)
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
  },
})

export const typescriptDeclarations = (): FlatConfig => ({
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
})
