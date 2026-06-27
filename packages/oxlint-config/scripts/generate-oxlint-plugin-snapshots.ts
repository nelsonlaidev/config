import { readFileSync, writeFileSync } from 'node:fs'

import { interopDefault } from '../src/utils'
import { createGeneratedHeader, formatSourceForFile, resolveFromRoot } from './utils'

const TARGET_FILE_PATH = 'packages/oxlint-config/src/generated/plugin-snapshots.ts'
const GENERATED_HEADER = createGeneratedHeader('scripts/generate-oxlint-plugin-snapshots.ts', ['// cspell:disable'])

function renderConst(name: string, value: unknown, typeName: string) {
  return `export const ${name} = ${JSON.stringify(value, null, 2)} satisfies ${typeName}`
}

async function generateSnapshotContent() {
  const reactPlugin = await interopDefault(import('@eslint-react/eslint-plugin'))
  const reactHooksPlugin = await interopDefault(import('eslint-plugin-react-hooks'))
  const playwrightPlugin = await interopDefault(import('eslint-plugin-playwright'))
  const regexpPlugin = await interopDefault(import('eslint-plugin-regexp'))
  const sonarjsPlugin = await interopDefault(import('eslint-plugin-sonarjs'))
  const tailwindDefaults = await interopDefault(import('eslint-plugin-better-tailwindcss/defaults'))

  const source = [
    GENERATED_HEADER,
    '',
    "import type { DummyRuleMap } from 'oxlint'",
    '',
    'type BetterTailwindcssSelector = Record<string, unknown>',
    '',
    renderConst(
      'reactHooksRecommendedLatestRules',
      reactHooksPlugin.configs['recommended-latest'].rules,
      'DummyRuleMap',
    ),
    '',
    renderConst('reactAllRules', reactPlugin.configs.all.rules, 'DummyRuleMap'),
    '',
    renderConst(
      'reactDisableConflictReactHooksRules',
      reactPlugin.configs['disable-conflict-eslint-plugin-react-hooks'].rules,
      'DummyRuleMap',
    ),
    '',
    renderConst('playwrightRecommendedRules', playwrightPlugin.configs.recommended.rules, 'DummyRuleMap'),
    '',
    renderConst('regexpRecommendedRules', regexpPlugin.configs.recommended.rules, 'DummyRuleMap'),
    '',
    renderConst('sonarjsRecommendedRules', sonarjsPlugin.configs.recommended.rules, 'DummyRuleMap'),
    '',
    renderConst(
      'betterTailwindcssDefaultSelectors',
      tailwindDefaults.getDefaultSelectors(),
      'BetterTailwindcssSelector[]',
    ),
    '',
  ].join('\n')

  return formatSourceForFile(TARGET_FILE_PATH, source)
}

async function main() {
  const check = process.argv.includes('--check')
  const content = await generateSnapshotContent()
  const absoluteTargetPath = resolveFromRoot(TARGET_FILE_PATH)

  if (check) {
    const currentContent = readFileSync(absoluteTargetPath, 'utf-8')
    if (currentContent !== content) {
      console.error(`${TARGET_FILE_PATH} is out of sync. Run \`pnpm sync\` to update it.`)
      process.exitCode = 1
    }
    return
  }

  writeFileSync(absoluteTargetPath, content)
  console.log(`Updated ${TARGET_FILE_PATH}`)
}

await main()
