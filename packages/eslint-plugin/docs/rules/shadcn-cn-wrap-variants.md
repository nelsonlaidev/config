# shadcn-cn-wrap-variants

Enforce wrapping `*Variants()` calls inside the `cn()` utility to ensure Tailwind classes merge correctly.

## Rule Details

When using [class-variance-authority (cva)](https://cva.style) with Tailwind CSS, calling a variants function directly (e.g., `buttonVariants()`) can produce conflicting classes. Wrapping the call in `cn()` ensures that [tailwind-merge](https://github.com/dcastil/tailwind-merge) resolves conflicts properly.

This rule reports calls to specific variant functions that are not already wrapped in `cn()`. Only explicitly listed function names are checked to avoid false positives.

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

### `names`

An array of function names to check. Only calls to these functions will be reported.

### Default Options

```json
{
  "names": [
    "badgeVariants",
    "alertVariants",
    "toggleVariants",
    "emptyMediaVariants",
    "itemVariants",
    "itemMediaVariants",
    "buttonGroupVariants",
    "tabsListVariants",
    "sidebarMenuButtonVariants",
    "fieldVariants"
  ]
}
```

> **Note:** Custom options **replace** the defaults entirely — they are not merged. See [Options & Defaults](../defaults.md) for details on how to extend them.

Example with custom names:

```json
{
  "@nelsonlaidev/shadcn-cn-wrap-variants": ["error", { "names": ["buttonVariants", "badgeVariants"] }]
}
```

## When Not To Use It

If your project does not use `cn()` with `tailwind-merge` for class merging.
