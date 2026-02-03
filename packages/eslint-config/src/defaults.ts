import type {
  CanonicalClassesOptions,
  ConsistentClassOrderOptions,
  ConsistentLineWrappingOptions,
  NoRestrictedClassesOptions,
  NoUnknownClassesOptions,
  NoUnnecessaryWhitespaceOptions
} from './types'

export const CANONICAL_CLASSES_DEFAULT_OPTIONS: CanonicalClassesOptions = {
  rootFontSize: 16,
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

export const CONSISTENT_LINE_WRAPPING_DEFAULT_OPTIONS: ConsistentLineWrappingOptions = {
  printWidth: 120,
  classesPerLine: 0,
  group: 'newLine',
  preferSingleLine: false,
  indent: 2,
  lineBreakStyle: 'unix',
  strictness: 'strict'
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
