# shadcn-cn-wrap-variants

Enforce wrapping `*Variants()` calls inside the `cn()` utility to ensure Tailwind classes merge correctly.

## Rule Details

When using [class-variance-authority (cva)](https://cva.style) with Tailwind CSS, calling a variants function directly (e.g., `buttonVariants()`) can produce conflicting classes. Wrapping the call in `cn()` ensures that [tailwind-merge](https://github.com/dcastil/tailwind-merge) resolves conflicts properly.

This rule reports any call to a function ending with `Variants` that is not already wrapped in `cn()`.

### Examples

Examples of **incorrect** code for this rule:

```js
;<Button className={buttonVariants({ variant: 'default' })} />

const cls = badgeVariants({ variant: 'outline' })
```

Examples of **correct** code for this rule:

```js
<Button className={cn(buttonVariants({ variant: 'default' }))} />

const cls = cn(badgeVariants({ variant: 'outline' }))

// Additional classes merge correctly
<Button className={cn(buttonVariants({ variant: 'default' }), 'mt-4')} />
```

## Options

This rule has no options.

## When Not To Use It

If your project does not use `cn()` with `tailwind-merge` for class merging.
