---
'@nelsonlaidev/eslint-config': major
---

Restore and undeprecate `@nelsonlaidev/eslint-config`, and refresh the shared preset against the previous `3.7.1` release.

This release includes a few breaking option changes:

- Rename the `jsx` option to `jsxA11y`.
- Rename Tailwind CSS options to the new shape: `canonicalClasses` -> `canonical`, `consistentClassOrder` -> `classOrder`, `noRestrictedClasses` -> `restrict`, `noUnknownClasses` -> `ignore`, and `noUnnecessaryWhitespace` -> `whitespace`.
- Simplify the `playwright` options to only accept `files`, `assertFunctionNames`, and `assertFunctionPatterns`.

It also updates the preset behavior by enabling `unused-imports`, splitting several setup and rules configs for clearer composition, tightening some `import-x` and React rules, and refreshing the underlying ESLint plugin dependency set.

Migration guide:

```ts
// Before
defineConfig({
  jsx: {
    a11y: {
      components: {
        Link: 'a',
      },
    },
  },
})

// After
defineConfig({
  jsxA11y: {
    a11y: {
      components: {
        Link: 'a',
      },
    },
  },
})
```

```ts
// Before
defineConfig({
  tailwindcss: {
    canonicalClasses: {
      logical: true,
    },
    consistentClassOrder: {
      order: 'official',
    },
    noRestrictedClasses: {
      restrict: ['container'],
    },
    noUnknownClasses: {
      ignore: ['prose-custom'],
    },
    noUnnecessaryWhitespace: {
      allowMultiline: true,
    },
  },
})

// After
defineConfig({
  tailwindcss: {
    canonical: {
      logical: true,
    },
    classOrder: {
      order: 'official',
    },
    restrict: ['container'],
    ignore: ['prose-custom'],
    whitespace: {
      allowMultiline: true,
    },
  },
})
```

```ts
// Before
defineConfig({
  playwright: {
    files: ['e2e/**/*.spec.ts'],
    expectExpect: {
      assertFunctionNames: ['expectStatus'],
    },
    validTitle: {
      disallowedWords: ['only'],
    },
  },
})

// After
defineConfig({
  playwright: {
    files: ['e2e/**/*.spec.ts'],
    assertFunctionNames: ['expectStatus'],
  },
})
```
