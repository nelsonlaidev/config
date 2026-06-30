import type { OxlintOverride } from 'oxlint'

import {
  reactAllRules,
  reactDisableConflictReactHooksRules,
  reactHooksRecommendedLatestRules,
} from '../generated/plugin-snapshots'
import { GLOB_SRC } from '../globs'
import { remapRuleNames } from '../utils'

export const react = (): OxlintOverride[] => [
  {
    files: [GLOB_SRC],
    jsPlugins: [
      { name: '@eslint-react', specifier: '@eslint-react/eslint-plugin' },
      { name: 'react-hooks-js', specifier: 'eslint-plugin-react-hooks' },
    ],
    rules: {
      ...remapRuleNames(reactHooksRecommendedLatestRules, 'react-hooks', 'react-hooks-js'),

      ...reactAllRules,
      ...remapRuleNames(reactDisableConflictReactHooksRules, 'react-hooks', 'react-hooks-js'),

      '@eslint-react/static-components': 'off',
      // Keep or remove once https://github.com/Rel1cx/eslint-react/issues/1884 is resolved
      'react-hooks-js/static-components': 'off',

      '@eslint-react/immutability': 'error',
      '@eslint-react/refs': 'error',
    },
  },
  // Rules that require type information are not supported by Oxlint yet.
  // {
  //   files: [GLOB_TS, GLOB_TSX],
  //   rules: {
  //    '@eslint-react/no-leaked-conditional-rendering': 'error',
  //    '@eslint-react/no-unused-props': 'error',
  //   },
  // },
]
