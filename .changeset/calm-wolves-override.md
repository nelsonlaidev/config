---
'@nelsonlaidev/oxlint-config': major
---

Refactor the package around explicit, composable Oxlint overrides.

This release includes the following breaking changes:

- `defineConfig()` now accepts a native `OxlintConfig` object directly. The previous `{ config, custom }` wrapper has been removed.
- React and Next.js are no longer enabled automatically when their packages are installed.
- Optional integrations are no longer enabled through `custom.react`, `custom.nextjs`, `custom.vitest`, `custom.playwright`, or `custom.tailwindcss`.
- The `react`, `nextjs`, `tailwindcss`, `vitest`, and `playwright` preset factories are now exported from the package root. Add their returned `OxlintOverride` objects to the root `overrides` array explicitly.
- Optional preset factories now accept a native partial `OxlintOverride`. Use it to replace `files`, add plugins, or override rules.
- The specialized `PlaywrightConfig`, `TailwindCSSConfig`, and `VitestConfig` types have been removed.
- Tailwind CSS plugin settings must now be configured through the root Oxlint `settings` object. Rule options can be overridden through `tailwindcss({ rules: { ... } })`.
- Every generated preset now returns one `OxlintOverride` object instead of an array. The TypeScript declaration-file rules are maintained as a separate override internally.
- Rules are resynchronized with `@nelsonlaidev/eslint-config`. Tailwind CSS rules now use their plugin defaults, and React rules that require type information are omitted because Oxlint JavaScript plugins do not support type-aware rules.

Before:

```ts
import { defineConfig } from '@nelsonlaidev/oxlint-config'

export default defineConfig({
  config: {
    ignorePatterns: ['generated/**'],
  },
  custom: {
    react: true,
    nextjs: true,
    tailwindcss: {
      entryPoint: './src/globals.css',
    },
    vitest: {
      files: ['**/*.test.ts'],
    },
  },
})
```

After:

```ts
import { defineConfig, nextjs, react, tailwindcss, vitest } from '@nelsonlaidev/oxlint-config'

export default defineConfig({
  ignorePatterns: ['generated/**'],
  settings: {
    'better-tailwindcss': {
      entryPoint: './src/globals.css',
    },
  },
  overrides: [
    react(),
    nextjs(),
    tailwindcss(),
    vitest({
      files: ['**/*.test.ts'],
    }),
    playwright({
      files: ['e2e/**/*.spec.ts'],
    }),
  ],
})
```
