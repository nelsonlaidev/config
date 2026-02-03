import type { FlatConfig, TailwindCSSOptions } from '../types'

import {
  getDefaultAttributes,
  getDefaultCallees,
  getDefaultTags,
  getDefaultVariables
} from 'eslint-plugin-better-tailwindcss/api/defaults'

import {
  CANONICAL_CLASSES_DEFAULT_OPTIONS,
  CONSISTENT_CLASS_ORDER_DEFAULT_OPTIONS,
  CONSISTENT_LINE_WRAPPING_DEFAULT_OPTIONS,
  DEFAULT_ROOT_FONT_SIZE,
  NO_RESTRICTED_CLASSES_DEFAULT_OPTIONS,
  NO_UNKNOWN_CLASSES_DEFAULT_OPTIONS,
  NO_UNNECESSARY_WHITESPACE_DEFAULT_OPTIONS
} from '../defaults'
import { tailwindcssPlugin } from '../plugins'

export const tailwindcss = (options: TailwindCSSOptions): FlatConfig[] => {
  const shouldEnableShorthandRule = !options.canonicalClasses || options.canonicalClasses.logical === false

  return [
    {
      name: 'nelsonlaidev/tailwindcss/rules',
      plugins: {
        'better-tailwindcss': tailwindcssPlugin
      },
      rules: {
        'better-tailwindcss/enforce-canonical-classes': [
          'error',
          {
            ...CANONICAL_CLASSES_DEFAULT_OPTIONS,
            ...options.canonicalClasses
          }
        ],
        // The below rules are recommended to be disabled to avoid duplicate reports
        // when the canonical classes rule is enabled
        'better-tailwindcss/enforce-consistent-important-position': 'off',
        'better-tailwindcss/enforce-consistent-variable-syntax': 'off',
        'better-tailwindcss/enforce-shorthand-classes': shouldEnableShorthandRule ? 'error' : 'off',

        'better-tailwindcss/enforce-consistent-class-order': [
          'error',
          {
            ...CONSISTENT_CLASS_ORDER_DEFAULT_OPTIONS,
            ...options.consistentClassOrder
          }
        ],
        'better-tailwindcss/enforce-consistent-line-wrapping': [
          'error',
          {
            ...CONSISTENT_LINE_WRAPPING_DEFAULT_OPTIONS,
            ...options.consistentLineWrapping
          }
        ],
        'better-tailwindcss/no-conflicting-classes': 'error',
        'better-tailwindcss/no-deprecated-classes': 'error',
        'better-tailwindcss/no-duplicate-classes': 'error',
        'better-tailwindcss/no-restricted-classes': [
          'error',
          {
            ...NO_RESTRICTED_CLASSES_DEFAULT_OPTIONS,
            ...options.noRestrictedClasses,
            restrict: [...(options.noRestrictedClasses?.restrict ?? [])]
          }
        ],
        'better-tailwindcss/no-unknown-classes': [
          'error',
          {
            ...NO_UNKNOWN_CLASSES_DEFAULT_OPTIONS,
            ...options.noUnknownClasses,
            ignore: [...(options.noUnknownClasses?.ignore ?? [])]
          }
        ],
        'better-tailwindcss/no-unnecessary-whitespace': [
          'error',
          {
            ...NO_UNNECESSARY_WHITESPACE_DEFAULT_OPTIONS,
            ...options.noUnnecessaryWhitespace
          }
        ]
      },
      settings: {
        'better-tailwindcss': {
          ...options,
          rootFontSize: options.rootFontSize ?? DEFAULT_ROOT_FONT_SIZE,
          attributes: [...getDefaultAttributes(), ...(options.attributes ?? [])],
          callees: [...getDefaultCallees(), ...(options.callees ?? [])],
          variables: [...getDefaultVariables(), ...(options.variables ?? [])],
          tags: [...getDefaultTags(), ...(options.tags ?? [])]
        } satisfies TailwindCSSOptions
      }
    }
  ]
}
