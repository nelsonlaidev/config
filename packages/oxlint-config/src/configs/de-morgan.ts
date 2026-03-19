import type { OxlintOverride } from 'oxlint'

export const deMorgan = (): OxlintOverride[] => [
  {
    files: ['**/*.{ts,tsx}'],
    jsPlugins: ['eslint-plugin-de-morgan'],
    rules: {
      'de-morgan/no-negated-conjunction': 'error',
      'de-morgan/no-negated-disjunction': 'error',
    },
  },
]
