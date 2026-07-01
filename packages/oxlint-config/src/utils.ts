import type { DummyRuleMap, OxlintOverride } from 'oxlint'

export function remapRuleNames(rules: DummyRuleMap, from: string, to: string): DummyRuleMap {
  return Object.fromEntries(
    Object.entries(rules).map(([name, value]) => [name.startsWith(from) ? to + name.slice(from.length) : name, value]),
  ) as DummyRuleMap
}

export function makeAllErrors(overrides: OxlintOverride[]): OxlintOverride[] {
  return overrides.map((override) => {
    if (!override.rules) return override

    return {
      ...override,
      rules: Object.fromEntries(
        Object.entries(override.rules).map(([name, value]) => {
          if (Array.isArray(value)) {
            const [level, ...rest] = value
            return [name, level === 'warn' || level === 1 ? ['error', ...rest] : value]
          }

          return [name, value === 'warn' || value === 1 ? 'error' : value]
        }),
      ) as DummyRuleMap,
    }
  })
}

type Awaitable<T> = T | PromiseLike<T>

type InteropDefault<T> = T extends { default: infer U } ? U : T

function hasDefault(value: unknown): value is { default: unknown } {
  return value !== null && (typeof value === 'object' || typeof value === 'function') && 'default' in value
}

export async function interopDefault<T>(m: Awaitable<T>): Promise<InteropDefault<T>> {
  const resolved = await m

  if (hasDefault(resolved)) {
    return resolved.default as InteropDefault<T>
  }

  return resolved as InteropDefault<T>
}
