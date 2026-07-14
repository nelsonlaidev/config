import type { OxlintOverride } from 'oxlint'

import { merge } from 'ts-deepmerge'

export function mergeConfig(base: OxlintOverride, override: Partial<OxlintOverride>): OxlintOverride {
  const { plugins: basePlugins = [], jsPlugins: baseJsPlugins = [], ...baseConfig } = base
  const { plugins: overridePlugins = [], jsPlugins: overrideJsPlugins, ...overrideConfig } = override

  const config = merge.withOptions(
    { allowUndefinedOverrides: false, mergeArrays: false },
    baseConfig,
    overrideConfig,
  ) as OxlintOverride

  const plugins = [...new Set([...basePlugins, ...overridePlugins])]
  let jsPlugins = baseJsPlugins

  if (overrideJsPlugins === null) {
    jsPlugins = null
  } else if (overrideJsPlugins) {
    jsPlugins = [...(baseJsPlugins ?? []), ...overrideJsPlugins]
  }

  return {
    ...config,
    plugins,
    jsPlugins,
  }
}
