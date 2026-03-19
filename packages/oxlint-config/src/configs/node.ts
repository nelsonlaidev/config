import type { OxlintOverride } from 'oxlint'

export const node = (): OxlintOverride[] => [
  {
    files: ['**/*.{ts,tsx}'],
    plugins: ['node'],
    rules: {
      'node/global-require': 'error',
      'node/handle-callback-err': 'error',
      'node/no-exports-assign': 'error',
      'node/no-new-require': 'error',
      'node/no-path-concat': 'error',
    },
  },
]
