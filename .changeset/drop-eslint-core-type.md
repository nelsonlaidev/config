---
'@nelsonlaidev/eslint-config': patch
---

Drop `@eslint/core` dependency, use built-in `Linter.RuleEntry` type from ESLint instead of `RuleConfig` for rule severity handling.
