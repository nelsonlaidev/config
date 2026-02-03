import type { FlatConfig, PlaywrightOptions } from '../types'

import globals from 'globals'

import { playwrightPlugin } from '../plugins'

export const playwright = (options: PlaywrightOptions): FlatConfig[] => [
  {
    name: 'nelsonlaidev/playwright/setup',
    languageOptions: {
      globals: globals['shared-node-browser']
    }
  },
  {
    name: 'nelsonlaidev/playwright/rules',
    files: options.files,
    plugins: {
      playwright: playwrightPlugin
    },
    rules: {
      ...playwrightPlugin.configs.recommended.rules
    }
  }
]
