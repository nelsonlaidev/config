import type { OxlintOverride } from 'oxlint'

export const zod = (): OxlintOverride[] => [
  {
    files: ['**/*.{ts,tsx}'],
    jsPlugins: ['eslint-plugin-import-zod'],
    rules: {
      'import-zod/prefer-zod-namespace': 'error',
    },
  },
]
