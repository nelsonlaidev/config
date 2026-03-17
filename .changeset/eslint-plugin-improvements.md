---
'@nelsonlaidev/eslint-plugin': minor
---

Improve ESLint plugin rules with configurable options and rule consolidation

- `lucide-icon-suffix`: add `suffix` option (`'with'` | `'without'`) to support both suffixed and unsuffixed import styles
- `lucide-restrict-import`: new rule consolidating `lucide-prefer-loader-icon` and `lucide-prefer-trash2-icon` into a general-purpose `restrictions` array
- `shadcn-cn-wrap-variants`: replace catch-all `*Variants` pattern with explicit `names` array option to avoid false positives
- `shadcn-prefer-spinner`: add `ignore` option (glob array) to skip files like `spinner.tsx`; fix path matching with absolute paths
- Export typed default options and types for all configurable rules
