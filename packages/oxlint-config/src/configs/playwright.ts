import type { OxlintOverride } from 'oxlint'
import type { PlaywrightConfig } from '../types/playwright'

import { playwrightPlugin } from '../plugins'

export const playwright = (config: PlaywrightConfig): OxlintOverride[] => [
  {
    files: config.files,
    jsPlugins: ['eslint-plugin-playwright'],
    rules: {
      ...playwrightPlugin.configs.recommended.rules,

      'playwright/expect-expect': [
        'error',
        {
          assertFunctionNames: config.assertFunctionNames ?? [],
          assertFunctionPatterns: config.assertFunctionPatterns ?? [],
        },
      ],
    },
  },
]
