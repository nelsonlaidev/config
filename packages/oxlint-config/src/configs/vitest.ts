import type { Overrides } from '../types'

export const vitest: Overrides = [
  {
    files: ['**/*.{ts,tsx}'],
    plugins: ['vitest'],
    rules: {
      'vitest/consistent-each-for': 'error',
      'vitest/consistent-test-filename': 'error',
      'vitest/consistent-vitest-vi': 'error',
      'vitest/hoisted-apis-on-top': 'error',
      'vitest/no-conditional-tests': 'error',
      'vitest/no-import-node-test': 'error',
      'vitest/prefer-called-times': 'error',
      'vitest/prefer-describe-function-title': 'error',
      'vitest/prefer-expect-type-of': 'error',
      'vitest/prefer-to-be-object': 'error',
      'vitest/require-local-test-context-for-concurrent-snapshots': 'error',
      'vitest/warn-todo': 'error',
    },
  },
]
