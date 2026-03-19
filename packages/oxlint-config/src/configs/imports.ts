import type { Overrides } from '../types'

export const imports: Overrides = [
  {
    files: ['**/*.{ts,tsx}'],
    plugins: ['import'],
    rules: {
      'import/consistent-type-specifier-style': 'error',
      'import/default': 'error',
      'import/export': 'error',
      'import/first': 'error',
      'import/named': 'error',
      'import/namespace': 'error',
      'import/no-absolute-path': 'error',
      'import/no-amd': 'error',
      'import/no-anonymous-default-export': 'error',
      'import/no-commonjs': 'error',
      'import/no-duplicates': 'error',
      'import/no-dynamic-require': 'error',
      'import/no-empty-named-blocks': 'error',
      'import/no-mutable-exports': 'error',
      'import/no-named-as-default': 'error',
      'import/no-named-as-default-member': 'error',
      'import/no-self-import': 'error',
      'import/no-webpack-loader-syntax': 'error',
    },
  },
]
