import type { FlatConfig, TailwindCSSOptions } from '../types'

import { getDefaultSelectors } from 'eslint-plugin-better-tailwindcss/defaults'
import { MatcherType, SelectorKind } from 'eslint-plugin-better-tailwindcss/types'

import { GLOB_SRC } from '../globs'
import { tailwindcssPlugin } from '../plugins'

const createSelectors = <K extends SelectorKind>(names: string[], kind: K) =>
  names.map((name) => ({
    name,
    kind,
    match: [{ type: MatcherType.String as const }, { type: MatcherType.ObjectValue as const }],
  }))

export const tailwindcss = (options: TailwindCSSOptions): FlatConfig[] => {
  const disableShorthand = options.canonical?.logical ?? true

  return [
    {
      name: 'nelsonlaidev/tailwindcss/setup',
      plugins: {
        'better-tailwindcss': tailwindcssPlugin,
      },
      settings: {
        'better-tailwindcss': {
          entryPoint: options.entryPoint,
          tailwindConfig: options.tailwindConfig,
          tsconfig: options.tsconfig,
          cwd: options.cwd,
          detectComponentClasses: options.detectComponentClasses ?? false,
          rootFontSize: options.rootFontSize ?? 16,
          messageStyle: options.messageStyle,
          selectors: [
            ...getDefaultSelectors(),
            ...createSelectors(['classNames', '.+ClassNames'], SelectorKind.Attribute),
            ...createSelectors(['.+ClassName', '.+ClassNames'], SelectorKind.Variable),
            ...(options.selectors ?? []),
          ],
        } satisfies TailwindCSSOptions,
      },
    },
    {
      name: 'nelsonlaidev/tailwindcss/rules',
      files: [GLOB_SRC],
      rules: {
        'better-tailwindcss/enforce-canonical-classes': [
          'error',
          {
            collapse: options.canonical?.collapse ?? true,
            logical: options.canonical?.logical ?? true,
          },
        ],
        'better-tailwindcss/enforce-consistent-variant-order': 'error',
        'better-tailwindcss/enforce-logical-properties': 'error',

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
          {
            allowMultiline: options.whitespace?.allowMultiline ?? true,
          },
        ],
      },
    },
  ]
}
