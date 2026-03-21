import type { OxlintOverride } from 'oxlint'
import type { TailwindCSSConfig } from '../types'

import { GLOB_SRC } from '../globs'

export const tailwindcss = (options: TailwindCSSConfig): OxlintOverride[] => {
  const disableShorthand = options.canonical?.logical ?? true

  return [
    {
      files: [GLOB_SRC],
      jsPlugins: ['eslint-plugin-better-tailwindcss'],
      rules: {
        'better-tailwindcss/enforce-canonical-classes': [
          'error',
          {
            collapse: options.canonical?.collapse ?? true,
            logical: options.canonical?.logical ?? true,
          },
        ],

        // Recommended to be disabled to avoid duplicate reports
        // when the canonical classes rule is enabled
        'better-tailwindcss/enforce-consistent-important-position': 'off',
        'better-tailwindcss/enforce-consistent-variable-syntax': 'off',
        'better-tailwindcss/enforce-shorthand-classes': disableShorthand ? 'off' : 'error',

        'better-tailwindcss/enforce-consistent-class-order': [
          'error',
          {
            order: options.classOrder?.order ?? 'official',
            componentClassOrder: options.classOrder?.componentOrder ?? 'preserve',
            componentClassPosition: options.classOrder?.componentPosition ?? 'start',
            unknownClassOrder: options.classOrder?.unknownOrder ?? 'preserve',
            unknownClassPosition: options.classOrder?.unknownPosition ?? 'start',
          },
        ],

        'better-tailwindcss/no-conflicting-classes': 'error',
        'better-tailwindcss/no-deprecated-classes': 'error',
        'better-tailwindcss/no-duplicate-classes': 'error',

        'better-tailwindcss/no-restricted-classes': ['error', { restrict: options.restrict ?? [] }],
        'better-tailwindcss/no-unknown-classes': ['error', { ignore: options.ignore ?? [] }],

        'better-tailwindcss/no-unnecessary-whitespace': [
          'error',
          { allowMultiline: options.whitespace?.allowMultiline ?? true },
        ],
      },
    },
  ]
}
