import type { FlatConfig } from '../types'

import { GLOB_SRC, GLOB_TS, GLOB_TSX } from '../globs'
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
      ...reactPlugin.configs.all.settings,
    },
  },
  {
    name: 'nelsonlaidev/react/rules',
    files: [GLOB_SRC],
    rules: {
      ...reactHooksPlugin.configs['recommended-latest'].rules,

      ...reactPlugin.configs.all.rules,
      ...reactPlugin.configs['disable-conflict-eslint-plugin-react-hooks'].rules,

      '@eslint-react/static-components': 'off',
      // Keep or remove once https://github.com/Rel1cx/eslint-react/issues/1884 is resolved
      'react-hooks/static-components': 'off',

      '@eslint-react/immutability': 'error',
      '@eslint-react/refs': 'error',
    },
  },
  {
    name: 'nelsonlaidev/react/typescript-rules',
    files: [GLOB_TS, GLOB_TSX],
    rules: {
      // Rules that require type information.
      '@eslint-react/no-leaked-conditional-rendering': 'error',
      '@eslint-react/no-unused-props': 'error',
    },
  },
]
