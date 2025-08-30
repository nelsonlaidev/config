import type { FlatConfig } from '../types'

import { regexpPlugin } from '../plugins'

export const regexp = (): FlatConfig[] => [
  {
    name: 'nelsonlaidev/regexp/rules',
    plugins: {
      regexp: regexpPlugin
    },
    rules: {
      ...regexpPlugin.configs['flat/recommended'].rules
    }
  }
]
