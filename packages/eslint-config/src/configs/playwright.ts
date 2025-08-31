import type { FlatConfig, RuleOverrides } from '../types'

import globals from 'globals'

import { playwrightPlugin } from '../plugins'

export const playwright = (glob: string, overrides?: RuleOverrides): FlatConfig[] => [
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
      ...playwrightPlugin.configs.recommended.rules,

      ...overrides
    }
  }
]
