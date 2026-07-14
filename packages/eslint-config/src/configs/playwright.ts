import type { FlatConfig } from '../types'

import globals from 'globals'

import { playwrightPlugin } from '../plugins'
import { mergeConfig } from '../utils'

export const playwright = (options: FlatConfig = {}): FlatConfig => {
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
