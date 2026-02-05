---
'@nelsonlaidev/eslint-config': major
---

Refactor Tailwind CSS configuration to support more customization options.

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
