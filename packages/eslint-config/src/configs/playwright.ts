import type { FlatConfig, PlaywrightOptions } from '../types'

import globals from 'globals'

import {
  EXPECT_EXPECT_DEFAULT_OPTIONS,
  MAX_NESTED_DESCRIBE_DEFAULT_OPTIONS,
  MISSING_PLAYWRIGHT_AWAIT_DEFAULT_OPTIONS,
  NO_SKIPPED_TEST_DEFAULT_OPTIONS,
  VALID_EXPECT_DEFAULT_OPTIONS,
  VALID_TEST_TAGS_DEFAULT_OPTIONS,
  VALID_TITLE_DEFAULT_OPTIONS,
} from '../defaults'
import { playwrightPlugin } from '../plugins'

export const playwright = (options: PlaywrightOptions): FlatConfig[] => [
  {
    name: 'nelsonlaidev/playwright/setup',
    languageOptions: {
      globals: globals['shared-node-browser'],
    },
  },
  {
    name: 'nelsonlaidev/playwright/rules',
    files: options.files,
    plugins: {
      playwright: playwrightPlugin,
    },
    settings: {
      playwright: {
        globalAliases: options.globalAliases,
        messages: options.messages,
      },
    },
    rules: {
      ...playwrightPlugin.configs.recommended.rules,
      'playwright/expect-expect': [
        'error',
        {
          ...EXPECT_EXPECT_DEFAULT_OPTIONS,
          ...options.expectExpect,
          assertFunctionNames: [...(options.expectExpect?.assertFunctionNames ?? [])],
          assertFunctionPatterns: [...(options.expectExpect?.assertFunctionPatterns ?? [])],
        },
      ],
      'playwright/max-nested-describe': [
        'error',
        {
          ...MAX_NESTED_DESCRIBE_DEFAULT_OPTIONS,
          ...options.maxNestedDescribe,
        },
      ],
      'playwright/missing-playwright-await': [
        'error',
        {
          ...MISSING_PLAYWRIGHT_AWAIT_DEFAULT_OPTIONS,
          ...options.missingPlaywrightAwait,
          customMatchers: [...(options.missingPlaywrightAwait?.customMatchers ?? [])],
        },
      ],
      'playwright/no-skipped-test': [
        'error',
        {
          ...NO_SKIPPED_TEST_DEFAULT_OPTIONS,
          ...options.noSkippedTest,
        },
      ],
      'playwright/valid-expect': [
        'error',
        {
          ...VALID_EXPECT_DEFAULT_OPTIONS,
          ...options.validExpect,
        },
      ],
      'playwright/valid-title': [
        'error',
        {
          ...VALID_TITLE_DEFAULT_OPTIONS,
          ...options.validTitle,
          disallowedWords: [...(options.validTitle?.disallowedWords ?? [])],
        },
      ],
      'playwright/valid-test-tags': [
        'error',
        {
          ...VALID_TEST_TAGS_DEFAULT_OPTIONS,
          ...options.validTestTags,
          allowedTags: [...(options.validTestTags?.allowedTags ?? [])],
          disallowedTags: [...(options.validTestTags?.disallowedTags ?? [])],
        },
      ],

      'playwright/no-commented-out-tests': 'error',
      'playwright/no-duplicate-hooks': 'error',
      'playwright/no-get-by-title': 'error',
      'playwright/no-nth-methods': 'error',
      'playwright/no-raw-locators': 'error',
      'playwright/no-restricted-locators': 'error',
      'playwright/no-restricted-matchers': 'error',
      'playwright/no-slowed-test': 'error',
      'playwright/prefer-comparison-matcher': 'error',
      'playwright/prefer-equality-matcher': 'error',
      'playwright/prefer-hooks-in-order': 'error',
      'playwright/prefer-hooks-on-top': 'error',
      'playwright/prefer-locator': 'error',
      'playwright/prefer-lowercase-title': 'error',
      'playwright/prefer-native-locators': 'error',
      'playwright/prefer-strict-equal': 'error',
      'playwright/prefer-to-be': 'error',
      'playwright/prefer-to-contain': 'error',
      'playwright/prefer-to-have-count': 'error',
      'playwright/prefer-to-have-length': 'error',
      'playwright/require-hook': 'error',
      'playwright/require-to-throw-message': 'error',
      'playwright/require-top-level-describe': 'error',
    },
  },
]
