import type { FlatConfig } from '../types'

import { reactHooksPlugin, reactPlugin } from '../plugins'
import { mergeConfig } from '../utils'

export const react = (options: FlatConfig = {}): FlatConfig => {
  const base: FlatConfig = {
    name: 'nelsonlaidev/react',
    plugins: {
      ...reactPlugin.configs.all.plugins,
      'react-hooks': reactHooksPlugin,
    },
    settings: {
      ...reactPlugin.configs.all.settings,
    },
    rules: {
      ...reactHooksPlugin.configs['recommended-latest'].rules,

      ...reactPlugin.configs.all.rules,
      ...reactPlugin.configs['disable-conflict-eslint-plugin-react-hooks'].rules,

      // Not production ready
      '@eslint-react/static-components': 'off',

      '@eslint-react/immutability': 'error',
      '@eslint-react/refs': 'error',

      // Rules that require type information.
      '@eslint-react/no-leaked-conditional-rendering': 'error',
      '@eslint-react/no-unused-props': 'error',
    },
  }

  return mergeConfig(base, options)
}
