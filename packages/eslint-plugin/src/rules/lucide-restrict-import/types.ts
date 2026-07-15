export type LucideRestrictImportRestriction = {
  name: string
  preferred: string
  message?: string
}

export type LucideRestrictImportOptions = {
  restrictions: LucideRestrictImportRestriction[]
}

export type MessageIds = 'preferIcon' | 'preferIconCustom'
