# @nelsonlaidev/eslint-config

[![Version](https://img.shields.io/npm/v/@nelsonlaidev/eslint-config?style=flat&colorA=333333&colorB=000000)](https://npmx.dev/package/@nelsonlaidev/eslint-config)
[![Downloads](https://img.shields.io/npm/dt/@nelsonlaidev/eslint-config.svg?style=flat&colorA=333333&colorB=000000)](https://npmx.dev/package/@nelsonlaidev/eslint-config)
[![License](https://img.shields.io/npm/l/@nelsonlaidev/eslint-config?style=flat&colorA=333333&colorB=000000)](https://github.com/nelsonlaidev/config/blob/main/LICENSE)

Personal ESLint configurations for Nelson Lai projects.

## Installation

```bash
npm i -D @nelsonlaidev/eslint-config
```

## Usage

Create an `eslint.config.ts` file. The base configuration includes the shared JavaScript, TypeScript, accessibility, import, and code-quality rules:

```ts
import { defineConfig } from '@nelsonlaidev/eslint-config'

export default defineConfig()
```

Pass project-specific flat configuration objects directly to `defineConfig()`:

```ts
import { defineConfig } from '@nelsonlaidev/eslint-config'

export default defineConfig({
  files: ['scripts/**/*.ts'],
  rules: {
    'no-console': 'off',
  },
})
```

### Optional presets

Framework and tool integrations are explicit. Import the presets you need and pass them in the order they should be applied:

```ts
import { defineConfig, nextjs, playwright, prettier, react, tailwindcss, vitest } from '@nelsonlaidev/eslint-config'

export default defineConfig(
  vitest({
    files: ['**/*.test.{js,jsx,ts,tsx}'],
  }),
  playwright({
    files: ['**/e2e/**/*.test.{js,jsx,ts,tsx}'],
  }),
  react(),
  nextjs(),
  tailwindcss({
    settings: {
      'better-tailwindcss': {
        entryPoint: './src/globals.css',
      },
    },
  }),
  // Keep Prettier last so it can disable conflicting rules.
  prettier(),
)
```

Available optional presets are `react()`, `nextjs()`, `tailwindcss()`, `vitest()`, `playwright()`, and `prettier()`.

Each preset accepts an ESLint flat configuration override. Arrays are replaced, nested objects are merged, and plugin maps are combined:

```ts
export default defineConfig(
  react({
    rules: {
      '@eslint-react/immutability': 'warn',
    },
  }),
)
```

When enabling Vitest or Playwright, provide `files` unless you intentionally want their rules to apply to every linted file.

### Base options

Use `defineConfig.withOptions()` only when changing options consumed while the base configuration is created:

```ts
import { defineConfig, react } from '@nelsonlaidev/eslint-config'

export default defineConfig.withOptions(
  {
    ignores: ['coverage/**', 'generated/**'],
    typescriptResolver: {
      alwaysTryTypes: true,
      bun: true,
      project: ['packages/foo/tsconfig.json'],
    },
  },
  react(),
)
```

The available base options are:

```ts
type ConfigOptions = {
  ignores?: string[]
  typescriptResolver?: import('eslint-import-resolver-typescript').TypeScriptResolverOptions
}
```

By default, the TypeScript import resolver scans these locations:

- `{ts,js}config.json`
- `apps/**/{ts,js}config.json`
- `packages/**/{ts,js}config.json`

Refer to the [eslint-import-resolver-typescript](https://github.com/import-js/eslint-import-resolver-typescript) documentation for all resolver options.
