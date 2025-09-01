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

      '@eslint-react/naming-convention/filename': ['error', 'kebab-case'],

      // Unnecessary
      '@eslint-react/avoid-shorthand-boolean': 'off',
      '@eslint-react/avoid-shorthand-fragment': 'off',
      '@eslint-react/no-complex-conditional-rendering': 'off',
      '@eslint-react/no-array-index-key': 'off',

      ...overrides
    }
  }
]
