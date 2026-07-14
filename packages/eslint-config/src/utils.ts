import type { FlatConfig } from './types'

import { merge } from 'ts-deepmerge'

export function mergeConfig(base: FlatConfig, override: FlatConfig): FlatConfig {
  const { plugins: basePlugins, ...baseConfig } = base
  const { plugins: overridePlugins, ...overrideConfig } = override

  return {
    ...merge.withOptions({ mergeArrays: false }, baseConfig, overrideConfig),
    plugins: { ...basePlugins, ...overridePlugins },
  }
}
