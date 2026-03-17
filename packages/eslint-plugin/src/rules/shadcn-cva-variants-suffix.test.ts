import { RuleTester } from '@typescript-eslint/rule-tester'

import { shadcnCvaVariantsSuffix } from './shadcn-cva-variants-suffix'

const ruleTester = new RuleTester()

ruleTester.run('shadcn-cva-variants-suffix', shadcnCvaVariantsSuffix, {
  valid: [
    `const buttonVariants = cva('base', { variants: {} })`,
    `export const badgeVariants = cva('base')`,
    `const alertVariants = cva('base', { variants: {} })`,
    // Non-cva calls should not be affected
    `const button = cn('base')`,
    `const styles = clsx('base')`,
    // Already ends with Variants
    `const myVariants = cva('base')`,
  ],
  invalid: [
    {
      code: `const button = cva('base', { variants: {} })`,
      output: `const buttonVariants = cva('base', { variants: {} })`,
      errors: [{ messageId: 'requireSuffix', data: { name: 'button', suggested: 'buttonVariants' } }],
    },
    {
      code: `export const badge = cva('base')`,
      output: `export const badgeVariants = cva('base')`,
      errors: [{ messageId: 'requireSuffix', data: { name: 'badge', suggested: 'badgeVariants' } }],
    },
    {
      code: `const alertStyle = cva('base', { variants: {} })`,
      output: `const alertStyleVariants = cva('base', { variants: {} })`,
      errors: [{ messageId: 'requireSuffix', data: { name: 'alertStyle', suggested: 'alertStyleVariants' } }],
    },
  ],
})
