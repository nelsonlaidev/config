# @nelsonlaidev/eslint-plugin

## 0.2.5

### Patch Changes

- 30e58fa: Update package metadata.

## 0.2.4

### Patch Changes

- d84896c: Align the ESLint peer dependency to `^9.0.0` and simplify the plugin export typing.

## 0.2.3

### Patch Changes

- 75762a5: Update the `eslint` peer dependency to `>=10.0.0` and mark it as optional.

## 0.2.2

### Patch Changes

- 35dea48: Update development dependencies and refresh TypeScript ESLint tooling versions.

## 0.2.1

### Patch Changes

- 36c824e: Added `inputGroupAddonVariants`, `inputGroupButtonVariants`, and `buttonVariants` to `shadcnCnWrapVariants` defaults

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
