import type { FlatConfig } from '../types'

import { GLOB_SRC } from '../globs'
import { reactHooksPlugin, reactPlugin } from '../plugins'

export const react = (): FlatConfig[] => [
  {
    name: 'nelsonlaidev/react/setup',
    files: [GLOB_SRC],
    plugins: {
      ...reactPlugin.configs.all.plugins,
      'react-hooks': reactHooksPlugin,
    },
    settings: {
      ...reactPlugin.configs['strict-type-checked'].settings,
    },
  },
  {
    name: 'nelsonlaidev/react/rules',
    files: [GLOB_SRC],
    rules: {
      ...reactHooksPlugin.configs['recommended-latest'].rules,

      ...reactPlugin.configs['strict-type-checked'].rules,
      ...reactPlugin.configs['disable-conflict-eslint-plugin-react-hooks'].rules,

      '@eslint-react/immutability': 'error',
      '@eslint-react/refs': 'error',
    },
  },
]
