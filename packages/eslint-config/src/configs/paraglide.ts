import type { FlatConfig } from '../types'

import { loadOptionalDependency, mergeConfig } from '../utils'

export const paraglide = async (options: FlatConfig = {}): Promise<FlatConfig> => {
  const plugin = await loadOptionalDependency('@inlang/paraglide-js/eslint', '@inlang/paraglide-js')

  return mergeConfig(
    {
      name: 'nelsonlaidev/paraglide',
      plugins: { paraglide: plugin },
      rules: { 'paraglide/no-dynamic-message-access': 'error' },
    },
    options,
  )
}
