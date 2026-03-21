import type { OxlintOverride } from 'oxlint'

export type VitestConfig = {
  /**
   * A list of glob patterns for your Vitest test files.
   */
  files: OxlintOverride['files']
}
