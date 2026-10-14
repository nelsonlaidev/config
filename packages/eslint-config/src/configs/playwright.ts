import type { FlatConfig } from '../types'

import globals from 'globals'

import { loadOptionalDependency, mergeConfig } from '../utils'

export const playwright = async (options: FlatConfig = {}): Promise<FlatConfig> => {
  const playwrightPlugin = await loadOptionalDependency('eslint-plugin-playwright')

  const base: FlatConfig = {
    name: 'nelsonlaidev/playwright',
    plugins: {
      playwright: playwrightPlugin,
    },
    languageOptions: {
      globals: globals['shared-node-browser'],
    },
    rules: {
      ...playwrightPlugin.configs.recommended.rules,
    },
  }

  return mergeConfig(base, options)
}
