import type ReactPlugin from '@eslint-react/eslint-plugin'
import type NextPlugin from '@next/eslint-plugin-next'
import type * as StylexPlugin from '@stylexjs/eslint-plugin'
import type VitestPlugin from '@vitest/eslint-plugin'
import type * as PrettierConfig from 'eslint-config-prettier'
import type TailwindcssPlugin from 'eslint-plugin-better-tailwindcss'
import type PlaywrightPlugin from 'eslint-plugin-playwright'
import type ReactHooksPlugin from 'eslint-plugin-react-hooks'
import type { FlatConfig } from './types'

import { merge } from 'ts-deepmerge'

type OptionalDependencies = {
  '@eslint-react/eslint-plugin': typeof ReactPlugin
  '@next/eslint-plugin-next': typeof NextPlugin
  '@stylexjs/eslint-plugin': typeof StylexPlugin
  '@vitest/eslint-plugin': typeof VitestPlugin
  'eslint-config-prettier': typeof PrettierConfig
  'eslint-plugin-better-tailwindcss': typeof TailwindcssPlugin
  'eslint-plugin-playwright': typeof PlaywrightPlugin
  'eslint-plugin-react-hooks': typeof ReactHooksPlugin
}

export async function loadOptionalDependency<K extends keyof OptionalDependencies>(
  specifier: K,
): Promise<OptionalDependencies[K]> {
  let resolved: string

  try {
    resolved = import.meta.resolve(specifier)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ERR_MODULE_NOT_FOUND') {
      throw new Error(`Install "${specifier}" to use this preset: npm i -D ${specifier}`, { cause: error })
    }
    throw error
  }

  const dependency = (await import(resolved)) as { default?: unknown }
  return (dependency.default ?? dependency) as OptionalDependencies[K]
}

export function mergeConfig(base: FlatConfig, override: FlatConfig): FlatConfig {
  const { plugins: basePlugins, ...baseConfig } = base
  const { plugins: overridePlugins, ...overrideConfig } = override

  return {
    ...merge.withOptions({ mergeArrays: false }, baseConfig, overrideConfig),
    plugins: { ...basePlugins, ...overridePlugins },
  }
}
