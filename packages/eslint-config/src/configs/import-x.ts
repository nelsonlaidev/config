import type { TypeScriptResolverOptions } from 'eslint-import-resolver-typescript'
import type { FlatConfig } from '../types'

import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'

import { importXPlugin } from '../plugins'

export const importX = (options: TypeScriptResolverOptions = {}): FlatConfig => {
  return {
    name: 'nelsonlaidev/import-x',
    plugins: {
      'import-x': importXPlugin,
    },
    settings: {
      ...importXPlugin.configs.typescript.settings,
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          project: ['{ts,js}config.json', 'apps/**/{ts,js}config.json', 'packages/**/{ts,js}config.json'],
          noWarnOnMultipleProjects: true,
          ...options,
        }),
      ],
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
      'import-x/no-relative-packages': 'error',
      'import-x/no-self-import': 'error',
      'import-x/no-extraneous-dependencies': 'error',
      'import-x/no-absolute-path': 'error',
      'import-x/no-webpack-loader-syntax': 'error',
      'import-x/no-dynamic-require': 'error',
      'import-x/no-useless-path-segments': 'error',
      'import-x/no-import-module-exports': 'error',
      'import-x/no-empty-named-blocks': 'error',
      'import-x/no-deprecated': 'error',
      'import-x/no-duplicates': 'error',

      'import-x/no-named-as-default': 'off',
      'import-x/no-named-as-default-member': 'off',
    },
  }
}
