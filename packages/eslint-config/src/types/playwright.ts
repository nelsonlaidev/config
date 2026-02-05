export type ExpectExpectOptions = {
  /**
   * See [official docs](https://github.com/mskelton/eslint-plugin-playwright/blob/main/docs/rules/expect-expect.md#assertfunctionnames) for more details.
   *
   * @default []
   */
  assertFunctionNames?: string[]
  /**
   * See [official docs](https://github.com/mskelton/eslint-plugin-playwright/blob/main/docs/rules/expect-expect.md#assertfunctionpatterns) for more details.
   *
   * @default []
   */
  assertFunctionPatterns?: string[]
}

export type MaxNestedDescribeOptions = {
  /**
   * See [official docs](https://github.com/mskelton/eslint-plugin-playwright/blob/main/docs/rules/max-nested-describe.md#max) for more details.
   *
   * @default 5
   */
  max?: number
}

export type MissingPlaywrightAwaitOptions = {
  /**
   * See [official docs](https://github.com/mskelton/eslint-plugin-playwright/blob/main/docs/rules/missing-playwright-await.md#options) for more details.
   *
   * @default []
   */
  customMatchers?: string[]
}

export type NoSkippedTestOptions = {
  /**
   * See [official docs](https://github.com/mskelton/eslint-plugin-playwright/blob/main/docs/rules/no-skipped-test.md#allowconditional) for more details.
   *
   * @default false
   */
  allowConditional?: boolean
}

export type ValidExpectOptions = {
  /**
   * See [official docs](https://github.com/mskelton/eslint-plugin-playwright/blob/main/docs/rules/valid-expect.md#minargs--maxargs) for more details.
   *
   * @default 1
   */
  minArgs?: number
  /**
   * See [official docs](https://github.com/mskelton/eslint-plugin-playwright/blob/main/docs/rules/valid-expect.md#minargs--maxargs) for more details.
   *
   * @default 2
   */
  maxArgs?: number
}

export type ValidTitleOptions = {
  /**
   * See [official docs](https://github.com/mskelton/eslint-plugin-playwright/blob/main/docs/rules/valid-title.md#ignorespaces) for more details.
   *
   * @default false
   */
  ignoreSpaces?: boolean
  /**
   * See [official docs](https://github.com/mskelton/eslint-plugin-playwright/blob/main/docs/rules/valid-title.md#ignoretypeofstepname) for more details.
   *
   * @default true
   */
  ignoreTypeOfStepName?: boolean
  /**
   * Official docs is not available for this option yet.
   *
   * @default false
   */
  ignoreTypeOfTestName?: boolean
  /**
   * See [official docs](https://github.com/mskelton/eslint-plugin-playwright/blob/main/docs/rules/valid-title.md#ignoretypeofdescribename) for more details.
   *
   * @default false
   */
  ignoreTypeOfDescribeName?: boolean
  /**
   * See [official docs](https://github.com/mskelton/eslint-plugin-playwright/blob/main/docs/rules/valid-title.md#disallowedwords) for more details.
   *
   * @default []
   */
  disallowedWords?: string[]
  /**
   * See [official docs](https://github.com/mskelton/eslint-plugin-playwright/blob/main/docs/rules/valid-title.md#mustmatch--mustnotmatch) for more details.
   *
   * @default {}
   */
  mustNotMatch?: Partial<Record<'describe' | 'test', string>> | string
  /**
   * See [official docs](https://github.com/mskelton/eslint-plugin-playwright/blob/main/docs/rules/valid-title.md#mustmatch--mustnotmatch) for more details.
   *
   * @default {}
   */
  mustMatch?: Partial<Record<'describe' | 'test', string>> | string
}

export type ValidTestTagsOptions = {
  /**
   * See [official docs](https://github.com/mskelton/eslint-plugin-playwright/blob/main/docs/rules/valid-test-tags.md#allowedtags) for more details.
   *
   * @default []
   */
  allowedTags?: Array<string | RegExp>
  /**
   * See [official docs](https://github.com/mskelton/eslint-plugin-playwright/blob/main/docs/rules/valid-test-tags.md#disallowedtags) for more details.
   *
   * @default []
   */
  disallowedTags?: Array<string | RegExp>
}

/**
 * Playwright configuration options.
 */
export type PlaywrightOptions = {
  /**
   * File paths or glob patterns for your Playwright test files.
   */
  files: Array<string | string[]>
  /**
   * Alias globals for Playwright's test runner functions.
   *
   * See [official docs](https://github.com/mskelton/eslint-plugin-playwright#aliased-playwright-globals) for more details.
   */
  globalAliases?: {
    test?: string[]
    expect?: string[]
  }
  /**
   * Custom messages used by Playwright plugin rules.
   *
   * See [official docs](https://github.com/mskelton/eslint-plugin-playwright#custom-messages) for more details.
   */
  messages?: Record<string, string | undefined>
  /**
   * See [official docs](https://github.com/mskelton/eslint-plugin-playwright/blob/main/docs/rules/expect-expect.md) for more details.
   */
  expectExpect?: ExpectExpectOptions
  /**
   * See [official docs](https://github.com/mskelton/eslint-plugin-playwright/blob/main/docs/rules/max-nested-describe.md) for more details.
   */
  maxNestedDescribe?: MaxNestedDescribeOptions
  /**
   * See [official docs](https://github.com/mskelton/eslint-plugin-playwright/blob/main/docs/rules/missing-playwright-await.md) for more details.
   */
  missingPlaywrightAwait?: MissingPlaywrightAwaitOptions
  /**
   * See [official docs](https://github.com/mskelton/eslint-plugin-playwright/blob/main/docs/rules/no-skipped-test.md) for more details.
   */
  noSkippedTest?: NoSkippedTestOptions
  /**
   * See [official docs](https://github.com/mskelton/eslint-plugin-playwright/blob/main/docs/rules/valid-expect.md) for more details.
   */
  validExpect?: ValidExpectOptions
  /**
   * See [official docs](https://github.com/mskelton/eslint-plugin-playwright/blob/main/docs/rules/valid-title.md) for more details.
   */
  validTitle?: ValidTitleOptions
  /**
   * See [official docs](https://github.com/mskelton/eslint-plugin-playwright/blob/main/docs/rules/valid-test-tags.md) for more details.
   */
  validTestTags?: ValidTestTagsOptions
}
