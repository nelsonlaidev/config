# @nelsonlaidev/eslint-config

## 2.0.3

### Patch Changes

- 4355b1d: Always use separate lines for multiline comments

## 2.0.2

### Patch Changes

- fcd5816: Allow eslint-disable and eslint-enable ESLint comments

## 2.0.1

### Patch Changes

- 221325c: Correct react filename rule

## 2.0.0

### Major Changes

- 5c376ed: Remove `eslint-plugin-jsdoc`

### Minor Changes

- 9270103: Add `@stylistic/eslint-plugin` plugin and rules

## 1.1.0

### Minor Changes

- 8e4c4e9: Allow adding user configurations

## 1.0.0

### Major Changes

- 4168b2a: Re-configure some rules
  - Remove `n/prefer-global/buffer`
  - Remove `n/prefer-global/process`
  - Disable `@eslint-react/no-complex-conditional-rendering`
  - Disable `@eslint-react/no-array-index-key`
  - Disable `@typescript-eslint/no-floating-promises`
  - Disable `@typescript-eslint/no-unsafe-member-access`
  - Disable `@typescript-eslint/no-unsafe-assignment`
  - Disable `@typescript-eslint/no-non-null-assertion`
  - Disable `unicorn/no-null`

- 4168b2a: Update node plugin rules

### Minor Changes

- 4168b2a: Disable `@typescript-eslint/consistent-type-definitions` rule
- 4168b2a: Make tsconfigRootDir optional
- 4168b2a: Allow rule overrides for each plugin in ESLint config
- 4168b2a: Disable `@eslint-react/avoid-shorthand-boolean` rule
- 4168b2a: Remove `eslint-plugin-react-refresh` plugin
- 4168b2a: Configure some rules
  - `@eslint-community/eslint-comments/no-use` allows `eslint-disable-next-line`
  - `@eslint-react/naming-convention/filename` enforces kebab-case
  - `@eslint-react/avoid-shorthand-fragment` is turned off
  - `react-refresh/only-export-components` allows some Next.js specific export names

### Patch Changes

- 4168b2a: Remove `consistent-type-specifier-style` rule from import-lite
- 4168b2a: `eslint-plugin-better-tailwindcss` setting name correction
- 4168b2a: Remove unnecessary nullish coalescing
- e0ea602: Update package.json to match ESM-only style
- 4168b2a: Make all configs to be functions
  - Move types to types.ts for better organization
  - Rename `types.d.ts` to `global.d.ts`

- 4168b2a: Enable rules manually for better-tailwindcss

## 0.0.2

### Patch Changes

- 714f933: Fix type errors
  - Add documentation to ESLint `Option` type
  - Export useful globs
  - Remove `FlatConfigComposer` and renaming plugins
  - Remove duplicated imports in ESLint plugin declaration
  - Update README instructions

## 0.0.1

### Patch Changes

- 03bd2f6: Initial release
