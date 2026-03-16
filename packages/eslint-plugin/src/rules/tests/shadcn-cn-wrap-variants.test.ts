import { RuleTester } from 'eslint'
import { describe, expect, it } from 'vitest'

import { shadcnCnWrapVariants } from '../shadcn-cn-wrap-variants'

const ruleTester = new RuleTester()

describe('shadcn-cn-wrap-variants', () => {
  it('should enforce wrapping *Variants() in cn()', () => {
    expect(() => {
      ruleTester.run('shadcn-cn-wrap-variants', shadcnCnWrapVariants, {
        valid: [
          // Wrapped in cn()
          `cn(buttonVariants({ variant: 'default' }))`,
          `cn(buttonVariants({ variant: 'default' }), 'extra-class')`,
          `cn(badgeVariants(), className)`,
          // Not a *Variants call
          `buttonStyles({ variant: 'default' })`,
          `getVariant('primary')`,
        ],
        invalid: [
          {
            code: `buttonVariants({ variant: 'default' })`,
            output: `cn(buttonVariants({ variant: 'default' }))`,
            errors: [{ messageId: 'wrapWithCn', data: { name: 'buttonVariants' } }],
          },
          {
            code: `badgeVariants()`,
            output: `cn(badgeVariants())`,
            errors: [{ messageId: 'wrapWithCn', data: { name: 'badgeVariants' } }],
          },
          {
            code: `const cls = alertVariants({ variant: 'destructive' })`,
            output: `const cls = cn(alertVariants({ variant: 'destructive' }))`,
            errors: [{ messageId: 'wrapWithCn', data: { name: 'alertVariants' } }],
          },
        ],
      })
    }).not.toThrow()
  })
})
