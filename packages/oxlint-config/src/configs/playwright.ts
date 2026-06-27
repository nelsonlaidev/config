import type { OxlintOverride } from 'oxlint'
import type { PlaywrightConfig } from '../types/playwright'

import { playwrightRecommendedRules } from '../generated/plugin-snapshots'

export const playwright = (config: PlaywrightConfig): OxlintOverride[] => [
  {
    files: config.files,
    jsPlugins: ['eslint-plugin-playwright'],
    rules: {
      ...playwrightRecommendedRules,

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
