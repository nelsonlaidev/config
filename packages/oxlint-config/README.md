# @nelsonlaidev/oxlint-config

Personal Oxlint configurations for Nelson Lai projects.

## Installation

```bash
npm i -D @nelsonlaidev/oxlint-config oxlint
```

Create an `oxlint.config.ts` file with the following content:

```ts
import { defineConfig } from '@nelsonlaidev/oxlint-config'

export default defineConfig({
  config: {
    // Custom OxLint configuration options
  },
  custom: {
    react: true,
  },
})
```

### Notes

If you are using pnpm/bun, add the following to your `.npmrc` to hoist ESLint plugin dependencies so the Oxlint can resolve them:

```ini
public-hoist-pattern[]=*eslint-plugin*
```

### What's Included

This config includes opinionated rules from the following plugins:

#### Always enabled

- `oxc`
- `eslint`
- `typescript`
- `unicorn`
- `promise`
- `node`
- `jsx-a11y`
- `import` / `import-sort`
- `jsdoc`
- `stylistic`
- `de-morgan`
- `zod`
- `regexp`
- `sonarjs`

#### Conditionally enabled

- `react` — auto-detected or via `react` option
- `nextjs` — auto-detected or via `nextjs` option
- `vitest` — via `vitest` option
- `playwright` — via `playwright` option
- `tailwindcss` — via `tailwindcss` option
