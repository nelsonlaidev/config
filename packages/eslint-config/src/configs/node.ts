import type { Linter } from 'eslint'

import { nodePlugin } from '../plugins'

export const node: Linter.Config[] = [
  {
    name: 'nelsonlaidev/node/rules',
    plugins: {
      n: nodePlugin
    },
    rules: {
      ...nodePlugin.configs['flat/recommended-module'].rules,

      // Handled by TypeScript
      'n/no-missing-import': 'off',
      'n/no-missing-require': 'off',
      'n/no-unpublished-bin': 'off',
      'n/no-unpublished-import': 'off',
      'n/no-unpublished-require': 'off',
      'n/no-unsupported-features/es-builtins': 'off',
      'n/no-unsupported-features/es-syntax': 'off',
      'n/no-unsupported-features/node-builtins': 'off'
    }
  }
]
