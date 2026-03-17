# shadcn-cva-variants-suffix

Enforce that variables assigned to `cva()` calls always end with `Variants`.

## Rule Details

When using [class-variance-authority (cva)](https://cva.style), this rule enforces a consistent naming convention where the variable holding a `cva()` call must end with `Variants`.

### Examples

Examples of **incorrect** code for this rule:

```js
const button = cva('base', { variants: {} })
export const badge = cva('base')
```

Examples of **correct** code for this rule:

```js
const buttonVariants = cva('base', { variants: {} })
export const badgeVariants = cva('base')
```

## Options

This rule has no options.

## When Not To Use It

If your project does not use `cva` or you prefer a different naming convention.
