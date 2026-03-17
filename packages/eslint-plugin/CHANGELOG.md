# @nelsonlaidev/eslint-plugin

## 0.2.0

### Minor Changes

- 18fe881: Improve ESLint plugin rules with configurable options and rule consolidation
  - `lucide-icon-suffix`: add `suffix` option (`'with'` | `'without'`) to support both suffixed and unsuffixed import styles
  - `lucide-restrict-import`: new rule consolidating `lucide-prefer-loader-icon` and `lucide-prefer-trash2-icon` into a general-purpose `restrictions` array
  - `shadcn-cn-wrap-variants`: replace catch-all `*Variants` pattern with explicit `names` array option to avoid false positives
  - `shadcn-prefer-spinner`: add `ignore` option (glob array) to skip files like `spinner.tsx`; fix path matching with absolute paths
  - Export typed default options and types for all configurable rules

## 0.1.0

### Minor Changes

- 9cd534b: Initial release of `@nelsonlaidev/eslint-plugin` with custom ESLint rules

  **Lucide rules:**
  - `lucide-icon-suffix` - Enforce using the `Icon` suffixed version of `lucide-react` imports (e.g., `HomeIcon` instead of `Home`)
  - `lucide-prefer-loader-icon` - Enforce using `LoaderIcon` instead of `Loader2Icon` (configurable)
  - `lucide-prefer-trash2-icon` - Enforce using `Trash2Icon` instead of `TrashIcon` (configurable)

  **shadcn/ui rules:**
  - `shadcn-cn-wrap-variants` - Enforce wrapping `*Variants()` calls inside `cn()` for correct Tailwind class merging
  - `shadcn-cva-variants-suffix` - Enforce that variables assigned to `cva()` end with `Variants`
  - `shadcn-prefer-spinner` - Enforce using `<Spinner />` component instead of loader icons from `lucide-react`
