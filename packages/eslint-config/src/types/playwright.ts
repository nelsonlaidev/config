/**
 * Playwright configuration options.
 */
export type PlaywrightOptions = {
  /**
   * File paths or glob patterns for your Playwright test files.
   */
  files: Array<string | string[]>
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
