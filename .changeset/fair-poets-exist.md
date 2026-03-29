---
'@nelsonlaidev/oxlint-config': minor
---

Refactor `defineConfig` to accept a single options object instead of positional arguments.

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
