import type { FlatConfig, ImportXOptions } from '../types'

import { importXPlugin } from '../plugins'

export const importX = (options: ImportXOptions = {}): FlatConfig[] => [
  {
    name: 'nelsonlaidev/import-x/rules',
    plugins: {
      'import-x': importXPlugin,
    },
    rules: {
      ...importXPlugin.configs.recommended.rules,
      ...importXPlugin.configs.typescript.rules,

      'import-x/consistent-type-specifier-style': 'error',
      'import-x/first': 'error',
      'import-x/newline-after-import': ['error', { count: 1 }],
      'import-x/no-amd': 'error',
      'import-x/no-anonymous-default-export': 'error',
      'import-x/no-commonjs': 'error',
      'import-x/no-mutable-exports': 'error',
      'import-x/no-named-default': 'error',
      'import-x/no-namespace': ['error', { ignore: ['zod', ...(options.noNamespace?.ignore ?? [])] }],
      'import-x/no-relative-packages': 'error',
      'import-x/no-self-import': 'error',
      'import-x/no-extraneous-dependencies': 'error',
      'import-x/no-absolute-path': 'error',
      'import-x/no-webpack-loader-syntax': 'error',
      'import-x/no-dynamic-require': 'error',
      'import-x/no-unassigned-import': [
        'error',
        {
          allow: [
            '**/*.css',
            '**/*.scss',
            '**/*.less',
            'server-only',
            'client-only',
            '@total-typescript/ts-reset',
            '@testing-library/jest-dom/**',
            '@testing-library/jest-dom',
            'msw/{node,browser}',
            'dotenv/config',
            ...(options.noUnassignedImport?.allow ?? []),
          ],
        },
      ],
      'import-x/no-useless-path-segments': 'error',
      'import-x/no-import-module-exports': 'error',
      'import-x/no-empty-named-blocks': 'error',
      'import-x/no-deprecated': 'error',

      // This rule can trigger false positives in TypeScript projects.
      'import-x/no-named-as-default': 'off',
    },
    settings: {
      ...importXPlugin.configs.typescript.settings,
    },
  },
]
