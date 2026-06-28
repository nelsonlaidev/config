---
'@nelsonlaidev/oxlint-config': patch
---

Sync `eslint-recommended` off rules from typescript ESLint config to oxlint config, properly disabling conflicting ESLint core rules (e.g. `no-undef`, `no-redeclare`, `constructor-super`) in TypeScript files.
