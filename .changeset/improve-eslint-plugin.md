---
'@nelsonlaidev/eslint-plugin': minor
---

Improve ESLint plugin rules with new options and consolidation

- `lucide-icon-suffix`: add `suffix` option (`'with'` | `'without'`) to support both suffixed and unsuffixed import styles
- `lucide-restrict-import`: new rule replacing `lucide-prefer-loader-icon` and `lucide-prefer-trash2-icon` with a general-purpose `restrictions` array option
- `shadcn-cn-wrap-variants`: replace catch-all `*Variants` detection with explicit `names` array option to avoid false positives
- `shadcn-prefer-spinner`: add `ignore` option (glob array) to skip specific files (default: `['spinner.tsx']`)
- Export typed default options (`lucideIconSuffixDefaults`, `lucideRestrictImportDefaults`, `shadcnCnWrapVariantsDefaults`, `shadcnPreferSpinnerDefaults`) and their types for consumers
