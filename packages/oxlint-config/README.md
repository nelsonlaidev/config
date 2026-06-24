# @nelsonlaidev/oxlint-config

Personal Oxlint configurations for Nelson Lai projects.

This package is synced from `eslint-config` and aims to enable every supported Oxlint rule that is also enabled in `eslint-config`.

## Installation

```bash
npm i -D @nelsonlaidev/oxlint-config oxlint oxlint-tsgolint
```

`oxlint-tsgolint` is optional — it enables type-aware linting rules. Omit it if you set `typeAware: false` in your config.

Some presets use Oxlint `jsPlugins`. Install the peer plugin packages for the presets you use:

```bash
npm i -D @eslint-react/eslint-plugin @nelsonlaidev/eslint-plugin @stylistic/eslint-plugin eslint-plugin-better-tailwindcss eslint-plugin-de-morgan eslint-plugin-import-zod eslint-plugin-playwright eslint-plugin-react-hooks eslint-plugin-regexp eslint-plugin-simple-import-sort eslint-plugin-sonarjs
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

`unused-imports` is intentionally not included. Oxlint's built-in `no-unused-vars` rule with `fix.imports: "safe-fix"` accomplishes the same goal natively.

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

## Migration Status

<!-- sync:report-start -->

### Synced (auto-generated)

| Preset                               | Synced | Total | Coverage |
| ------------------------------------ | ------ | ----- | -------- |
| `eslint/javascript/rules`            | 93     | 95    | 97.9%    |
| `unicorn/unicorn/rules`              | 125    | 133   | 94.0%    |
| `typescript/typescript/rules`        | 94     | 108   | 87.0%    |
| `typescript/typescript/declarations` | 2      | 2     | 100.0%   |
| `import/import-x/rules`              | 17     | 23    | 73.9%    |
| `jsdoc/jsdoc/rules`                  | 2      | 2     | 100.0%   |
| `vitest/vitest/rules`                | 20     | 20    | 100.0%   |
| `jsx-a11y/jsx-a11y/rules`            | 33     | 33    | 100.0%   |
| `nextjs/nextjs/rules`                | 21     | 21    | 100.0%   |
| `promise/promise/rules`              | 15     | 15    | 100.0%   |
| `node/node/rules`                    | 2      | 6     | 33.3%    |

### Manually maintained (diff-only)

These use `jsPlugins` and are checked for consistency via `sync:check`.

- `regexp`
- `playwright`
- `sonarjs`
- `zod`
- `command`
- `stylistic`
- `de-morgan`
- `tailwindcss`
- `react`
- `nelsonlaidev`

### Unscanned ESLint plugins

| Config              | Reason                                                          |
| ------------------- | --------------------------------------------------------------- |
| `comments.ts`       | Plugin that comments out eslint-disable directives              |
| `gitignore.ts`      | File-based ignores, handled by Oxlint config                    |
| `ignores.ts`        | File ignore patterns                                            |
| `import-sort.ts`    | Replaced by Oxlint built-in `import/sort`                       |
| `prettier.ts`       | Formatting concern, handled by oxfmt                            |
| `unused-imports.ts` | Replaced by Oxlint built-in `no-unused-vars` with `fix.imports` |

<!-- sync:report-end -->
