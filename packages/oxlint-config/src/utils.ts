import type { DummyRuleMap } from 'oxlint'

export function remapRuleNames(rules: DummyRuleMap, from: string, to: string): DummyRuleMap {
  return Object.fromEntries(
    Object.entries(rules).map(([name, value]) => [name.startsWith(from) ? to + name.slice(from.length) : name, value]),
  )
}
