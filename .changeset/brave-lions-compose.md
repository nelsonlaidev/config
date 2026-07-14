---
'@nelsonlaidev/eslint-config': major
---

Refactor the package around an explicit, composable ESLint flat-config API.

## Breaking changes

- `defineConfig()` no longer accepts framework and tool options. Pass project-specific flat configs and optional presets directly as arguments instead.
- React, Next.js, and Prettier are no longer enabled automatically when their packages are installed. Enable every optional integration explicitly.
- The `react`, `nextjs`, `tailwindcss`, `vitest`, `playwright`, and `prettier` preset factories are now exported from the package root.
- Optional preset factories now accept an ESLint flat config object for overrides. Configure `files`, `settings`, `rules`, and other ESLint fields using their native flat-config shapes.
- The specialized `JsxA11yConfigOptions`, `PlaywrightOptions`, `TailwindCSSOptions`, and `VitestOptions` types have been removed.
- React and Tailwind CSS presets do not set `files`, so they apply to every file matched by ESLint unless a `files` override is provided. Vitest and Playwright should normally receive an explicit `files` override as well.
- Prettier conflict rules are only enabled when `prettier()` is passed explicitly. Keep it last so it can disable rules added by earlier configs.
- Config names have been consolidated from separate setup and rules entries to `nelsonlaidev/<preset>` names.

Use `defineConfig.withOptions(options, ...configs)` for the two options consumed while creating the base config: `ignores` and `typescriptResolver`.

Before:

```ts
import { defineConfig } from '@nelsonlaidev/eslint-config'

export default defineConfig({
  ignores: ['generated/**'],
  react: true,
  nextjs: true,
  tailwindcss: {
    entryPoint: './src/globals.css',
  },
  vitest: {
    files: ['**/*.test.ts'],
  },
  prettier: true,
})
```

After:

```ts
import { defineConfig, nextjs, prettier, react, tailwindcss, vitest } from '@nelsonlaidev/eslint-config'

export default defineConfig.withOptions(
  {
    ignores: ['generated/**'],
  },
  react(),
  nextjs(),
  tailwindcss({
    settings: {
      'better-tailwindcss': {
        entryPoint: './src/globals.css',
      },
    },
  }),
  vitest({
    files: ['**/*.test.ts'],
  }),
  prettier(),
)
```

Projects that do not need base options can use the shorter form:

```ts
export default defineConfig(react(), nextjs(), prettier())
```
