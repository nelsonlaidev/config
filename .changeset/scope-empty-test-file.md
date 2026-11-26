---
'@nelsonlaidev/eslint-config': patch
'@nelsonlaidev/oxlint-config': patch
---

Limit `sonarjs/no-empty-test-file` to JavaScript and TypeScript files with `.spec`, `.test`, or `.cy` before the extension so ordinary source files no longer trigger the rule.
