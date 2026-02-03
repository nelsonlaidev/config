import type { ObjectKeyMatcher, ObjectValueMatcher, StringMatcher } from 'eslint-plugin-better-tailwindcss/types'

export type Matchers = Array<string | [string, Array<StringMatcher | ObjectKeyMatcher | ObjectValueMatcher>]>

export type CanonicalClassesOptions = {
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-canonical-classes.md#rootfontsize) for more details.
   *
   * @default 16
   */
  rootFontSize?: number
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-canonical-classes.md#collapse) for more details.
   *
   * @default true
   */
  collapse?: boolean
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-canonical-classes.md#logical) for more details.
   *
   * @default true
   */
  logical?: boolean
}

export type ConsistentClassOrderOptions = {
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-consistent-class-order.md#order) for more details.
   *
   * @default 'official'
   */
  order?: 'asc' | 'desc' | 'official' | 'strict'
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-consistent-class-order.md#detectComponentClasses) for more details.
   *
   * @default false
   */
  detectComponentClasses?: boolean
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-consistent-class-order.md#componentClassOrder) for more details.
   *
   * @default 'preserve'
   */
  componentClassOrder?: 'asc' | 'desc' | 'preserve'
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-consistent-class-order.md#componentClassPosition) for more details.
   *
   * @default 'start'
   */
  componentClassPosition?: 'start' | 'end'
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-consistent-class-order.md#unknownClassOrder) for more details.
   *
   * @default 'preserve'
   */
  unknownClassOrder?: 'asc' | 'desc' | 'preserve'
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-consistent-class-order.md#unknownClassPosition) for more details.
   *
   * @default 'start'
   */
  unknownClassPosition?: 'start' | 'end'
}

export type ConsistentLineWrappingOptions = {
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-consistent-line-wrapping.md#printWidth) for more details.
   *
   * @default 120
   */
  printWidth?: number
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-consistent-line-wrapping.md#classesPerLine) for more details.
   *
   * @default 0
   */
  classesPerLine?: number
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-consistent-line-wrapping.md#group) for more details.
   *
   * @default 'newLine'
   */
  group?: 'emptyLine' | 'never' | 'newLine'
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-consistent-line-wrapping.md#preferSingleLine) for more details.
   *
   * @default false
   */
  preferSingleLine?: boolean
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-consistent-line-wrapping.md#indent) for more details.
   *
   * @default 2
   */
  indent?: number | 'tab'
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-consistent-line-wrapping.md#lineBreakStyle) for more details.
   *
   * @default 'unix'
   */
  lineBreakStyle?: 'windows' | 'unix'
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-consistent-line-wrapping.md#strictness) for more details.
   *
   * @default 'strict'
   */
  strictness?: 'strict' | 'loose'
}

export type NoRestrictedClassesOptions = {
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/no-restricted-classes.md#restrict) for more details.
   *
   * @default []
   */
  restrict?:
    | string[]
    | Array<{
        pattern: string
        message?: string
        fix?: string
      }>
}

export type NoUnknownClassesOptions = {
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/no-unknown-classes.md#ignore) for more details.
   *
   * @default []
   */
  ignore?: string[]
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/no-unknown-classes.md#detectComponentClasses) for more details.
   *
   * @default false
   */
  detectComponentClasses?: boolean
}

export type NoUnnecessaryWhitespaceOptions = {
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/no-unnecessary-whitespace.md#allowMultiline) for more details.
   *
   * @default true
   */
  allowMultiline?: boolean
}

export type TailwindCSSOptions = {
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/settings/settings.md#entrypoint) for more details.
   */
  entryPoint?: string
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/settings/settings.md#tailwindconfig) for more details.
   */
  tailwindConfig?: string
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/settings/settings.md#tsconfig) for more details.
   */
  tsconfig?: string
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/settings/settings.md#detectcomponentclasses) for more details.
   *
   * @default false
   */
  detectComponentClasses?: boolean
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/settings/settings.md#rootfontsize) for more details.
   */
  rootFontSize?: number
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/settings/settings.md#messagestyle) for more details.
   */
  messageStyle?: 'visual' | 'compact' | 'raw'
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/settings/settings.md#attributes) for more details.
   */
  attributes?: Matchers
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/settings/settings.md#callees) for more details.
   */
  callees?: Matchers
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/settings/settings.md#variables) for more details.
   */
  variables?: Matchers
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/settings/settings.md#tags) for more details.
   */
  tags?: Matchers
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-canonical-classes.md) for more details.
   */
  canonicalClasses?: CanonicalClassesOptions
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-consistent-class-order.md) for more details.
   */
  consistentClassOrder?: ConsistentClassOrderOptions
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-consistent-line-wrapping.md) for more details.
   */
  consistentLineWrapping?: ConsistentLineWrappingOptions
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/no-restricted-classes.md) for more details.
   */
  noRestrictedClasses?: NoRestrictedClassesOptions
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/no-unknown-classes.md) for more details.
   */
  noUnknownClasses?: NoUnknownClassesOptions
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/no-unnecessary-whitespace.md) for more details.
   */
  noUnnecessaryWhitespace?: NoUnnecessaryWhitespaceOptions
}
