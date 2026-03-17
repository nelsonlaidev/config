import { RuleTester } from '@typescript-eslint/rule-tester'

import { shadcnCnWrapVariants } from './shadcn-cn-wrap-variants'

const ruleTester = new RuleTester()

ruleTester.run('shadcn-cn-wrap-variants', shadcnCnWrapVariants, {
  valid: [
    // Wrapped in cn()
    `cn(buttonVariants({ variant: 'default' }))`,
    `cn(buttonVariants({ variant: 'default' }), 'extra-class')`,
    `cn(badgeVariants(), className)`,

    // Not in default names list
    `buttonStyles({ variant: 'default' })`,
    `getVariant('primary')`,

    // "Variants" alone is not in the default list (avoids false positives)
    `Variants()`,
    `someVariants()`,

    // Custom names option: not in list
    {
      code: `badgeVariants()`,
      options: [{ names: ['buttonVariants'] }],
    },
  ],
  invalid: [
    {
      code: `buttonVariants({ variant: 'default' })`,
      output: `cn(buttonVariants({ variant: 'default' }))`,
      errors: [{ messageId: 'wrapWithCn', data: { name: 'buttonVariants' } }],
      options: [{ names: ['buttonVariants'] }],
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
    {
      code: `toggleVariants({ variant: 'outline' })`,
      output: `cn(toggleVariants({ variant: 'outline' }))`,
      errors: [{ messageId: 'wrapWithCn', data: { name: 'toggleVariants' } }],
    },
    {
      code: `fieldVariants({ size: 'sm' })`,
      output: `cn(fieldVariants({ size: 'sm' }))`,
      errors: [{ messageId: 'wrapWithCn', data: { name: 'fieldVariants' } }],
    },
    // Custom names option
    {
      code: `myCustomVariants()`,
      output: `cn(myCustomVariants())`,
      options: [{ names: ['myCustomVariants'] }],
      errors: [{ messageId: 'wrapWithCn', data: { name: 'myCustomVariants' } }],
    },
  ],
})
