import type { FlatConfig } from '../types'

import { loadOptionalDependency, mergeConfig } from '../utils'

export const prettier = async (options: FlatConfig = {}): Promise<FlatConfig> => {
  const prettierConfig = await loadOptionalDependency('eslint-config-prettier')

  const base: FlatConfig = {
    name: 'nelsonlaidev/prettier',
    rules: prettierConfig.rules,
  }

  return mergeConfig(base, options)
}
