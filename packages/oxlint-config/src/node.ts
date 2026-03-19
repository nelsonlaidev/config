import type { Overrides } from './types'

export const node: Overrides = [
  {
    files: ['**/*.{ts,tsx}'],
    plugins: ['node'],
    rules: {
      'node/global-require': 'error',
      'node/handle-callback-err': 'error',
      'node/no-exports-assign': 'error',
      'node/no-new-require': 'error',
      'node/no-path-concat': 'error',
      // 'node/no-process-env': 'error',
    },
  },
]
