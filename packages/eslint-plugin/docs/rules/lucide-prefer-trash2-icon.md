# lucide-prefer-trash2-icon

Enforce using `Trash2Icon` instead of `TrashIcon` from `lucide-react` for better visual consistency.

## Rule Details

Lucide provides two trash icons: `TrashIcon` and `Trash2Icon`. This rule enforces a consistent choice between the two across your codebase.

By default, `Trash2Icon` is preferred.

### Examples

Examples of **incorrect** code for this rule (with default options):

```js
import { TrashIcon } from 'lucide-react'
```

Examples of **correct** code for this rule (with default options):

```js
import { Trash2Icon } from 'lucide-react'
```

## Options

### `preferred`

- Type: `'Trash2Icon' | 'TrashIcon'`
- Default: `'Trash2Icon'`

Which trash icon to enforce.

```js
// Prefer TrashIcon instead
'@nelsonlaidev/lucide-prefer-trash2-icon': ['error', { preferred: 'TrashIcon' }]
```

## When Not To Use It

If your project does not use `lucide-react` or you have no preference between the two trash icons.
