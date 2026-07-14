import type { PresetAnalysis, RuleSyncResult } from '../scripts/sync-oxlint-eslint'

import { describe, expect, it } from 'vitest'

import {
  buildReportGroups,
  getDroppedRules,
  getRuleMigrationDecisionKey,
  getSyncedRules,
  normalizeRule,
} from '../scripts/sync-oxlint-eslint'

describe('sync-oxlint-eslint helpers', () => {
  it('returns dropped metadata for unsupported rules', () => {
    const result = normalizeRule(['unicorn/missing-rule', 'error'], new Set(), 'unicorn')

    expect(result).toEqual({
      status: 'dropped',
      sourceRuleName: 'unicorn/missing-rule',
      normalizedRuleName: 'unicorn/missing-rule',
      dropReason: 'not_supported',
      sourceValue: 'error',
    })
  })

  it('returns synced metadata for supported rules', () => {
    const result = normalizeRule(
      ['unicorn/prefer-node-protocol', 'warn'],
      new Set(['unicorn/prefer-node-protocol']),
      'unicorn',
    )

    expect(getSyncedRules([result])).toEqual([['unicorn/prefer-node-protocol', 'error']])
  })

  it('drops type-aware rules unsupported by JavaScript plugins', () => {
    const result = normalizeRule(
      ['@eslint-react/no-unused-props', 'error'],
      new Set(),
      'react',
      undefined,
      true,
      new Map([['@eslint-react', '@eslint-react']]),
      undefined,
      new Set(['@eslint-react/no-unused-props']),
    )

    expect(result).toEqual({
      status: 'dropped',
      sourceRuleName: '@eslint-react/no-unused-props',
      normalizedRuleName: '@eslint-react/no-unused-props',
      dropReason: 'not_supported',
      sourceValue: 'error',
    })
  })

  it('counts dropped rule coverage by migration status', () => {
    const results: RuleSyncResult[] = [
      {
        status: 'synced',
        sourceRuleName: 'unicorn/prefer-node-protocol',
        normalizedRuleName: 'unicorn/prefer-node-protocol',
        rule: ['unicorn/prefer-node-protocol', 'error'],
      },
      {
        status: 'dropped',
        sourceRuleName: 'unicorn/a',
        normalizedRuleName: 'unicorn/a',
        dropReason: 'not_supported',
        sourceValue: 'error',
      },
      {
        status: 'dropped',
        sourceRuleName: 'unicorn/b',
        normalizedRuleName: 'unicorn/b',
        dropReason: 'not_supported',
        sourceValue: 'error',
      },
    ]
    const analyses: PresetAnalysis[] = [
      {
        presetId: 'unicorn',
        groups: [{ groupName: 'nelsonlaidev/unicorn/rules', files: '[GLOB_SRC]', results }],
      },
    ]
    const decisionKey = getRuleMigrationDecisionKey({
      presetId: 'unicorn',
      groupName: 'nelsonlaidev/unicorn/rules',
      sourceRuleName: 'unicorn/a',
    })
    const coveredDecisionKey = getRuleMigrationDecisionKey({
      presetId: 'unicorn',
      groupName: 'nelsonlaidev/unicorn/rules',
      sourceRuleName: 'unicorn/b',
    })

    expect(getDroppedRules(results)).toHaveLength(2)
    expect(
      buildReportGroups(analyses, {
        [decisionKey]: { status: 'not_implemented' },
        [coveredDecisionKey]: { status: 'replaced_by', replacement: 'unicorn/c' },
      }),
    ).toEqual([
      {
        preset: 'unicorn/nelsonlaidev/unicorn/rules',
        synced: 1,
        dropped: 2,
        covered: 2,
        classified: 2,
        unclassified: 0,
        coverage: '66.7%',
      },
    ])
  })

  it('uses stable context-aware decision keys', () => {
    expect(
      getRuleMigrationDecisionKey({
        presetId: 'typescript',
        groupName: 'nelsonlaidev/typescript/rules',
        sourceRuleName: '@typescript-eslint/no-namespace',
      }),
    ).toBe('typescript/nelsonlaidev/typescript/rules:@typescript-eslint/no-namespace')
  })
})
