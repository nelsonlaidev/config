# @nelsonlaidev/eslint-config

## 3.0.0

### Major Changes

- e0457bb: Refactor Tailwind CSS configuration to support more customization options.

  The `tailwindEntryPoint` option has been replaced with a more flexible `tailwindcss` object that accepts comprehensive configuration options:

  ```ts
  // Before
  export default defineConfig({
    tailwindEntryPoint: './src/globals.css'
  })

  // After
  export default defineConfig({
    tailwindcss: {
      entryPoint: './src/globals.css',
      tailwindConfig: './tailwind.config.ts',
      tsconfig: './tsconfig.json',
      canonicalClasses: { logical: true },
      consistentClassOrder: { order: 'official' },
      consistentLineWrapping: { printWidth: 120 },
      noUnknownClasses: { ignore: [] },
      noRestrictedClasses: { restrict: [] },
      noUnnecessaryWhitespace: { allowMultiline: true }
    }
  })
  ```

  All Tailwind CSS rule options are now individually configurable with sensible defaults applied automatically.

- e0457bb: Remove `overrides` configuration option from ESLint config

  The `overrides` option has been removed. Users should now pass custom ESLint configurations directly via the spread parameter in `defineConfig()`:

  ```ts
  // Before
  export default defineConfig({
    overrides: {
      typescript: { '@typescript-eslint/no-explicit-any': 'off' }
    }
  })

  // After
  export default defineConfig(
    {},
    {
      rules: {
        '@typescript-eslint/no-explicit-any': 'off'
      }
    }
  )
  ```

- e0457bb: Remove `tsconfigRootDir` configuration option

  The `tsconfigRootDir` option has been removed from the configuration API. The TypeScript configuration now automatically uses `process.cwd()` as the root directory. Users no longer need to specify this option.

  ```ts
  // Before
  export default defineConfig({
    tsconfigRootDir: import.meta.dirname
  })

  // After
  export default defineConfig()
  ```

- e0457bb: Replace vitest/playwright glob options with option objects passed to their config helpers.

  ```ts
  // Before
  export default defineConfig({
    vitestGlob: 'tests/**/*.test.{ts,tsx}',
    playwrightGlob: 'e2e/**/*.spec.{ts,tsx}'
  })

  // After
  export default defineConfig({
    vitest: {
      files: 'tests/**/*.test.{ts,tsx}'
    },
    playwright: {
      files: 'e2e/**/*.spec.{ts,tsx}'
    }
  })
  ```

### Minor Changes

- e0457bb: Add JSX configuration options for customizing accessibility linting rules.

  You can now customize JSX accessibility settings through the new `jsx` configuration option:

  ```ts
  // Example usage
  export default defineConfig({
    jsx: {
      a11y: {
        // Map custom components to native elements
        components: {
          Button: 'button',
          CustomLink: 'a',
          CustomImage: 'img'
        },
        // Configure polymorphic components
        polymorphicPropName: 'as',
        polymorphicAllowList: ['div', 'span']
      }
    }
  })
  ```

  This allows you to configure jsx-a11y plugin settings including:
  - Custom component to native element mappings
  - Custom attribute mappings
  - Polymorphic component configuration

- e0457bb: Add Playwright rule option types and defaults for expect-expect, max-nested-describe, missing-playwright-await, no-skipped-test, valid-expect, valid-title, and valid-test-tags.

### Patch Changes

- e0457bb: Improve type safety with satisfies operator and add missing default value documentation
- e0457bb: Change JSX a11y rules from strict to recommended preset.

  The JSX configuration now uses `jsxA11yPlugin.flatConfigs.recommended.rules` instead of `jsxA11yPlugin.flatConfigs.strict.rules`, providing a more balanced set of accessibility rules while maintaining essential checks.

- e0457bb: Update JSDoc documentation

## 2.5.1

### Patch Changes

- 5dd5188: Remove incompatible ESLint plugin type declarations
- 5dd5188: Bump dependencies:

  | Package                                         | Old      | New      |
  | ----------------------------------------------- | -------- | -------- |
  | @eslint-community/eslint-plugin-eslint-comments | ^4.5.0   | ^4.6.0   |
  | @eslint-react/eslint-plugin                     | ^2.3.5   | ^2.8.1   |
  | @eslint/config-inspector                        | ^1.3.0   | ^1.4.2   |
  | @eslint/js                                      | ^9.39.1  | ^9.39.2  |
  | @next/eslint-plugin-next                        | ^16.0.3  | ^16.1.6  |
  | @stylistic/eslint-plugin                        | ^5.5.0   | ^5.7.1   |
  | @typescript-eslint/eslint-plugin                | ^8.46.4  | ^8.54.0  |
  | @typescript-eslint/parser                       | ^8.46.4  | ^8.54.0  |
  | @vitest/eslint-plugin                           | ^1.4.2   | ^1.6.6   |
  | eslint                                          | ^9.39.1  | ^9.39.2  |
  | eslint-plugin-better-tailwindcss                | ^3.7.10  | ^4.0.2   |
  | eslint-plugin-command                           | ^3.3.1   | ^3.4.0   |
  | eslint-plugin-import-lite                       | ^0.3.0   | ^0.5.0   |
  | eslint-plugin-n                                 | ^17.23.1 | ^17.23.2 |
  | eslint-plugin-playwright                        | ^2.3.0   | ^2.5.1   |
  | eslint-plugin-prettier                          | ^5.5.4   | ^5.5.5   |
  | eslint-plugin-regexp                            | ^2.10.0  | ^3.0.0   |
  | eslint-plugin-sonarjs                           | ^3.0.5   | ^3.0.6   |
  | globals                                         | ^16.5.0  | ^17.2.0  |
  | tsdown                                          | ^0.16.4  | ^0.20.1  |

- 5dd5188: Removing custom callees for better-tailwindcss
- 5dd5188: eslint-plugin-regexp:
  - import rules from the 'recommended' config instead of 'flat/recommended'

- 5dd5188: Update better-tailwindcss rules for v4 plugin

## 2.5.0

### Minor Changes

- 9a6caf2: - Make `tsconfigRootDir` option optional with automatic `process.cwd()` default
  - Add error handling for package detection (React/Next.js)
  - Document `overrides` configuration option with all available keys
  - Enhance comments explaining Unicode escape usage in import sorting

## 2.4.5

### Patch Changes

- 7aa9826: Disable the following rules:
  - jsx-a11y/anchor-ambiguous-text
  - jsx-a11y/prefer-tag-over-role
  - sonarjs/prefer-read-only-props

## 2.4.4

### Patch Changes

- 61cfd4f: Disable unicorn/prefer-string-raw

## 2.4.3

### Patch Changes

- a1e8c76: Configure @typescript-eslint/no-empty-object-type to allow interfaces with single extends

## 2.4.2

### Patch Changes

- 0423a5c: Configure @typescript-eslint/only-throw-error rule for tanstack

## 2.4.1

### Patch Changes

- 44c92da: Disable sonarjs/function-return-type rule as it's unnecessary

## 2.4.0

### Minor Changes

- 927446d: Prepare for Tanstack Start

## 2.3.3

### Patch Changes

- 19b13f7: Disable the following rules:

  ## React
  - @eslint-react/naming-convention/use-state
  - @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
  - react-hooks/set-state-in-effect
  - react-hooks/static-components

  ## SonarJS
  - sonarjs/pseudo-random

  ## Unicorn
  - unicorn/no-document-cookie

## 2.3.2

### Patch Changes

- f6e2d37: Update the following dependencies:
  - `@eslint-react/eslint-plugin` from `^1.52.6` to `^2.3.5`
  - `@eslint/js` from `^9.34.0` to `^9.39.1`
  - `@next/eslint-plugin-next` from `^16.0.0` to `^16.0.3`
  - `@stylistic/eslint-plugin` from `^5.3.1` to `^5.5.0`
  - `@typescript-eslint/eslint-plugin` from `^8.41.0` to `^8.46.4`
  - `@typescript-eslint/parser` from `^8.41.0` to `^8.46.4`
  - `@vitest/eslint-plugin` from `^1.3.4` to `^1.4.2`
  - `eslint-plugin-better-tailwindcss` from `^3.7.6` to `^3.7.10`
  - `eslint-plugin-de-morgan` from `^1.3.1` to `^2.0.0`
  - `eslint-plugin-import-zod` from `^1.2.0` to `^1.2.1`
  - `eslint-plugin-n` from `^17.21.3` to `^17.23.1`
  - `eslint-plugin-playwright` from `^2.2.2` to `^2.3.0`
  - `eslint-plugin-react-hooks` from `^5.2.0` to `^7.0.1`
  - `eslint-plugin-unicorn` from `^60.0.0` to `^62.0.0`
  - `eslint-plugin-unused-imports` from `^4.2.0` to `^4.3.0`
  - `globals` from `^16.3.0` to `^16.5.0`

- f6e2d37: Update export file extensions to .mjs and .d.mts

## 2.3.1

### Patch Changes

- 4f616d7: Bump @next/eslint-plugin-next

## 2.3.0

### Minor Changes

- 1db5fc1: Support class-variance-authority beta version

## 2.2.0

### Minor Changes

- 33315cf: Add `eslint-plugin-import-zod` ESLint plugin

## 2.1.1

### Patch Changes

- ab57eac: Disable unnecessary rule:
  - `@next/next/no-html-link-for-pages`

## 2.1.0

### Minor Changes

- 33e94d4: Enable the following rules:
  - @typescript-eslint/consistent-type-exports: error
  - @typescript-eslint/no-import-type-side-effects: error

## 2.0.4

### Patch Changes

- b4cd720: Disable some sonarjs rules due to the performance issue
  - sonarjs/deprecation
  - sonarjs/arguments-order

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
