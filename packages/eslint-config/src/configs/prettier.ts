import type { FlatConfig } from '../types'

import { prettierPlugin, prettierPluginRecommended } from '../plugins'

export const prettier = (): FlatConfig[] => [
  {
    name: 'nelsonlaidev/prettier/rules',
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierPluginRecommended.rules,

      // We don't need ESLint to check for Prettier formatting issues, since Prettier will handle that.
      // Moreover, prettier/prettier is very slow, and it can significantly increase the time it takes to run ESLint.
      'prettier/prettier': 'off',
    },
  },
]
