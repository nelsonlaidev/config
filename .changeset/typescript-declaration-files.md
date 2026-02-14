---
'@nelsonlaidev/eslint-config': patch
---

Disable `@typescript-eslint/consistent-type-definitions` and `@typescript-eslint/consistent-indexed-object-style` rules in `.d.ts` declaration files. These rules are disabled to allow using interfaces in declaration files, which is necessary when extending types from other packages that use interfaces.
