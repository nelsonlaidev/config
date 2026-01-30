import type { FlatConfig, RuleOverrides } from '../types'

import parser from '@typescript-eslint/parser'

import { GLOB_TS, GLOB_TSX } from '../globs'
import { typescriptPlugin } from '../plugins'

export const typescript = (tsconfigRootDir: string, overrides?: RuleOverrides): FlatConfig[] => [
  {
    name: 'nelsonlaidev/typescript/setup',
    files: [GLOB_TS, GLOB_TSX],
    languageOptions: {
      parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir
      },
      sourceType: 'module'
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin
    }
  },
  {
    name: 'nelsonlaidev/typescript/rules',
    files: [GLOB_TS, GLOB_TSX],
    rules: {
      ...typescriptPlugin.configs['eslint-recommended'].overrides[0].rules,
      ...typescriptPlugin.configs['strict-type-checked'].rules,
      ...typescriptPlugin.configs['stylistic-type-checked'].rules,

      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/no-invalid-this': 'error',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports'
        }
      ],
      '@typescript-eslint/consistent-type-exports': ['error', { fixMixedExportsWithInlineTypeSpecifier: true }],
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
      '@typescript-eslint/only-throw-error': [
        'error',
        {
          allow: [
            {
              from: 'package',
              package: '@tanstack/router-core',
              name: 'Redirect'
            }
          ]
        }
      ],
      '@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'with-single-extends' }],

      // Too opinionated
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',

      '@typescript-eslint/consistent-type-definitions': 'off',

      ...overrides
    }
  }
]
