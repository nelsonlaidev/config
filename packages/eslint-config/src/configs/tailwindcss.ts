import type { FlatConfig, RuleOverrides } from '../types'

import { tailwindcssPlugin } from '../plugins'

export const tailwindcss = (entryPoint: string, overrides?: RuleOverrides): FlatConfig[] => [
  {
    name: 'nelsonlaidev/tailwindcss/rules',
    plugins: {
      'better-tailwindcss': tailwindcssPlugin
    },
    rules: {
      'better-tailwindcss/enforce-consistent-class-order': 'error',
      'better-tailwindcss/enforce-canonical-classes': 'error',
      'better-tailwindcss/no-conflicting-classes': 'error',
      'better-tailwindcss/no-deprecated-classes': 'error',
      'better-tailwindcss/no-duplicate-classes': 'error',
      'better-tailwindcss/no-unnecessary-whitespace': 'error',
      'better-tailwindcss/no-unknown-classes': 'error',

      ...overrides
    },
    settings: {
      'better-tailwindcss': {
        entryPoint,
        callees: [
          [
            'cva',
            [
              { match: 'strings' },
              {
                match: 'objectValues',
                pathPattern: '^base$'
              }
            ]
          ]
        ]
      }
    }
  }
]
