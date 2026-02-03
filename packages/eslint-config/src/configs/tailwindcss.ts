import type { FlatConfig } from '../types'

import { tailwindcssPlugin } from '../plugins'

export const tailwindcss = (entryPoint: string): FlatConfig[] => [
  {
    name: 'nelsonlaidev/tailwindcss/rules',
    plugins: {
      'better-tailwindcss': tailwindcssPlugin
    },
    rules: {
      'better-tailwindcss/enforce-canonical-classes': 'error',
      'better-tailwindcss/enforce-consistent-class-order': 'error',
      'better-tailwindcss/enforce-consistent-important-position': 'error',
      'better-tailwindcss/enforce-consistent-line-wrapping': 'error',
      'better-tailwindcss/enforce-consistent-variable-syntax': 'error',
      'better-tailwindcss/enforce-shorthand-classes': 'error',
      'better-tailwindcss/no-conflicting-classes': 'error',
      'better-tailwindcss/no-deprecated-classes': 'error',
      'better-tailwindcss/no-duplicate-classes': 'error',
      'better-tailwindcss/no-restricted-classes': 'error',
      'better-tailwindcss/no-unknown-classes': 'error',
      'better-tailwindcss/no-unnecessary-whitespace': 'error'
    },
    settings: {
      'better-tailwindcss': {
        entryPoint
      }
    }
  }
]
