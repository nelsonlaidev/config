import type { OxlintOverride } from 'oxlint'

export const stylistic = (): OxlintOverride[] => [
  {
    files: ['**/*.{ts,tsx}'],
    jsPlugins: ['@stylistic/eslint-plugin'],
    rules: {
      '@stylistic/multiline-comment-style': ['error', 'separate-lines'],
    },
  },
]
