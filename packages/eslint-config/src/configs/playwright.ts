import type { Linter } from 'eslint'

import globals from 'globals'

import { playwrightPlugin } from '../plugins'

export const playwright = (glob: string): Linter.Config[] => [
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
