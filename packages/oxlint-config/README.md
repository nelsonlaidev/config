# @nelsonlaidev/oxlint-config

Personal OxLint configurations for Nelson Lai projects.

## Installation

```bash
npm i -D @nelsonlaidev/oxlint-config oxlint
```

Create an `oxlint.config.ts` file with the following content:

```ts
import { defineConfig } from '@nelsonlaidev/oxlint-config'

export default defineConfig({
  // Custom OxLint configuration options
})
```

### Notes

If you are using pnpm, add the following to your `.npmrc` to hoist ESLint plugin dependencies so the Oxc VS Code extension can resolve them:

```ini
public-hoist-pattern[]=*eslint-plugin*
```

### What's Included

This config includes opinionated rules from the following plugins:

- `oxc`
- `eslint`
- `typescript`
- `unicorn`
- `promise`
- `node`
- `nextjs`
- `jsx-a11y`
- `import`
- `jsdoc`
- `react`
- `vitest`
