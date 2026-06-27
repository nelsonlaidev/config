import type { DummyRuleMap } from 'oxlint'

export function remapRuleNames(rules: DummyRuleMap, from: string, to: string): DummyRuleMap {
  return Object.fromEntries(
    Object.entries(rules).map(([name, value]) => [name.startsWith(from) ? to + name.slice(from.length) : name, value]),
  )
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
