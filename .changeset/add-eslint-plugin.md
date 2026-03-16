---
'@nelsonlaidev/eslint-plugin': minor
---

Initial release of `@nelsonlaidev/eslint-plugin` with custom ESLint rules

**Lucide rules:**

- `lucide-icon-suffix` - Enforce using the `Icon` suffixed version of `lucide-react` imports (e.g., `HomeIcon` instead of `Home`)
- `lucide-prefer-loader-icon` - Enforce using `LoaderIcon` instead of `Loader2Icon` (configurable)
- `lucide-prefer-trash2-icon` - Enforce using `Trash2Icon` instead of `TrashIcon` (configurable)

**shadcn/ui rules:**

- `shadcn-cn-wrap-variants` - Enforce wrapping `*Variants()` calls inside `cn()` for correct Tailwind class merging
- `shadcn-cva-variants-suffix` - Enforce that variables assigned to `cva()` end with `Variants`
- `shadcn-prefer-spinner` - Enforce using `<Spinner />` component instead of loader icons from `lucide-react`
