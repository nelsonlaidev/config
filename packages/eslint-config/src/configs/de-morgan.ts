import type { Linter } from 'eslint'

import { deMorganPlugin } from '../plugins'

export const deMorgan: Linter.Config[] = [
  {
    name: 'nelsonlaidev/de-morgan/rules',
    plugins: {
      'de-morgan': deMorganPlugin
    },
    rules: {
      ...deMorganPlugin.configs.recommended.rules
    }
  }
]
