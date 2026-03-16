# lucide-prefer-loader-icon

Enforce using `LoaderIcon` instead of `Loader2Icon` from `lucide-react` for better visual consistency.

## Rule Details

Lucide provides two loader icons: `LoaderIcon` and `Loader2Icon`. This rule enforces a consistent choice between the two across your codebase.

By default, `LoaderIcon` is preferred.

### Examples

Examples of **incorrect** code for this rule (with default options):

```js
import { Loader2Icon } from 'lucide-react'
```

Examples of **correct** code for this rule (with default options):

```js
import { LoaderIcon } from 'lucide-react'
```

## Options

### `preferred`

- Type: `'LoaderIcon' | 'Loader2Icon'`
- Default: `'LoaderIcon'`

Which loader icon to enforce.

```js
// Prefer Loader2Icon instead
'@nelsonlaidev/lucide-prefer-loader-icon': ['error', { preferred: 'Loader2Icon' }]
```

## When Not To Use It

If your project does not use `lucide-react` or you have no preference between the two loader icons.
