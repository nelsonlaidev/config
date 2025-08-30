import type { FlatConfig } from '../types'

import { jsdocPlugin } from '../plugins'

export const jsdoc = (): FlatConfig[] => [
  {
    name: 'nelsonlaidev/jsdoc/rules',
    plugins: {
      jsdoc: jsdocPlugin
    },
    rules: {
      ...jsdocPlugin.configs['flat/recommended'].rules
    }
  }
]
