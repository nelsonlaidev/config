import type { OxlintOverride } from 'oxlint'

export type PlaywrightConfig = {
  /**
   * A list of glob patterns for your Playwright test files.
   */
  files: OxlintOverride['files']
}
