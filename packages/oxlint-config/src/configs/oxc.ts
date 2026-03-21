import type { OxlintOverride } from 'oxlint'

import { GLOB_SRC } from '../globs'

export const oxc = (): OxlintOverride[] => [
  {
    files: [GLOB_SRC],
    plugins: ['oxc'],
    rules: {
      'approx-constant': 'error',
      'bad-array-method-on-arguments': 'error',
      'bad-bitwise-operator': 'error',
      'bad-char-at-comparison': 'error',
      'bad-comparison-sequence': 'error',
      'bad-min-max-func': 'error',
      'bad-object-literal-comparison': 'error',
      'bad-replace-all-arg': 'error',
      'const-comparisons': 'error',
      'double-comparisons': 'error',
      'erasing-op': 'error',
      'misrefactored-assign-op': 'error',
      'missing-throw': 'error',
      'no-accumulating-spread': 'error',
      'no-async-endpoint-handlers': 'error',
      'no-barrel-file': 'error',
      'no-const-enum': 'error',
      'no-this-in-exported-function': 'error',
      'number-arg-out-of-range': 'error',
      'only-used-in-recursion': 'error',
      'uninvoked-array-callback': 'error',
    },
  },
]
