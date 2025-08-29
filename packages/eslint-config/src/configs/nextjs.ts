import type { Linter } from 'eslint'

import { nextPlugin } from '../plugins'

export const nextjs: Linter.Config[] = [
  {
    name: 'nelsonlaidev/nextjs/rules',
    plugins: {
      next: nextPlugin
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules
    }
  }
]
