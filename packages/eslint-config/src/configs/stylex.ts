import type { FlatConfig } from '../types'

import { loadOptionalDependency, mergeConfig } from '../utils'

export const stylex = async (options: FlatConfig = {}): Promise<FlatConfig> => {
  const stylexPlugin = await loadOptionalDependency('@stylexjs/eslint-plugin')

  const base: FlatConfig = {
    name: 'nelsonlaidev/stylex',
    plugins: {
      '@stylexjs': stylexPlugin,
    },
    rules: {
      '@stylexjs/enforce-extension': 'error',
      '@stylexjs/no-conflicting-props': 'error',
      '@stylexjs/no-legacy-contextual-styles': 'error',
      '@stylexjs/no-lookahead-selectors': 'off',
      '@stylexjs/no-nonstandard-styles': 'error',
      '@stylexjs/no-unused': 'error',
      '@stylexjs/sort-keys': 'error',
      '@stylexjs/valid-shorthands': 'error',
      '@stylexjs/valid-styles': 'error',
    },
  }

  return mergeConfig(base, options)
}
