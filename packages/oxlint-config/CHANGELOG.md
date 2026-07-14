# @nelsonlaidev/oxlint-config

## 1.0.0

### Major Changes

- 11c97c1: Refactor the package around explicit, composable Oxlint overrides.

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

## 0.4.0

### Minor Changes

- 30e58fa: Refactor built-in presets to handle array-form rule options and numeric severity.
- 30e58fa: Stop injecting default and custom `better-tailwindcss` selectors in shared configs. Consumers can now provide `tailwindcss.selectors` explicitly when they need custom class detection.
- 30e58fa: Add `cwd` setting support for `better-tailwindcss`, bump eslint plugin dependencies to latest versions, add `enforce-consistent-variant-order` tailwindcss rule, disable `@eslint-react/static-components` (not production-ready), disable `sonarjs/assertions-in-tests`.

### Patch Changes

- Updated dependencies [30e58fa]
  - @nelsonlaidev/eslint-plugin@0.2.5

## 0.3.2

### Patch Changes

- 5db9f96: Sync `eslint-recommended` off rules from typescript ESLint config to oxlint config, properly disabling conflicting ESLint core rules (e.g. `no-undef`, `no-redeclare`, `constructor-super`) in TypeScript files.

## 0.3.1

### Patch Changes

- 856e6b4: Avoid importing optional Oxlint `jsPlugins` at package load time by snapshotting plugin recommended rules and Tailwind selector defaults into generated local data. Required default `jsPlugins` are now marked as non-optional peer dependencies, while conditional presets can remain optional.

## 0.3.0

### Minor Changes

- d8dd387: Add eslint-plugin-command via Oxlint jsPlugins for comment-as-command codemod support

### Patch Changes

- 11ab540: List Oxlint `jsPlugins` as optional peer dependencies while keeping them as development dependencies.

## 0.2.5

### Patch Changes

- 392e4e7: Explicitly disable oxlint default-enabled `correctness` rules not present in the ESLint config, preventing oxlint from warning about rules like `jsx-a11y/prefer-tag-over-role` that ESLint does not run
- ef2dc9e: restore custom role options for `jsx-a11y/no-noninteractive-element-to-interactive-role` and enable `regexp/prefer-regex-literals` (oxlint 1.71.0 fixed both issues)

## 0.2.4

### Patch Changes

- 22bae21: Sync rules from ESLint configs with oxlint 1.70.0, including new rules for eslint, imports, jsx-a11y, unicorn, and vitest scopes.
  - Remove jest fallback for vitest rules (oxlint now natively supports them under the vitest scope)
  - Enable `no-unused-vars` with `fix.imports: "safe-fix"` to auto-remove unused imports
  - Add `sync:check` (rules diff between ESLint source and Oxlint target, including jsPlugins)
  - Add `sync:report --write` (migration gap table in README)
  - Update unscanned ESLint plugins documentation in README

## 0.2.3

### Patch Changes

- a4f0df4: Omit `prefer-regex-literals` from regexp recommended rules (not supported by Oxlint)

## 0.2.2

### Patch Changes

- ba83ece: Enable additional ESLint, Unicorn, and Vitest rules supported by newer oxlint releases.

## 0.2.1

### Patch Changes

- be33f74: Document that the Oxlint config is synced from `eslint-config`, enables matching supported Oxlint rules, and intentionally excludes `unused-imports` because Oxlint `jsPlugins` does not currently support the required type information.
- a88623f: Clarify the pnpm hoisting note in the README by removing the unsupported bun guidance.
- Updated dependencies [d84896c]
  - @nelsonlaidev/eslint-plugin@0.2.4

## 0.2.0

### Minor Changes

- 6c5f03c: Refactor `defineConfig` to accept a single options object instead of positional arguments.

  You can now configure oxlint options and custom presets with named fields:

  ```ts
  defineConfig({
    config: {
      ignorePatterns: ['dist'],
    },
    custom: {
      react: true,
    },
  })
  ```

  This replaces the previous positional API:

  ```ts
  defineConfig({ ignorePatterns: ['dist'] }, { react: true })
  ```

  The new shape also makes custom-only configuration cleaner by avoiding placeholder `undefined` or `{}` values for the first argument.

## 0.1.4

### Patch Changes

- 3f9327b: Export the `OxlintConfig` type from the package entrypoint.

## 0.1.3

### Patch Changes

- Updated dependencies [75762a5]
  - @nelsonlaidev/eslint-plugin@0.2.3

## 0.1.2

### Patch Changes

- b56c6b0: Align development tooling with shared catalog versions and remove the unused local eslint dependency.
- Updated dependencies [35dea48]
  - @nelsonlaidev/eslint-plugin@0.2.2

## 0.1.1

### Patch Changes

- Updated dependencies [36c824e]
  - @nelsonlaidev/eslint-plugin@0.2.1

## 0.1.0

### Minor Changes

- e3faba1: Add `@nelsonlaidev/oxlint-config` package with opinionated Oxlint configurations including rules for oxc, eslint, typescript, unicorn, promise, node, jsx-a11y, import, jsdoc, stylistic, de-morgan, zod, regexp, sonarjs, and conditional support for react, nextjs, vitest, playwright, and tailwindcss.
