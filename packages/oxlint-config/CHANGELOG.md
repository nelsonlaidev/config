# @nelsonlaidev/oxlint-config

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
