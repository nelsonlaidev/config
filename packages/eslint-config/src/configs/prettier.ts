import type { FlatConfig, RuleOverrides } from '../types'

import { prettierPlugin, prettierPluginRecommended } from '../plugins'

export const prettier = (overrides?: RuleOverrides): FlatConfig[] => [
  {
    name: 'nelsonlaidev/prettier/rules',
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      ...prettierPluginRecommended.rules,

      ...overrides
    }
  }
]
