/**
 * Options for the `lucide-icon-suffix` rule.
 *
 * @see {@link https://github.com/nelsonlaidev/config/blob/main/packages/eslint-plugin/docs/rules/lucide-icon-suffix.md}
 */
export type LucideIconSuffixOptions = {
  /** Whether to enforce the `Icon` suffix (`'with'`) or disallow it (`'without'`). */
  suffix: 'with' | 'without'
}

/**
 * A single restriction entry for the `lucide-restrict-import` rule.
 *
 * @see {@link https://github.com/nelsonlaidev/config/blob/main/packages/eslint-plugin/docs/rules/lucide-restrict-import.md}
 */
export type LucideRestrictImportRestriction = {
  /** The import name to restrict. */
  name: string
  /** The preferred alternative import name. */
  preferred: string
  /** An optional custom error message shown when the restricted import is used. */
  message?: string
}

/**
 * Options for the `lucide-restrict-import` rule.
 *
 * @see {@link https://github.com/nelsonlaidev/config/blob/main/packages/eslint-plugin/docs/rules/lucide-restrict-import.md}
 */
export type LucideRestrictImportOptions = {
  /** List of restricted imports and their preferred alternatives. Replaces defaults when provided. */
  restrictions: LucideRestrictImportRestriction[]
}

/**
 * Options for the `shadcn-cn-wrap-variants` rule.
 *
 * @see {@link https://github.com/nelsonlaidev/config/blob/main/packages/eslint-plugin/docs/rules/shadcn-cn-wrap-variants.md}
 */
export type ShadcnCnWrapVariantsOptions = {
  /** Function names to check for `cn()` wrapping. Replaces defaults when provided. */
  names: string[]
}

/**
 * Options for the `shadcn-prefer-spinner` rule.
 *
 * @see {@link https://github.com/nelsonlaidev/config/blob/main/packages/eslint-plugin/docs/rules/shadcn-prefer-spinner.md}
 */
export type ShadcnPreferSpinnerOptions = {
  /** Glob patterns for files to exclude from this rule. Replaces defaults when provided. */
  ignore: string[]
}

/** Default options for the `lucide-icon-suffix` rule. */
export const lucideIconSuffixDefaults: LucideIconSuffixOptions = {
  suffix: 'with',
}

/** Default options for the `lucide-restrict-import` rule. */
export const lucideRestrictImportDefaults: LucideRestrictImportOptions = {
  restrictions: [
    { name: 'Loader2Icon', preferred: 'LoaderIcon' },
    { name: 'TrashIcon', preferred: 'Trash2Icon' },
  ],
}

/** Default options for the `shadcn-cn-wrap-variants` rule. */
export const shadcnCnWrapVariantsDefaults: ShadcnCnWrapVariantsOptions = {
  names: [
    'badgeVariants',
    'alertVariants',
    'toggleVariants',
    'emptyMediaVariants',
    'itemVariants',
    'itemMediaVariants',
    'buttonGroupVariants',
    'tabsListVariants',
    'sidebarMenuButtonVariants',
    'fieldVariants',
  ],
}

/** Default options for the `shadcn-prefer-spinner` rule. */
export const shadcnPreferSpinnerDefaults: ShadcnPreferSpinnerOptions = {
  ignore: ['**/spinner.tsx'],
}
