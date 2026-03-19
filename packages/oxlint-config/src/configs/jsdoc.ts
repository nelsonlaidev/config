import type { OxlintOverride } from 'oxlint'

export const jsdoc = (): OxlintOverride[] => [
  {
    files: ['**/*.{ts,tsx}'],
    plugins: ['jsdoc'],
    rules: {
      'jsdoc/check-tag-names': 'error',
      'jsdoc/empty-tags': 'error',
    },
  },
]
