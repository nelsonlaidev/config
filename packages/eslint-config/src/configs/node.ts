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
      'node/no-missing-import': 'off',
      'node/no-missing-require': 'off',
      'node/no-unsupported-features/node-builtins': 'off'
    }
  }
]
