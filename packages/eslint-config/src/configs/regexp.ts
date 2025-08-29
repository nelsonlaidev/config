import type { Linter } from 'eslint'

import { regexpPlugin } from '../plugins'

export const regexp: Linter.Config[] = [
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
