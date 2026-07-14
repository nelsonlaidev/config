import type { RuleConfig, RulesConfig, Severity, SeverityName } from '@eslint/core'
import type { ExternalPluginEntry } from 'oxlint'
import type { RuleMigrationDecision, RuleMigrationStatus } from './rule-migration-decisions'

import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { stdin as input, stdout as output } from 'node:process'
import { createInterface } from 'node:readline/promises'
import { pathToFileURL } from 'node:url'

import { x } from 'tinyexec'

import { ruleMigrationDecisions } from './rule-migration-decisions'
import { createGeneratedHeader, formatCode, resolveFromRoot, ROOT_DIR } from './utils'

type FlatConfig = { name?: string; rules?: RulesConfig }
type ConfigOutput = FlatConfig | FlatConfig[]
type ConfigModule = Record<string, (...args: unknown[]) => ConfigOutput>
export type RuleValue = RuleConfig
type RawRuleValue = { raw: string }
export type Rule = [string, RuleValue | RawRuleValue]
type SourceRule = [string, RuleValue]
type RuleValueOverride = RuleValue | RawRuleValue
type NamedExternalPluginEntry = Exclude<ExternalPluginEntry, string>
export type DropReason = 'not_supported' | 'typescript_compatible_eslint_off' | 'disabled_in_source'
export type RuleSyncResult =
  | {
      status: 'synced'
      sourceRuleName: string
      normalizedRuleName: string
      rule: Rule
    }
  | {
      status: 'dropped'
      sourceRuleName: string
      normalizedRuleName: string
      dropReason: DropReason
      sourceValue: RuleValue
    }
export type DroppedRuleSyncResult = Extract<RuleSyncResult, { status: 'dropped' }>
export type SyncedRuleSyncResult = Extract<RuleSyncResult, { status: 'synced' }>
type PresetOutput = {
  filePath: string
  content: string
}
export type PresetAnalysis = {
  presetId: string
  groups: RuleGroupAnalysis[]
}
export type RuleGroupAnalysis = {
  groupName: string
  files: string
  results: RuleSyncResult[]
}
export type ReportGroup = {
  preset: string
  synced: number
  dropped: number
  covered: number
  classified: number
  unclassified: number
  coverage: string
}
type OxlintRuleInfo = {
  scope: string
  value: string
  category: string
  type_aware: boolean
  fix: string
  default: boolean
  docs_url: string
}

const GENERATED_HEADER = createGeneratedHeader('scripts/sync-oxlint-eslint.ts')
const README_REPORT_START = '<!-- sync:report-start -->'
const README_REPORT_END = '<!-- sync:report-end -->'
const RULE_MIGRATION_DECISIONS_PATH = 'packages/oxlint-config/scripts/rule-migration-decisions.ts'
const RULE_MIGRATION_STATUSES: RuleMigrationStatus[] = [
  'not_implemented',
  'deprecated',
  'replaced_by',
  'intentionally_omitted',
]

// Source: https://github.com/oxc-project/oxc/blob/aa44c0bab776b1749640073ec61394cbb4015a06/crates/oxc_linter/src/utils/mod.rs#L44-L87
const TYPESCRIPT_COMPATIBLE_ESLINT_RULES = new Set([
  'class-methods-use-this',
  'default-param-last',
  'init-declarations',
  'max-params',
  'no-array-constructor',
  'no-dupe-class-members',
  'no-empty-function',
  'no-invalid-this',
  'no-loop-func',
  'no-loss-of-precision',
  'no-magic-numbers',
  'no-redeclare',
  'no-restricted-imports',
  'no-shadow',
  'no-unused-expressions',
  'no-unused-vars',
  'no-use-before-define',
  'no-useless-constructor',
])

type PresetGroupEntry = {
  group: string
  files?: string
  sourceExport?: string
  targetExport?: string
}

export type PresetEntry = {
  // Source: eslint config
  source: string
  sourceExport?: string
  sourceArgs?: unknown[]
  groups: PresetGroupEntry[]

  // Target: oxlint generated output
  target?: string
  targetExport?: string
  scope?: string
  jsPlugins?: NamedExternalPluginEntry[]

  // Options
  mergeOptions?: boolean
  overrides?: Record<string, RuleValueOverride>
  scopeRemap?: Record<string, string>
  stripOptions?: Record<string, string[]>
  unsupportedJsPluginRules?: string[]
}

const PRESETS: PresetEntry[] = [
  {
    source: 'command',
    jsPlugins: [{ name: 'command', specifier: 'eslint-plugin-command' }],
    groups: [{ group: 'nelsonlaidev/command/rules' }],
  },
  {
    source: 'de-morgan',
    sourceExport: 'deMorgan',
    jsPlugins: [{ name: 'de-morgan', specifier: 'eslint-plugin-de-morgan' }],
    groups: [{ group: 'nelsonlaidev/de-morgan/rules' }],
  },
  {
    source: 'javascript',
    target: 'eslint',
    targetExport: 'eslint',
    scope: 'eslint',
    groups: [{ group: 'nelsonlaidev/javascript/rules' }],
    overrides: {
      'eslint/no-unused-vars': ['error', { fix: { imports: 'safe-fix' } }],
    },
  },
  {
    source: 'import-sort',
    sourceExport: 'importSort',
    targetExport: 'importSort',
    jsPlugins: [{ name: 'import-sort', specifier: 'eslint-plugin-simple-import-sort' }],
    groups: [{ group: 'nelsonlaidev/import-sort/rules' }],
  },
  {
    source: 'import-x',
    sourceExport: 'importX',
    target: 'imports',
    targetExport: 'imports',
    scope: 'import',
    groups: [{ group: 'nelsonlaidev/import-x/rules' }],
  },
  {
    source: 'jsdoc',
    groups: [{ group: 'nelsonlaidev/jsdoc/rules' }],
  },
  {
    source: 'jsx-a11y',
    sourceExport: 'jsxA11y',
    groups: [{ group: 'nelsonlaidev/jsx-a11y/rules' }],
    stripOptions: {
      'jsx-a11y/control-has-associated-label': ['includeRoles'],
    },
  },
  {
    source: 'nelsonlaidev',
    jsPlugins: [{ name: 'nelsonlaidev', specifier: '@nelsonlaidev/eslint-plugin' }],
    groups: [{ group: 'nelsonlaidev/nelsonlaidev/rules' }],
  },
  {
    source: 'nextjs',
    scope: 'nextjs',
    mergeOptions: true,
    groups: [{ group: 'nelsonlaidev/nextjs/rules' }],
  },
  {
    source: 'node',
    scope: 'node',
    groups: [{ group: 'nelsonlaidev/node/rules' }],
  },
  {
    source: 'playwright',
    sourceArgs: [{}],
    mergeOptions: true,
    groups: [{ group: 'nelsonlaidev/playwright/rules' }],
    jsPlugins: [{ name: 'playwright', specifier: 'eslint-plugin-playwright' }],
  },
  {
    source: 'promise',
    groups: [{ group: 'nelsonlaidev/promise/rules' }],
  },
  {
    source: 'react',
    mergeOptions: true,
    jsPlugins: [
      { name: '@eslint-react', specifier: '@eslint-react/eslint-plugin' },
      { name: 'react-hooks-js', specifier: 'eslint-plugin-react-hooks' },
    ],
    scopeRemap: {
      'react-hooks': 'react-hooks-js',
    },
    unsupportedJsPluginRules: ['@eslint-react/no-leaked-conditional-rendering', '@eslint-react/no-unused-props'],
    groups: [{ group: 'nelsonlaidev/react/rules' }],
  },
  {
    source: 'regexp',
    jsPlugins: [{ name: 'regexp', specifier: 'eslint-plugin-regexp' }],
    groups: [{ group: 'nelsonlaidev/regexp/rules' }],
  },
  {
    source: 'sonarjs',
    jsPlugins: [{ name: 'sonarjs', specifier: 'eslint-plugin-sonarjs' }],
    groups: [{ group: 'nelsonlaidev/sonarjs/rules' }],
  },
  {
    source: 'stylistic',
    jsPlugins: [{ name: '@stylistic', specifier: '@stylistic/eslint-plugin' }],
    groups: [{ group: 'nelsonlaidev/stylistic/rules' }],
  },
  {
    source: 'tailwindcss',
    sourceArgs: [{}],
    mergeOptions: true,
    groups: [{ group: 'nelsonlaidev/tailwindcss/rules' }],
    jsPlugins: [{ name: 'better-tailwindcss', specifier: 'eslint-plugin-better-tailwindcss' }],
  },
  {
    source: 'typescript',
    scope: 'typescript',
    groups: [
      { group: 'nelsonlaidev/typescript/rules' },
      {
        group: 'nelsonlaidev/typescript/declarations',
        files: `['**/*.d.ts']`,
        sourceExport: 'typescriptDeclarations',
      },
    ],
  },
  {
    source: 'unicorn',
    groups: [{ group: 'nelsonlaidev/unicorn/rules' }],
  },
  {
    source: 'vitest',
    sourceArgs: [{}],
    mergeOptions: true,
    groups: [{ group: 'nelsonlaidev/vitest/rules' }],
  },
  {
    source: 'zod',
    jsPlugins: [{ name: 'import-zod', specifier: 'eslint-plugin-import-zod' }],
    groups: [{ group: 'nelsonlaidev/zod/rules' }],
  },
]

let oxlintLookup: Promise<Set<string>> | undefined

async function getOxlintLookup(): Promise<Set<string>> {
  oxlintLookup ??= createOxlintLookup()
  return oxlintLookup
}

async function createOxlintLookup(): Promise<Set<string>> {
  const rules = await getOxlintRules()
  return new Set(rules.map((rule) => `${rule.scope.replaceAll('_', '-')}/${rule.value}`))
}

async function main() {
  const check = process.argv.includes('--check')
  const report = process.argv.includes('--report')
  const write = process.argv.includes('--write')
  const classify = process.argv.includes('--classify')

  if (classify) {
    await classifyDroppedRules()
    return
  }

  if (report) {
    await reportSyncStatus({ write })
    return
  }

  const presetOutputs = await Promise.all(PRESETS.map(async (preset) => generatePresetOutput(preset)))

  if (check) {
    const staleFilePaths = presetOutputs
      .filter(({ filePath, content }) => readFileSync(filePath, 'utf-8') !== content)
      .map(({ filePath }) => filePath)

    if (staleFilePaths.length === 0) {
      console.log('Oxlint preset files are in sync.')
      return
    }

    console.error('Oxlint preset files are out of sync:')

    for (const filePath of staleFilePaths) {
      console.error(`- ${path.relative(ROOT_DIR, filePath)}`)
    }

    process.exitCode = 1
    return
  }

  for (const output of presetOutputs) {
    writePresetFile(output)
  }

  const configsDir = resolveFromRoot('packages/oxlint-config/src/configs')
  await x('oxlint', ['--fix', configsDir])
  console.log('Lint fix applied to generated configs.')
}

if (isMainModule()) {
  await main()
}

function isMainModule() {
  const scriptPath = process.argv[1]
  return scriptPath ? import.meta.url === pathToFileURL(scriptPath).href : false
}

async function generatePresetOutput(preset: PresetEntry): Promise<PresetOutput> {
  const source = await generatePreset(createGeneratePresetOptions(preset))
  const fileName = `${preset.target ?? preset.source}.ts`
  const filePath = resolveFromRoot(`packages/oxlint-config/src/configs/${fileName}`)
  const fileContent = source.join('\n')

  return {
    filePath,
    content: await formatCode(fileName, fileContent),
  }
}

function writePresetFile({ filePath, content }: PresetOutput) {
  writeFileSync(filePath, content, { encoding: 'utf-8' })
  console.log(`Preset file written: ${filePath}`)
}

export type GeneratePresetOptions = {
  source: string
  sourceExport: string
  sourceArgs?: unknown[]
  scope: string
  targetExport: string
  groups: PresetGroupEntry[]
  jsPlugins?: NamedExternalPluginEntry[]
  mergeOptions?: boolean
  overrides?: Record<string, RuleValueOverride>
  scopeRemap?: Record<string, string>
  stripOptions?: Record<string, string[]>
  unsupportedJsPluginRules?: string[]
}

function createGeneratePresetOptions(preset: PresetEntry): GeneratePresetOptions {
  const sourceExport = preset.sourceExport ?? preset.source
  const scope = preset.scope ?? preset.source

  return {
    source: preset.source,
    sourceExport,
    sourceArgs: preset.sourceArgs,
    scope,
    targetExport: preset.targetExport ?? sourceExport,
    groups: preset.groups,
    jsPlugins: preset.jsPlugins,
    mergeOptions: preset.mergeOptions,
    overrides: preset.overrides,
    scopeRemap: preset.scopeRemap,
    stripOptions: preset.stripOptions,
    unsupportedJsPluginRules: preset.unsupportedJsPluginRules,
  }
}

async function generatePreset(options: GeneratePresetOptions) {
  const lookup = await getOxlintLookup()

  const groups = await Promise.all(
    options.groups.map(async (group) => ({
      files: group.files ?? '[GLOB_SRC]',
      rules: getSyncedRules(await getRuleSyncResults(options, lookup, group)),
      jsPlugins: options.jsPlugins,
      targetExport: group.targetExport ?? group.sourceExport ?? options.targetExport,
    })),
  )

  const typeImports = ["import type { OxlintOverride } from 'oxlint'"]
  const valueImports = [
    options.groups.some((group) => !group.files) ? "import { GLOB_SRC } from '../globs'" : null,
    options.mergeOptions ? "import { mergeConfig } from '../utils'" : null,
  ].filter((s): s is string => s !== null)
  const imports = valueImports.length > 0 ? [...typeImports, '', ...valueImports] : typeImports

  const sourceLines = [
    GENERATED_HEADER,
    '',
    ...imports,
    '',
    ...groups.flatMap((group, index) => [
      ...buildPresetExport(group, options.scope, options.mergeOptions),
      ...(index === groups.length - 1 ? [] : ['']),
    ]),
  ]

  return sourceLines
}

function buildPresetExport(
  group: {
    files: string
    rules: Rule[]
    jsPlugins?: NamedExternalPluginEntry[]
    targetExport: string
  },
  scope: string,
  mergeOptions = false,
): string[] {
  const objectLines = buildOverrideObject(group.files, scope, group.rules, group.jsPlugins)

  if (!mergeOptions) {
    return [`export const ${group.targetExport} = (): OxlintOverride => ({`, ...objectLines, '})']
  }

  return [
    `export const ${group.targetExport} = (options: Partial<OxlintOverride> = {}): OxlintOverride => {`,
    '  const base: OxlintOverride = {',
    ...objectLines.map((line) => `  ${line}`),
    '  }',
    '',
    '  return mergeConfig(base, options)',
    '}',
  ]
}

export async function generatePresetAnalysis(preset: PresetEntry): Promise<PresetAnalysis> {
  const options = createGeneratePresetOptions(preset)
  const lookup = await getOxlintLookup()
  const groups = await Promise.all(
    options.groups.map(async (group) => ({
      groupName: group.group,
      files: group.files ?? '[GLOB_SRC]',
      results: await getRuleSyncResults(options, lookup, group),
    })),
  )

  return {
    presetId: getPresetId(preset),
    groups,
  }
}

function getPresetId(preset: PresetEntry) {
  return preset.target ?? preset.source
}

export async function getRuleSyncResults(options: GeneratePresetOptions, lookup: Set<string>, group: PresetGroupEntry) {
  const rules = await getSourceRules(
    options.source,
    group.sourceExport ?? options.sourceExport,
    options.sourceArgs,
    getSourceConfigName(group.group),
  )
  const jsPluginScopeMap = getJsPluginScopeMap(options.jsPlugins, options.scopeRemap)
  const [firstJsPlugin] = options.jsPlugins ?? []
  const defaultJsPluginScope = options.jsPlugins?.length === 1 ? firstJsPlugin?.name : undefined
  const unsupportedJsPluginRules = new Set(options.unsupportedJsPluginRules)

  return rules
    .map((rule) => stripRuleOptions(rule, options.stripOptions))
    .map((rule) =>
      normalizeRule(
        rule,
        lookup,
        options.scope,
        options.overrides,
        (options.jsPlugins?.length ?? 0) > 0,
        jsPluginScopeMap,
        defaultJsPluginScope,
        unsupportedJsPluginRules,
      ),
    )
    .toSorted(
      (a, b) =>
        a.normalizedRuleName.localeCompare(b.normalizedRuleName) || a.sourceRuleName.localeCompare(b.sourceRuleName),
    )
}

function getSourceConfigName(group: string) {
  return group.endsWith('/rules') ? group.slice(0, -'/rules'.length) : group
}

export function getSyncedRules(results: RuleSyncResult[]): Rule[] {
  return results
    .filter((result): result is SyncedRuleSyncResult => result.status === 'synced')
    .map((result) => result.rule)
    .toSorted(([a], [b]) => a.localeCompare(b))
}

export function getDroppedRules(results: RuleSyncResult[]): DroppedRuleSyncResult[] {
  return results.filter((result): result is DroppedRuleSyncResult => result.status === 'dropped')
}

function buildOverrideObject(
  files: string,
  scope: string,
  rules: Rule[],
  jsPlugins?: NamedExternalPluginEntry[],
): string[] {
  const plugins = getOverridePlugins(scope, rules)
  const hasJsPlugins = (jsPlugins?.length ?? 0) > 0

  return [
    `  files: ${files},`,
    hasJsPlugins ? `  jsPlugins: ${JSON.stringify(jsPlugins ?? [])},` : `  plugins: ${JSON.stringify(plugins)},`,
    '  rules: {',
    ...rules.map(([ruleName, ruleValue]) => {
      return `    '${ruleName}': ${renderRuleValue(ruleValue)},`
    }),
    '  },',
  ]
}

function getOverridePlugins(scope: string, rules: Rule[]): string[] {
  const plugins = new Set([scope])

  for (const [ruleName] of rules) {
    const slashIndex = ruleName.indexOf('/')
    if (slashIndex > 0) {
      plugins.add(ruleName.slice(0, slashIndex))
    }
  }

  return [...plugins]
}

async function getSourceRules(
  source: string,
  sourceExport: string,
  sourceArgs: unknown[] | undefined,
  group: string,
): Promise<SourceRule[]> {
  const moduleUrl = pathToFileURL(resolveFromRoot(`packages/eslint-config/src/configs/${source}`)).href
  const configModule = (await import(moduleUrl)) as ConfigModule

  if (!configModule[sourceExport]) {
    throw new Error(`Config module for "${source}" does not export a function named "${sourceExport}".`)
  }

  const config = configModule[sourceExport](...(sourceArgs ?? []))
  const configs = Array.isArray(config) ? config : [config]
  const entry = configs.find((cfg) => cfg.name === group)

  if (!entry) {
    throw new Error(`Config group "${group}" not found in "${source}".`)
  }

  return Object.entries(entry.rules ?? {})
}

function stripRuleOptions(rule: SourceRule, stripOptions?: Record<string, string[]>): SourceRule {
  if (!stripOptions) return rule

  const [ruleName, ruleValue] = rule
  const keysToStrip = stripOptions[ruleName]

  if (!keysToStrip || keysToStrip.length === 0) return rule
  if (!Array.isArray(ruleValue)) return rule

  const [severity, ...options] = ruleValue
  const stripSet = new Set(keysToStrip)
  const newOptions = options.map((option) => {
    if (option && typeof option === 'object' && !Array.isArray(option)) {
      return Object.fromEntries(Object.entries(option).filter(([key]) => !stripSet.has(key)))
    }
    return option
  })

  return [ruleName, [severity, ...newOptions]]
}

export function normalizeRule(
  rule: SourceRule,
  lookup: Set<string>,
  scope: string,
  overrides?: Record<string, RuleValueOverride>,
  allowJsPluginRule = false,
  jsPluginScopeMap = new Map<string, string>(),
  defaultJsPluginScope?: string,
  unsupportedJsPluginRules = new Set<string>(),
): RuleSyncResult {
  const [ruleName, ruleValue] = rule
  const normalizedName = normalizeRuleName(ruleName, scope, jsPluginScopeMap, defaultJsPluginScope)

  if (shouldDropTypeScriptCompatibleESLintRule(scope, normalizedName, ruleValue)) {
    return {
      status: 'dropped',
      sourceRuleName: ruleName,
      normalizedRuleName: normalizedName,
      dropReason: 'typescript_compatible_eslint_off',
      sourceValue: ruleValue,
    }
  }

  if (allowJsPluginRule && unsupportedJsPluginRules.has(ruleName)) {
    return {
      status: 'dropped',
      sourceRuleName: ruleName,
      normalizedRuleName: normalizedName,
      dropReason: 'not_supported',
      sourceValue: ruleValue,
    }
  }

  if (!allowJsPluginRule && !lookup.has(normalizedName)) {
    const dropReason = isRuleOff(ruleValue) ? 'disabled_in_source' : 'not_supported'

    if (process.env.OXLINT_SYNC_DEBUG) {
      console.warn(`Rule not supported in Oxlint: ${normalizedName}. Dropping it.`)
    }
    return {
      status: 'dropped',
      sourceRuleName: ruleName,
      normalizedRuleName: normalizedName,
      dropReason,
      sourceValue: ruleValue,
    }
  }

  return {
    status: 'synced',
    sourceRuleName: ruleName,
    normalizedRuleName: normalizedName,
    rule: [normalizedName, overrides?.[normalizedName] ?? normalizeRuleValue(ruleValue)],
  }
}

async function reportSyncStatus({ write }: { write: boolean }) {
  const analyses = await Promise.all(PRESETS.map(async (preset) => generatePresetAnalysis(preset)))
  const decisions = getRuleMigrationDecisions()
  const groups = buildReportGroups(analyses, decisions)

  printReportGroups(groups)

  if (write) {
    await updateReadmeReport(analyses, decisions)
  }
}

function getRuleMigrationDecisions(): Readonly<Record<string, RuleMigrationDecision>> {
  return ruleMigrationDecisions as Readonly<Record<string, RuleMigrationDecision>>
}

export function getRuleMigrationDecisionKey({
  presetId,
  groupName,
  sourceRuleName,
}: {
  presetId: string
  groupName: string
  sourceRuleName: string
}) {
  return `${presetId}/${groupName}:${sourceRuleName}`
}

export function buildReportGroups(
  analyses: PresetAnalysis[],
  decisions: Readonly<Record<string, RuleMigrationDecision>>,
): ReportGroup[] {
  return analyses.flatMap((analysis) =>
    analysis.groups.map((group) => {
      const synced = getSyncedRules(group.results).length
      const dropped = getDroppedRules(group.results)
      const droppedDecisions = dropped.map((rule) =>
        getMigrationDecision(decisions, analysis.presetId, group.groupName, rule.sourceRuleName),
      )
      const classified = droppedDecisions.filter((decision) => decision !== undefined).length
      const coveredDropped = droppedDecisions.filter((decision) => isCoveredDroppedDecision(decision)).length
      const unclassified = dropped.length - classified

      return {
        preset: `${analysis.presetId}/${group.groupName}`,
        synced,
        dropped: dropped.length,
        covered: synced + coveredDropped,
        classified,
        unclassified,
        coverage: formatCoverage(synced + coveredDropped, synced + dropped.length),
      }
    }),
  )
}

function getMigrationDecision(
  decisions: Readonly<Record<string, RuleMigrationDecision>>,
  presetId: string,
  groupName: string,
  sourceRuleName: string,
) {
  return decisions[getRuleMigrationDecisionKey({ presetId, groupName, sourceRuleName })]
}

function isCoveredDroppedDecision(decision: RuleMigrationDecision | undefined) {
  return decision !== undefined && decision.status !== 'not_implemented'
}

function formatCoverage(covered: number, total: number) {
  return total > 0 ? `${((covered / total) * 100).toFixed(1)}%` : '100.0%'
}

function printReportGroups(groups: ReportGroup[]) {
  for (const group of groups) {
    console.log(
      `${group.preset}: ${group.synced} synced, ${group.dropped} dropped, ${group.classified} classified, ${group.unclassified} unclassified, ${group.coverage} coverage`,
    )
  }

  const totals = { synced: 0, dropped: 0, covered: 0, classified: 0, unclassified: 0 }

  for (const group of groups) {
    totals.synced += group.synced
    totals.dropped += group.dropped
    totals.covered += group.covered
    totals.classified += group.classified
    totals.unclassified += group.unclassified
  }

  console.log(
    `\nTotal: ${totals.synced} synced, ${totals.dropped} dropped, ${totals.classified} classified, ${totals.unclassified} unclassified, ${formatCoverage(totals.covered, totals.synced + totals.dropped)} coverage`,
  )
}

async function updateReadmeReport(
  analyses: PresetAnalysis[],
  decisions: Readonly<Record<string, RuleMigrationDecision>>,
) {
  const readmePath = resolveFromRoot('packages/oxlint-config/README.md')
  const current = readFileSync(readmePath, 'utf-8')
  const startIndex = current.indexOf(README_REPORT_START)
  const endIndex = current.indexOf(README_REPORT_END)

  if (startIndex === -1 || endIndex === -1) {
    throw new Error(`Missing report markers (${README_REPORT_START} / ${README_REPORT_END}) in ${readmePath}`)
  }

  const content = [README_REPORT_START, '', renderReadmeReport(analyses, decisions), '', README_REPORT_END].join('\n')
  const updated = current.slice(0, startIndex) + content + current.slice(endIndex + README_REPORT_END.length)
  writeFileSync(readmePath, await formatCode('README.md', updated))
  console.log(`Updated ${path.relative(ROOT_DIR, readmePath)}`)
}

function renderReadmeReport(analyses: PresetAnalysis[], decisions: Readonly<Record<string, RuleMigrationDecision>>) {
  const groups = buildReportGroups(analyses, decisions)
  const droppedRules = getDroppedRuleReportItems(analyses, decisions)
  const unclassifiedRules = droppedRules.filter((rule) => !rule.decision)
  const summaryTable = [
    '| Preset | Synced | Dropped | Classified | Unclassified | Coverage |',
    '| --- | ---: | ---: | ---: | ---: | ---: |',
    ...groups.map(
      (group) =>
        `| \`${group.preset}\` | ${group.synced} | ${group.dropped} | ${group.classified} | ${group.unclassified} | ${group.coverage} |`,
    ),
  ].join('\n')
  const unclassifiedTable =
    unclassifiedRules.length === 0
      ? 'No unclassified dropped rules.'
      : [
          '| Preset | Rule | Normalized | Drop Reason |',
          '| --- | --- | --- | --- |',
          ...unclassifiedRules.map(
            (rule) =>
              `| \`${rule.preset}\` | \`${rule.sourceRuleName}\` | \`${rule.normalizedRuleName}\` | \`${rule.dropReason}\` |`,
          ),
        ].join('\n')

  return ['### Sync Summary', '', summaryTable, '', '### Unclassified Dropped Rules', '', unclassifiedTable].join('\n')
}

type DroppedRuleReportItem = {
  decisionKey: string
  preset: string
  sourceRuleName: string
  normalizedRuleName: string
  dropReason: DropReason
  decision?: RuleMigrationDecision
}

function getDroppedRuleReportItems(
  analyses: PresetAnalysis[],
  decisions: Readonly<Record<string, RuleMigrationDecision>>,
): DroppedRuleReportItem[] {
  return analyses
    .flatMap((analysis) =>
      analysis.groups.flatMap((group) =>
        getDroppedRules(group.results).map((rule) => {
          const decisionKey = getRuleMigrationDecisionKey({
            presetId: analysis.presetId,
            groupName: group.groupName,
            sourceRuleName: rule.sourceRuleName,
          })

          const decision = decisions[decisionKey]

          return {
            decisionKey,
            preset: `${analysis.presetId}/${group.groupName}`,
            sourceRuleName: rule.sourceRuleName,
            normalizedRuleName: rule.normalizedRuleName,
            dropReason: rule.dropReason,
            ...(decision ? { decision } : {}),
          }
        }),
      ),
    )
    .toSorted(
      (a, b) =>
        a.preset.localeCompare(b.preset) ||
        a.sourceRuleName.localeCompare(b.sourceRuleName) ||
        a.normalizedRuleName.localeCompare(b.normalizedRuleName),
    )
}

async function classifyDroppedRules() {
  const analyses = await Promise.all(PRESETS.map(async (preset) => generatePresetAnalysis(preset)))
  const decisions = getRuleMigrationDecisions()
  const missing = getDroppedRuleReportItems(analyses, decisions).filter((rule) => !rule.decision)

  if (missing.length === 0) {
    console.log('All dropped rules are classified.')
    return
  }

  const nextDecisions: Record<string, RuleMigrationDecision> = { ...decisions }
  const rl = createInterface({ input, output })

  try {
    await promptForMissingDecisions(rl, missing, nextDecisions)
  } finally {
    rl.close()
  }

  await writeRuleMigrationDecisionManifest(nextDecisions)
  console.log(`Updated ${RULE_MIGRATION_DECISIONS_PATH}`)
}

async function promptForMissingDecisions(
  rl: ReturnType<typeof createInterface>,
  missing: DroppedRuleReportItem[],
  nextDecisions: Record<string, RuleMigrationDecision>,
  index = 0,
): Promise<void> {
  const rule = missing[index]

  if (!rule) {
    return
  }

  console.log(`\n[${index + 1}/${missing.length}] ${rule.preset}`)
  console.log(`Rule: ${rule.sourceRuleName}`)
  console.log(`Normalized: ${rule.normalizedRuleName}`)
  console.log(`Drop reason: ${rule.dropReason}`)

  const status = await promptStatus(rl)
  const replacement = status === 'replaced_by' ? await promptRequired(rl, 'Replacement') : undefined
  const noteAnswer = await rl.question('Note (optional): ')
  const note = noteAnswer.trim()

  nextDecisions[rule.decisionKey] = createRuleMigrationDecision({ status, replacement, note })

  await promptForMissingDecisions(rl, missing, nextDecisions, index + 1)
}

async function promptStatus(rl: ReturnType<typeof createInterface>): Promise<RuleMigrationStatus> {
  const choices = RULE_MIGRATION_STATUSES.map((status, index) => `${index + 1}. ${status}`).join('\n')

  const answerValue = await rl.question(`Status:\n${choices}\n> `)
  const answer = answerValue.trim()
  const index = Number(answer)
  const status = Number.isInteger(index)
    ? RULE_MIGRATION_STATUSES[index - 1]
    : RULE_MIGRATION_STATUSES.find((s) => s === answer)

  if (status) {
    return status
  }

  console.log('Invalid status. Enter a number or status name.')
  return promptStatus(rl)
}

async function promptRequired(rl: ReturnType<typeof createInterface>, label: string) {
  const answerValue = await rl.question(`${label}: `)
  const answer = answerValue.trim()

  if (answer.length > 0) {
    return answer
  }

  console.log(`${label} is required.`)
  return promptRequired(rl, label)
}

function createRuleMigrationDecision({
  status,
  replacement,
  note,
}: {
  status: RuleMigrationStatus
  replacement?: string
  note?: string
}): RuleMigrationDecision {
  return {
    status,
    ...(replacement ? { replacement } : {}),
    ...(note ? { note } : {}),
  }
}

async function writeRuleMigrationDecisionManifest(decisions: Record<string, RuleMigrationDecision>) {
  const sortedDecisions = Object.fromEntries(Object.entries(decisions).toSorted(([a], [b]) => a.localeCompare(b)))
  const source = [
    'export type RuleMigrationStatus =',
    ...RULE_MIGRATION_STATUSES.map((status) => `  | '${status}'`),
    '',
    'export type RuleMigrationDecision = {',
    '  status: RuleMigrationStatus',
    '  replacement?: string',
    '  note?: string',
    '}',
    '',
    `export const ruleMigrationDecisions = ${JSON.stringify(sortedDecisions, null, 2)} satisfies Record<string, RuleMigrationDecision>`,
    '',
  ].join('\n')
  const filePath = resolveFromRoot(RULE_MIGRATION_DECISIONS_PATH)
  writeFileSync(filePath, await formatCode('rule-migration-decisions.ts', source))
}

function shouldDropTypeScriptCompatibleESLintRule(
  scope: string,
  normalizedName: string,
  ruleValue: RuleValue,
): boolean {
  if (scope !== 'typescript' || !isRuleOff(ruleValue)) {
    return false
  }

  const eslintPrefix = 'eslint/'
  if (!normalizedName.startsWith(eslintPrefix)) {
    return false
  }

  return TYPESCRIPT_COMPATIBLE_ESLINT_RULES.has(normalizedName.slice(eslintPrefix.length))
}

function normalizeRuleName(
  ruleName: string,
  scope: string,
  jsPluginScopeMap: Map<string, string>,
  defaultJsPluginScope?: string,
): string {
  if (isESLintRule(ruleName)) {
    return `eslint/${ruleName}`
  }

  const lastSlash = ruleName.lastIndexOf('/')
  const ruleScope = ruleName.slice(0, lastSlash)
  const ruleValue = ruleName.slice(lastSlash + 1)
  const normalizedScope = jsPluginScopeMap.get(ruleScope) ?? defaultJsPluginScope ?? scope
  return `${normalizedScope}/${ruleValue}`
}

function getJsPluginScopeMap(
  jsPlugins: NamedExternalPluginEntry[] | undefined,
  scopeRemap: Record<string, string> | undefined,
): Map<string, string> {
  const scopeMap = new Map<string, string>()

  for (const entry of jsPlugins ?? []) {
    scopeMap.set(entry.name, entry.name)
  }

  for (const [sourceScope, targetScope] of Object.entries(scopeRemap ?? {})) {
    scopeMap.set(sourceScope, targetScope)
  }

  return scopeMap
}

function isRuleOff(value: RuleValue): boolean {
  if (Array.isArray(value)) {
    const [severity] = value
    return isSeverityOff(severity)
  }

  return isSeverityOff(value)
}

function normalizeRuleValue(value: RuleValue): RuleValue {
  if (Array.isArray(value)) {
    const [severity, ...options] = value
    return [normalizeSeverity(severity), ...options]
  }

  return normalizeSeverity(value)
}

function renderRuleValue(ruleValue: RuleValue | RawRuleValue): string {
  if (isRawRuleValue(ruleValue)) {
    return ruleValue.raw
  }

  return JSON.stringify(ruleValue, null, 2)
}

function isRawRuleValue(ruleValue: RuleValue | RawRuleValue): ruleValue is RawRuleValue {
  return typeof ruleValue === 'object' && 'raw' in ruleValue
}

function isSeverityOff(severity: Severity): boolean {
  return severity === 0 || severity === 'off'
}

function normalizeSeverity(severity: Severity): SeverityName {
  // Oxlint supports "off", "warn", and "error", but we intentionally collapse
  // into just "off" and "error" — any warn-level rule is promoted to error.
  if (typeof severity === 'number') {
    if (severity === 0) return 'off'
    return 'error'
  }

  if (severity === 'off') return 'off'
  return 'error'
}

function isESLintRule(ruleName: string): boolean {
  return !ruleName.includes('/')
}

async function getOxlintRules() {
  try {
    const rules = await x('oxlint', ['--rules', '--format=json'])
    return JSON.parse(rules.stdout) as OxlintRuleInfo[]
  } catch (error) {
    console.error('Error fetching Oxlint rules:', error)
    return []
  }
}
