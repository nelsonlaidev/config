---
'@nelsonlaidev/eslint-config': major
---

Remove `tsconfigRootDir` configuration option

The `tsconfigRootDir` option has been removed from the configuration API. The TypeScript configuration now automatically uses `process.cwd()` as the root directory. Users no longer need to specify this option.

```ts
// Before
export default defineConfig({
  tsconfigRootDir: import.meta.dirname
})

// After
export default defineConfig()
```
