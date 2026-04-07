---
'@nelsonlaidev/eslint-config': minor
---

Add a `typescriptResolver` option.

- Configure `import-x` to use `eslint-import-resolver-typescript` with monorepo-friendly default project globs.
- Allow overriding resolver behavior through `defineConfig({ typescriptResolver })`.
- Document resolver defaults and customization in the package README.
