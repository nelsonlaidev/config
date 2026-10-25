# @nelsonlaidev/typescript-config

[![Version](https://img.shields.io/npm/v/@nelsonlaidev/typescript-config?style=flat&colorA=333333&colorB=000000)](https://npmx.dev/package/@nelsonlaidev/typescript-config)
[![Downloads](https://img.shields.io/npm/dt/@nelsonlaidev/typescript-config.svg?style=flat&colorA=333333&colorB=000000)](https://npmx.dev/package/@nelsonlaidev/typescript-config)
[![License](https://img.shields.io/npm/l/@nelsonlaidev/typescript-config?style=flat&colorA=333333&colorB=000000)](https://github.com/nelsonlaidev/config/blob/main/LICENSE)

Personal TypeScript configurations for Nelson Lai projects.

## Installation

```bash
npm i -D @nelsonlaidev/typescript-config
```

Create a `tsconfig.json` file with the following content:

```jsonc
{
  "extends": "@nelsonlaidev/typescript-config/base.json",
  "compilerOptions": {
    // Custom TypeScript configuration options
  },
}
```

### Presets

You can also use predefined presets for your configuration.

- `@nelsonlaidev/typescript-config/base.json`
- `@nelsonlaidev/typescript-config/library.json`
- `@nelsonlaidev/typescript-config/nextjs.json`
- `@nelsonlaidev/typescript-config/react-library.json`
- `@nelsonlaidev/typescript-config/tanstack-start.json`

### Explicit types

Presets do not set `compilerOptions.types`. Configure the types your project needs
in your own `tsconfig.json`.

For example, TanStack Start projects that need Vite client types should add them
explicitly:

```json
{
  "extends": "@nelsonlaidev/typescript-config/tanstack-start.json",
  "compilerOptions": {
    "types": ["vite/client"]
  }
}
```

### React CSS custom properties

To allow CSS custom properties in React's `CSSProperties`, add the optional React
type augmentation to `compilerOptions.types`:

```json
{
  "extends": "@nelsonlaidev/typescript-config/react-library.json",
  "compilerOptions": {
    "types": ["@nelsonlaidev/typescript-config/react"]
  }
}
```

Your project must provide React and `@types/react`. Keep any other required entries
such as `node` or `vite/client` in the same `types` array.

```typescript
import type { CSSProperties } from 'react'

const style: CSSProperties = {
  '--accent-color': 'rebeccapurple',
  '--spacing': 8,
  '--optional': undefined,
}
```

### Migrating to v2

The `tanstack-start.json` preset no longer includes `vite/client` in
`compilerOptions.types`. Add it explicitly to your project's `types` array if you
rely on Vite client types. The React CSS custom property augmentation is optional
and must also be enabled explicitly as shown above.
