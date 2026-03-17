# lucide-icon-suffix

Enforce using the `Icon` suffixed version of `lucide-react` imports (e.g., `HomeIcon` instead of `Home`).

## Rule Details

Lucide exports each icon with both a short name and an `Icon`-suffixed name. This rule enforces consistent usage of the suffixed version for clarity.

Non-icon exports like `createLucideIcon`, `LucideProps`, and `icons` are not affected by this rule.

### Examples

Examples of **incorrect** code for this rule:

```js
import { Home } from 'lucide-react'
import { Home, Search } from 'lucide-react'
```

Examples of **correct** code for this rule:

```js
import { HomeIcon } from 'lucide-react'
import { HomeIcon, SearchIcon } from 'lucide-react'
import { createLucideIcon } from 'lucide-react'
```

## Options

This rule has no options.

## When Not To Use It

If your project does not use `lucide-react` or you prefer the short import names.

## Further Reading

- [Lucide React documentation](https://lucide.dev/guide/packages/lucide-react)
