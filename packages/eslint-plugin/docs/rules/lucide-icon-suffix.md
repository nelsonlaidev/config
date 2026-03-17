# lucide-icon-suffix

Enforce using the `Icon` suffixed version of `lucide-react` imports (e.g., `HomeIcon` instead of `Home`).

## Rule Details

Lucide exports each icon with both a short name and an `Icon`-suffixed name. This rule enforces consistent usage of either the suffixed or unsuffixed version for clarity.

Non-icon exports like `createLucideIcon`, `LucideProps`, and `icons` are not affected by this rule.

### Examples

Examples of **incorrect** code for this rule (default `suffix: 'with'`):

```js
import { Home } from 'lucide-react'
import { Home, Search } from 'lucide-react'
```

Examples of **correct** code for this rule (default `suffix: 'with'`):

```js
import { HomeIcon } from 'lucide-react'
import { HomeIcon, SearchIcon } from 'lucide-react'
import { createLucideIcon } from 'lucide-react'
```

Examples of **incorrect** code with `suffix: 'without'`:

```js
import { HomeIcon } from 'lucide-react'
import { HomeIcon, SearchIcon } from 'lucide-react'
```

Examples of **correct** code with `suffix: 'without'`:

```js
import { Home } from 'lucide-react'
import { Home, Search } from 'lucide-react'
```

## Options

### `suffix`

- `'with'`: Enforce using the `Icon` suffix (e.g., `HomeIcon`)
- `'without'`: Enforce using the version without the `Icon` suffix (e.g., `Home`)

### Default Options

```json
{
  "suffix": "with"
}
```

Example using the unsuffixed variant:

```json
{
  "@nelsonlaidev/lucide-icon-suffix": ["error", { "suffix": "without" }]
}
```

## When Not To Use It

If your project does not use `lucide-react` or you don't want to enforce a consistent icon import style.

## Further Reading

- [Lucide React documentation](https://lucide.dev/guide/packages/lucide-react)
