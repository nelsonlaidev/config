import type {
  CanonicalClassesOptions,
  ConsistentClassOrderOptions,
  ExpectExpectOptions,
  MaxNestedDescribeOptions,
  MissingPlaywrightAwaitOptions,
  NoRestrictedClassesOptions,
  NoSkippedTestOptions,
  NoUnknownClassesOptions,
  NoUnnecessaryWhitespaceOptions,
  ValidExpectOptions,
  ValidTestTagsOptions,
  ValidTitleOptions
} from './types'

export const DEFAULT_ROOT_FONT_SIZE = 16

export const CANONICAL_CLASSES_DEFAULT_OPTIONS: CanonicalClassesOptions = {
  rootFontSize: DEFAULT_ROOT_FONT_SIZE,
  collapse: true,
  logical: true
}

export const CONSISTENT_CLASS_ORDER_DEFAULT_OPTIONS: ConsistentClassOrderOptions = {
  order: 'official',
  detectComponentClasses: false,
  componentClassOrder: 'preserve',
  componentClassPosition: 'start',
  unknownClassOrder: 'preserve',
  unknownClassPosition: 'start'
}

export const NO_RESTRICTED_CLASSES_DEFAULT_OPTIONS: NoRestrictedClassesOptions = {
  restrict: []
}

export const NO_UNKNOWN_CLASSES_DEFAULT_OPTIONS: NoUnknownClassesOptions = {
  ignore: [],
  detectComponentClasses: false
}

export const NO_UNNECESSARY_WHITESPACE_DEFAULT_OPTIONS: NoUnnecessaryWhitespaceOptions = {
  allowMultiline: true
}

export const EXPECT_EXPECT_DEFAULT_OPTIONS: ExpectExpectOptions = {
  assertFunctionNames: [],
  assertFunctionPatterns: []
}

export const MAX_NESTED_DESCRIBE_DEFAULT_OPTIONS: MaxNestedDescribeOptions = {
  max: 5
}

export const MISSING_PLAYWRIGHT_AWAIT_DEFAULT_OPTIONS: MissingPlaywrightAwaitOptions = {
  customMatchers: []
}

export const NO_SKIPPED_TEST_DEFAULT_OPTIONS: NoSkippedTestOptions = {
  allowConditional: false
}

export const VALID_EXPECT_DEFAULT_OPTIONS: ValidExpectOptions = {
  minArgs: 1,
  maxArgs: 2
}

export const VALID_TITLE_DEFAULT_OPTIONS: ValidTitleOptions = {
  ignoreSpaces: false,
  ignoreTypeOfStepName: true,
  ignoreTypeOfTestName: false,
  ignoreTypeOfDescribeName: false,
  disallowedWords: [],
  mustNotMatch: {},
  mustMatch: {}
}

export const VALID_TEST_TAGS_DEFAULT_OPTIONS: ValidTestTagsOptions = {
  allowedTags: [],
  disallowedTags: []
}
