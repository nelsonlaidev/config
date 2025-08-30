import type { FlatConfig } from '../types'

import globals from 'globals'

import { playwrightPlugin } from '../plugins'

export const playwright = (glob: string): FlatConfig[] => [
  {
    name: 'nelsonlaidev/playwright/setup',
    languageOptions: {
      globals: globals['shared-node-browser']
    }
  },
  {
    name: 'nelsonlaidev/playwright/rules',
    files: [glob],
    plugins: {
      playwright: playwrightPlugin
    },
    rules: {
      ...playwrightPlugin.configs.recommended.rules
    }
  }
]
