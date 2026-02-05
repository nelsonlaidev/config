---
'@nelsonlaidev/eslint-config': major
---

Replace vitest/playwright glob options with option objects passed to their config helpers.

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
