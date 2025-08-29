import type { Linter } from 'eslint'

import { commandPlugin } from '../plugins'

export const command: Linter.Config[] = [
  {
    ...commandPlugin(),
    name: 'nelsonlaidev/command/rules'
  }
]
