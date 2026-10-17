# lucide-restrict-import

Restrict specific imports from `lucide-react` and suggest preferred alternatives.

## Rule Details

This rule allows you to restrict certain `lucide-react` icon imports and auto-fix them to preferred alternatives. By default, it prefers `LoaderCircleIcon` over both `Loader2Icon` and `LoaderIcon`, and `TrashIcon` over `Trash2Icon`.

### Examples

Examples of **incorrect** code for this rule (with default options):

```js
import { Loader2Icon } from 'lucide-react'
import { LoaderIcon } from 'lucide-react'
import { Trash2Icon } from 'lucide-react'
```

Examples of **correct** code for this rule (with default options):

```js
import { LoaderCircleIcon } from 'lucide-react'
import { TrashIcon } from 'lucide-react'
```

## Options

### `restrictions`

An array of restriction objects. Each object has:

- `name` (required): The import name to restrict
- `preferred` (required): The preferred alternative import name
- `message` (optional): A custom error message

### Default Options

```json
{
  "restrictions": [
    { "name": "Loader2Icon", "preferred": "LoaderCircleIcon" },
    { "name": "LoaderIcon", "preferred": "LoaderCircleIcon" },
    { "name": "Trash2Icon", "preferred": "TrashIcon" }
  ]
}
```

> **Note:** Custom options **replace** the defaults entirely — they are not merged. See [Options & Defaults](../defaults.md) for details on how to extend them.

Example with custom restrictions:

```json
{
  "@nelsonlaidev/lucide-restrict-import": [
    "error",
    {
      "restrictions": [
        { "name": "Loader2Icon", "preferred": "LoaderIcon" },
        { "name": "Trash2Icon", "preferred": "TrashIcon" },
        { "name": "Edit2Icon", "preferred": "PencilIcon", "message": "Use PencilIcon for editing actions." }
      ]
    }
  ]
}
```

## When Not To Use It

If your project does not use `lucide-react` or you don't need to enforce specific icon import preferences.

## Further Reading

- [Lucide React documentation](https://lucide.dev/guide/packages/lucide-react)
