import type { FlatConfig } from '../types'

import { rules } from 'eslint-config-prettier'

import { mergeConfig } from '../utils'

export const prettier = (options: FlatConfig = {}): FlatConfig => {
  const base: FlatConfig = {
    name: 'nelsonlaidev/prettier',
    rules,
  }

  return mergeConfig(base, options)
}
