import type { RuleConfig } from '@eslint/core'
import type { FlatConfig } from './types'

function normalizeRuleValue(value: RuleConfig): RuleConfig {
  if (Array.isArray(value)) {
    const [level, ...rest] = value
    return level === 'warn' || level === 1 ? ['error', ...rest] : value
  }

  return value === 'warn' || value === 1 ? 'error' : value
}

export function makeAllErrors(configs: FlatConfig[]): FlatConfig[] {
  return configs.map((config) => {
    if (!config.rules) return config

    const rules = Object.fromEntries(
      Object.entries(config.rules).map(([rule, rawValue]) => [rule, normalizeRuleValue(rawValue as RuleConfig)]),
    )

    return {
      ...config,
      rules,
    }
  })
}
