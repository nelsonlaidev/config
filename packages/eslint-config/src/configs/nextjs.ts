import type { FlatConfig } from '../types'

import { nextPlugin } from '../plugins'
import { mergeConfig } from '../utils'

export const nextjs = (options: FlatConfig = {}): FlatConfig => {
  const base: FlatConfig = {
    name: 'nelsonlaidev/nextjs',
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  }

  return mergeConfig(base, options)
}
