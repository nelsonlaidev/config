import { name, version } from '../package.json'
import { rules } from './rules'

export type {
  LucideIconSuffixOptions,
  LucideRestrictImportOptions,
  LucideRestrictImportRestriction,
  ShadcnCnWrapVariantsOptions,
  ShadcnPreferSpinnerOptions,
} from './rules'
export {
  lucideIconSuffixDefaults,
  lucideRestrictImportDefaults,
  shadcnCnWrapVariantsDefaults,
  shadcnPreferSpinnerDefaults,
} from './rules'

const plugin = {
  meta: { name, version },
  rules,
}

export default plugin
