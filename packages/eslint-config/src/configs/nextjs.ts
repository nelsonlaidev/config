import type { FlatConfig } from '../types'

import { nextPlugin } from '../plugins'

export const nextjs = (): FlatConfig[] => [
  {
    name: 'nelsonlaidev/nextjs/rules',
    plugins: {
      '@next/next': nextPlugin
    },
    rules: {
      ...nextPlugin.configs['core-web-vitals'].rules,

      // Unnecessary
      '@next/next/no-html-link-for-pages': 'off'
    }
  }
]
