import type { FlatConfig } from '../types'

import process from 'node:process'

import parser from '@typescript-eslint/parser'

import { GLOB_TS, GLOB_TSX } from '../globs'
import { typescriptPlugin } from '../plugins'

export const typescript = (tsconfigRootDir: string = process.cwd()): FlatConfig[] => [
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
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type']
    }
  }
]
