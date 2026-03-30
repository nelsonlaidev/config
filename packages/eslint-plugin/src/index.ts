import { name, version } from '../package.json'
import { rules } from './rules'

const plugin = {
  meta: { name, version },
  rules,
}

export default plugin

export type {
  LucideIconSuffixOptions,
  LucideRestrictImportOptions,
  LucideRestrictImportRestriction,
  ShadcnCnWrapVariantsOptions,
  ShadcnPreferSpinnerOptions,
} from './lib/defaults'
export {
  lucideIconSuffixDefaults,
  lucideRestrictImportDefaults,
  shadcnCnWrapVariantsDefaults,
  shadcnPreferSpinnerDefaults,
} from './lib/defaults'
