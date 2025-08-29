import type { Linter } from 'eslint'

import { jsdocPlugin } from '../plugins'

export const jsdoc: Linter.Config[] = [
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
