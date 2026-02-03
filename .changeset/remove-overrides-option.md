---
'@nelsonlaidev/eslint-config': major
---

Remove `overrides` configuration option from ESLint config

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
