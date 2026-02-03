import type { FlatConfig } from '../types'

import { prettierPlugin, prettierPluginRecommended } from '../plugins'

export const prettier = (): FlatConfig[] => [
  {
    name: 'nelsonlaidev/prettier/rules',
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      ...prettierPluginRecommended.rules
    }
  }
]
