import type { FlatConfig } from '../types'

import { nelsonlaidevPlugin } from '../plugins'

export const nelsonlaidev = (): FlatConfig[] => [
  {
    name: 'nelsonlaidev/nelsonlaidev/rules',
    plugins: {
      '@nelsonlaidev': nelsonlaidevPlugin,
    },
    rules: {
      '@nelsonlaidev/lucide-icon-suffix': 'error',
      '@nelsonlaidev/lucide-prefer-loader-icon': 'error',
      '@nelsonlaidev/lucide-prefer-trash2-icon': 'error',
      '@nelsonlaidev/shadcn-cn-wrap-variants': 'error',
      '@nelsonlaidev/shadcn-cva-variants-suffix': 'error',
      '@nelsonlaidev/shadcn-prefer-spinner': 'error',
    },
  },
]
