import type { FlatConfig } from '../types'

import { loadOptionalDependency, mergeConfig } from '../utils'

export const nextjs = async (options: FlatConfig = {}): Promise<FlatConfig> => {
  const nextPlugin = await loadOptionalDependency('@next/eslint-plugin-next')

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
