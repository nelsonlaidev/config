import type { Linter } from 'eslint'

import { prettierPlugin, prettierPluginRecommended } from '../plugins'

export const prettier: Linter.Config[] = [
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
