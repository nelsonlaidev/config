import type { FlatConfig, RuleOverrides } from '../types'

import { GLOB_SRC } from '../globs'
import { reactHooksPlugin, reactPlugin } from '../plugins'

export const react = (overrides?: RuleOverrides): FlatConfig[] => [
  {
    name: 'nelsonlaidev/react/rules',
    files: [GLOB_SRC],
    plugins: {
      ...reactPlugin.configs.all.plugins,
      'react-hooks': reactHooksPlugin
    },
    rules: {
      ...reactPlugin.configs.all.rules,
      ...reactHooksPlugin.configs['recommended-latest'].rules,

      '@eslint-react/naming-convention/filename': [
        'error',
        {
          rule: 'kebab-case',
          excepts: ['index', String.raw`/^_/`, String.raw`/^\$/`, String.raw`/^[0-9]+$/`, String.raw`/^\[[^\]]+\]$/`]
        }
      ],

      // Unnecessary
      '@eslint-react/no-complex-conditional-rendering': 'off',
      '@eslint-react/no-array-index-key': 'off',

      ...overrides
    }
  }
]
