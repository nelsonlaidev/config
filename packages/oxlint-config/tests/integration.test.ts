import { execSync } from 'node:child_process'

import { describe, expect, it } from 'vitest'

type OxlintResult = {
  diagnostics: Array<{
    message: string
    code: string
    severity: string
    causes: unknown[]
    url: string
    help: string
    filename: string
    labels: unknown[]
    related: unknown[]
  }>
  number_of_files: number
  number_of_rules: number
  threads_count: number
  start_time: number
}

function runOxlint(file: string) {
  const command = `pnpm exec oxlint --config tests/fixtures/integration/config.ts tests/fixtures/integration/${file} --format json`

  try {
    const result = execSync(command, {
      encoding: 'utf-8',
      stdio: 'pipe',
    })

    return JSON.parse(result) as OxlintResult
  } catch (error) {
    const execError = error as { stderr?: string; stdout?: string }

    if (execError.stdout) {
      return JSON.parse(execError.stdout) as OxlintResult
    }
    throw error
  }
}

describe('oxlint integration', () => {
  it('loads the built config and lints a clean TypeScript file', () => {
    const result = runOxlint('valid.ts')
    expect(result.diagnostics).toHaveLength(0)
  })

  it('reports diagnostics from the default config', () => {
    const result = runOxlint('debugger.ts')
    expect(result.diagnostics[0]?.code).toBe('eslint(no-debugger)')
  })
})
