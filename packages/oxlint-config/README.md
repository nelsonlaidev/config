# @nelsonlaidev/oxlint-config

Personal Oxlint configurations for Nelson Lai projects.

This package is synced from `eslint-config` and aims to enable every supported Oxlint rule that is also enabled in `eslint-config`.

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

This package follows `eslint-config` as the source of truth. When a rule is enabled there, we enable the corresponding Oxlint rule here when Oxlint supports it.

`unused-imports` is intentionally not included. That plugin requires type information, and Oxlint `jsPlugins` does not support that currently.

If you are using pnpm, add the following to your `.npmrc` to hoist ESLint plugin dependencies so the Oxlint can resolve them:

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
