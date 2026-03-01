---
'@nelsonlaidev/eslint-config': minor
---

Update ESLint plugin dependencies and migrate `eslint-plugin-better-tailwindcss` to v4.3.1 API

The `TailwindCSSOptions` type has been updated to reflect breaking changes in `eslint-plugin-better-tailwindcss@4.3.1`. The separate `attributes`, `callees`, `variables`, and `tags` options have been replaced by a single unified `selectors` option.

**Breaking change for `tailwindcss` config users:** Replace your `attributes`, `callees`, `variables`, and `tags` options with the new `selectors` option. See the [plugin docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/settings/settings.md#selectors) for details.

Also bumps the following dependencies to their latest versions:

- `@eslint-react/eslint-plugin` `^2.8.1` → `^2.13.0`
- `@stylistic/eslint-plugin` `^5.7.1` → `^5.9.0`
- `@typescript-eslint/eslint-plugin` `^8.54.0` → `^8.56.1`
- `@typescript-eslint/parser` `^8.54.0` → `^8.56.1`
- `@vitest/eslint-plugin` `^1.6.6` → `^1.6.9`
- `eslint-config-flat-gitignore` `^2.1.0` → `^2.2.1`
- `eslint-plugin-command` `^3.4.0` → `^3.5.2`
- `eslint-plugin-de-morgan` `^2.0.0` → `^2.1.1`
- `eslint-plugin-n` `^17.23.2` → `^17.24.0`
- `eslint-plugin-playwright` `^2.5.1` → `^2.8.0`
- `eslint-plugin-sonarjs` `^3.0.6` → `^4.0.0`
- `eslint-plugin-unicorn` `^62.0.0` → `^63.0.0`
- `eslint-plugin-unused-imports` `^4.3.0` → `^4.4.1`
- `globals` `^17.2.0` → `^17.4.0`
