import type { FlatConfig, RuleOverrides } from '../types'

import { jsdocPlugin } from '../plugins'

export const jsdoc = (overrides?: RuleOverrides): FlatConfig[] => [
  {
    name: 'nelsonlaidev/jsdoc/rules',
    plugins: {
      jsdoc: jsdocPlugin
    },
    rules: {
      ...jsdocPlugin.configs['flat/recommended'].rules,

      ...overrides
    }
  }
]
