# @nelsonlaidev/oxlint-config

[![Version](https://img.shields.io/npm/v/@nelsonlaidev/oxlint-config?style=flat&colorA=111111&colorB=000000)](https://npmx.dev/package/@nelsonlaidev/oxlint-config)
[![Downloads](https://img.shields.io/npm/dt/@nelsonlaidev/oxlint-config.svg?style=flat&colorA=222222&colorB=000000)](https://npmx.dev/package/@nelsonlaidev/oxlint-config)
[![License](https://img.shields.io/npm/l/@nelsonlaidev/oxlint-config?style=flat&colorA=333333&colorB=000000)](https://github.com/nelsonlaidev/config/blob/main/LICENSE)

Personal Oxlint configurations for Nelson Lai projects.

This package is synced from `eslint-config` and aims to enable every supported Oxlint rule that is also enabled in `eslint-config`.

## Installation

```bash
npm i -D @nelsonlaidev/oxlint-config oxlint oxlint-tsgolint
```

`oxlint-tsgolint` is optional — it enables type-aware linting rules. Omit it if you set `typeAware: false` in your config.

Some presets use Oxlint `jsPlugins`. These are declared as peer dependencies and most modern package managers (npm >=7, pnpm, yarn) install them automatically. Only run the command below if your package manager does not auto-install peers:

```bash
npm i -D @nelsonlaidev/eslint-plugin @stylistic/eslint-plugin eslint-plugin-command eslint-plugin-de-morgan eslint-plugin-import-zod eslint-plugin-regexp eslint-plugin-simple-import-sort eslint-plugin-sonarjs
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

### What's Included

This config includes opinionated rules from the following plugins:

#### Always enabled

- `oxc`
- `eslint`
- `command`
- `typescript`
- `unicorn`
- `promise`
- `node`
- `jsx-a11y`
- `import`
- `jsdoc`
- `nelsonlaidev`
- `stylistic`
- `de-morgan`
- `zod`
- `regexp`
- `sonarjs`
- `import-sort`

#### Conditionally enabled

- `react` — auto-detected or via `react` option
- `nextjs` — auto-detected or via `nextjs` option
- `vitest` — via `vitest` option
- `playwright` — via `playwright` option
- `tailwindcss` — via `tailwindcss` option

## Migration Status

<!-- sync:report-start -->

### Sync Summary

| Preset                                            | Synced | Dropped | Classified | Unclassified | Coverage |
| ------------------------------------------------- | -----: | ------: | ---------: | -----------: | -------: |
| `command/nelsonlaidev/command/rules`              |      1 |       0 |          0 |            0 |   100.0% |
| `de-morgan/nelsonlaidev/de-morgan/rules`          |      2 |       0 |          0 |            0 |   100.0% |
| `eslint/nelsonlaidev/javascript/rules`            |     93 |       2 |          2 |            0 |   100.0% |
| `import-sort/nelsonlaidev/import-sort/rules`      |      2 |       0 |          0 |            0 |   100.0% |
| `imports/nelsonlaidev/import-x/rules`             |     20 |       6 |          6 |            0 |    84.6% |
| `jsdoc/nelsonlaidev/jsdoc/rules`                  |      2 |       0 |          0 |            0 |   100.0% |
| `jsx-a11y/nelsonlaidev/jsx-a11y/rules`            |     35 |       1 |          1 |            0 |   100.0% |
| `nelsonlaidev/nelsonlaidev/nelsonlaidev/rules`    |      5 |       0 |          0 |            0 |   100.0% |
| `nextjs/nelsonlaidev/nextjs/rules`                |     21 |       0 |          0 |            0 |   100.0% |
| `node/nelsonlaidev/node/rules`                    |      2 |       4 |          4 |            0 |    50.0% |
| `playwright/nelsonlaidev/playwright/rules`        |     36 |       0 |          0 |            0 |   100.0% |
| `promise/nelsonlaidev/promise/rules`              |     16 |       1 |          1 |            0 |   100.0% |
| `react/nelsonlaidev/react/rules`                  |     99 |       0 |          0 |            0 |   100.0% |
| `regexp/nelsonlaidev/regexp/rules`                |     67 |       0 |          0 |            0 |   100.0% |
| `sonarjs/nelsonlaidev/sonarjs/rules`              |    268 |       0 |          0 |            0 |   100.0% |
| `stylistic/nelsonlaidev/stylistic/rules`          |      1 |       0 |          0 |            0 |   100.0% |
| `tailwindcss/nelsonlaidev/tailwindcss/rules`      |     12 |       0 |          0 |            0 |   100.0% |
| `typescript/nelsonlaidev/typescript/rules`        |    117 |      21 |         21 |            0 |   100.0% |
| `typescript/nelsonlaidev/typescript/declarations` |      2 |       0 |          0 |            0 |   100.0% |
| `unicorn/nelsonlaidev/unicorn/rules`              |    134 |     195 |        195 |            0 |    41.0% |
| `vitest/nelsonlaidev/vitest/rules`                |     20 |       0 |          0 |            0 |   100.0% |
| `zod/nelsonlaidev/zod/rules`                      |      1 |       0 |          0 |            0 |   100.0% |

### Unclassified Dropped Rules

No unclassified dropped rules.

<!-- sync:report-end -->

### Configs Not Migrated

| Config              | Reason                                                          |
| ------------------- | --------------------------------------------------------------- |
| `comments.ts`       | Plugin that comments out eslint-disable directives              |
| `gitignore.ts`      | File-based ignores, handled by Oxlint config                    |
| `ignores.ts`        | File ignore patterns                                            |
| `prettier.ts`       | Formatting concern, handled by oxfmt                            |
| `unused-imports.ts` | Replaced by Oxlint built-in `no-unused-vars` with `fix.imports` |
