import type { Overrides } from '../types'

export const deMorgan: Overrides = [
  {
    files: ['**/*.{ts,tsx}'],
    jsPlugins: ['eslint-plugin-de-morgan'],
    rules: {
      'de-morgan/no-negated-conjunction': 'error',
      'de-morgan/no-negated-disjunction': 'error',
    },
  },
]
