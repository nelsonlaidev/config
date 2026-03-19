import type { OxlintOverride } from 'oxlint'

export type PlaywrightConfig = {
  /**
   * A list of glob patterns for your Playwright test files.
   */
  files: OxlintOverride['files']
  /**
   * See [official docs](https://github.com/mskelton/eslint-plugin-playwright/blob/main/docs/rules/expect-expect.md#assertfunctionnames) for more details.
   * @default []
   */
  assertFunctionNames?: string[]
  /**
   * See [official docs](https://github.com/mskelton/eslint-plugin-playwright/blob/main/docs/rules/expect-expect.md#assertfunctionpatterns) for more details.
   * @default []
   */
  assertFunctionPatterns?: string[]
}
