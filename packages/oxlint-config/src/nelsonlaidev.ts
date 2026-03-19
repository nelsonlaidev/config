import type { Overrides } from './types'

export const nelsonlaidev: Overrides = [
  {
    files: ['**/*.{ts,tsx}'],
    jsPlugins: [{ name: 'nelsonlaidev', specifier: '@nelsonlaidev/eslint-plugin' }],
    rules: {
      'nelsonlaidev/lucide-icon-suffix': 'error',
      'nelsonlaidev/lucide-restrict-import': 'error',
      'nelsonlaidev/shadcn-cn-wrap-variants': 'error',
      'nelsonlaidev/shadcn-cva-variants-suffix': 'error',
      'nelsonlaidev/shadcn-prefer-spinner': 'error',
    },
  },
]
