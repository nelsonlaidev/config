import type { RuleConfig } from '@eslint/core'
import type { FlatConfig } from './types'

export function makeAllErrors(configs: FlatConfig[]): FlatConfig[] {
  return configs.map((config) => {
    if (!config.rules) return config

    return {
      ...config,
      rules: Object.fromEntries(
        Object.entries(config.rules).map(([rule, rawValue]) => {
          const value = rawValue as RuleConfig

          if (Array.isArray(value)) {
            const [level, ...rest] = value
            return [rule, level === 'warn' || level === 1 ? ['error', ...rest] : value]
          }

          return [rule, value === 'warn' || value === 1 ? 'error' : value]
        }),
      ) as Record<string, RuleConfig>,
    }
  })
}
