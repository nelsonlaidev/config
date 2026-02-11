---
'@nelsonlaidev/eslint-config': patch
---

Disable `prettier/prettier` ESLint rule in the Prettier config to improve performance. Prettier handles formatting directly, so ESLint doesn't need to check for it. The `prettier/prettier` rule was significantly slowing down ESLint runs.
