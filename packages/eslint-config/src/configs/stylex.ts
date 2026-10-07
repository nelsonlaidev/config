import type { FlatConfig } from '../types'

import { stylexPlugin } from '../plugins'
import { mergeConfig } from '../utils'

export const stylex = (options: FlatConfig = {}): FlatConfig => {
  const base: FlatConfig = {
    name: 'nelsonlaidev/stylex',
    plugins: {
      '@stylexjs': stylexPlugin,
    },
    rules: {
      '@stylexjs/enforce-extension': 'error',
      '@stylexjs/no-conflicting-props': 'error',
      '@stylexjs/no-legacy-contextual-styles': 'error',
      '@stylexjs/no-lookahead-selectors': 'error',
      '@stylexjs/no-nonstandard-styles': 'error',
      '@stylexjs/no-unused': 'error',
      '@stylexjs/sort-keys': 'error',
      '@stylexjs/valid-shorthands': 'error',
      '@stylexjs/valid-styles': 'error',
    },
  }

  return mergeConfig(base, options)
}
