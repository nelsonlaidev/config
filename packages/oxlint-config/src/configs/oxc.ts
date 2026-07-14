import type { OxlintOverride } from 'oxlint'

import { GLOB_SRC } from '../globs'

export const oxc = (): OxlintOverride => ({
  files: [GLOB_SRC],
  plugins: ['oxc'],
  rules: {
    'oxc/approx-constant': 'error',
    'oxc/bad-array-method-on-arguments': 'error',
    'oxc/bad-bitwise-operator': 'error',
    'oxc/bad-char-at-comparison': 'error',
    'oxc/bad-comparison-sequence': 'error',
    'oxc/bad-min-max-func': 'error',
    'oxc/bad-object-literal-comparison': 'error',
    'oxc/bad-replace-all-arg': 'error',
    'oxc/const-comparisons': 'error',
    'oxc/double-comparisons': 'error',
    'oxc/erasing-op': 'error',
    'oxc/misrefactored-assign-op': 'error',
    'oxc/missing-throw': 'error',
    'oxc/no-accumulating-spread': 'error',
    'oxc/no-async-endpoint-handlers': 'error',
    'oxc/no-barrel-file': 'error',
    'oxc/no-const-enum': 'error',
    'oxc/no-this-in-exported-function': 'error',
    'oxc/number-arg-out-of-range': 'error',
    'oxc/only-used-in-recursion': 'error',
    'oxc/uninvoked-array-callback': 'error',
  },
})
