import type { ESLint } from 'eslint'

import { lucideIconSuffix } from './rules/lucide-icon-suffix'
import { lucidePreferLoaderIcon } from './rules/lucide-prefer-loader-icon'
import { lucidePreferTrash2Icon } from './rules/lucide-prefer-trash2-icon'
import { shadcnCnWrapVariants } from './rules/shadcn-cn-wrap-variants'
import { shadcnCvaVariantsSuffix } from './rules/shadcn-cva-variants-suffix'
import { shadcnPreferSpinner } from './rules/shadcn-prefer-spinner'

const plugin = {
  meta: {
    name: '@nelsonlaidev/eslint-plugin',
  },
  rules: {
    'lucide-icon-suffix': lucideIconSuffix,
    'lucide-prefer-loader-icon': lucidePreferLoaderIcon,
    'lucide-prefer-trash2-icon': lucidePreferTrash2Icon,
    'shadcn-cn-wrap-variants': shadcnCnWrapVariants,
    'shadcn-cva-variants-suffix': shadcnCvaVariantsSuffix,
    'shadcn-prefer-spinner': shadcnPreferSpinner,
  },
} satisfies ESLint.Plugin

export default plugin
