export type LucideIconSuffixOptions = {
  suffix: 'with' | 'without'
}

export type LucideRestrictImportRestriction = {
  name: string
  preferred: string
  message?: string
}

export type LucideRestrictImportOptions = {
  restrictions: LucideRestrictImportRestriction[]
}

export type ShadcnCnWrapVariantsOptions = {
  names: string[]
}

export type ShadcnPreferSpinnerOptions = {
  ignore: string[]
}

export const lucideIconSuffixDefaults: LucideIconSuffixOptions = {
  suffix: 'with',
}

export const lucideRestrictImportDefaults: LucideRestrictImportOptions = {
  restrictions: [
    { name: 'Loader2Icon', preferred: 'LoaderIcon' },
    { name: 'TrashIcon', preferred: 'Trash2Icon' },
  ],
}

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

export const shadcnPreferSpinnerDefaults: ShadcnPreferSpinnerOptions = {
  ignore: ['spinner.tsx'],
}
