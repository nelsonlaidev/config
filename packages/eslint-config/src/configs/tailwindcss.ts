import type { FlatConfig } from '../types'

import { tailwindcssPlugin } from '../plugins'
import { mergeConfig } from '../utils'

export const tailwindcss = (options: FlatConfig = {}): FlatConfig => {
  const base: FlatConfig = {
    name: 'nelsonlaidev/tailwindcss',
    plugins: {
      'better-tailwindcss': tailwindcssPlugin,
    },
    settings: {
      'better-tailwindcss': {
        detectComponentClasses: false,
        rootFontSize: 16,
      },
    },
    rules: {
      'better-tailwindcss/enforce-canonical-classes': 'error',
      'better-tailwindcss/enforce-consistent-variant-order': 'error',
      'better-tailwindcss/enforce-consistent-class-order': 'error',
      'better-tailwindcss/no-conflicting-classes': 'error',
      'better-tailwindcss/no-deprecated-classes': 'error',
      'better-tailwindcss/no-duplicate-classes': 'error',
      'better-tailwindcss/no-restricted-classes': 'error',
      'better-tailwindcss/no-unknown-classes': 'error',
      'better-tailwindcss/no-unnecessary-whitespace': 'error',
    },
  }

  return mergeConfig(base, options)
}
