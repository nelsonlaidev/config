# shadcn-prefer-spinner

Enforce using the `<Spinner />` component instead of loader icons from `lucide-react`.

## Rule Details

Projects using shadcn/ui often provide a dedicated `<Spinner />` component that wraps loading behavior with consistent styling and accessibility. This rule forbids importing `LoaderIcon` or `Loader2Icon` from `lucide-react` and directs developers to use the `<Spinner />` component instead.

Files named `spinner.tsx` are excluded from this rule, since that is typically where the Spinner component itself is defined and needs to import the underlying icon.

### Examples

Examples of **incorrect** code for this rule:

```js
import { LoaderIcon } from 'lucide-react'
import { Loader2Icon } from 'lucide-react'
```

Examples of **correct** code for this rule:

```js
import { Spinner } from '@/components/ui/spinner'
```

## Options

### `ignore`

An array of glob patterns for files that should be excluded from this rule. Files matching any pattern will not be checked.

### Default Options

```json
{
  "ignore": ["**/spinner.tsx"]
}
```

> **Note:** Custom options **replace** the defaults entirely — they are not merged. See [Options & Defaults](../defaults.md) for details on how to extend them.

Example with custom ignore patterns:

```json
{
  "@nelsonlaidev/shadcn-prefer-spinner": [
    "error",
    {
      "ignore": ["**/spinner.tsx", "**/loading.tsx"]
    }
  ]
}
```

## When Not To Use It

If your project does not have a dedicated Spinner component or does not use `lucide-react`.
