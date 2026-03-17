# shadcn-prefer-spinner

Enforce using the `<Spinner />` component instead of loader icons from `lucide-react`.

## Rule Details

Projects using shadcn/ui often provide a dedicated `<Spinner />` component that wraps loading behavior with consistent styling and accessibility. This rule forbids importing `LoaderIcon` or `Loader2Icon` from `lucide-react` and directs developers to use the `<Spinner />` component instead.

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

## When Not To Use It

If your project does not have a dedicated Spinner component or does not use `lucide-react`.
