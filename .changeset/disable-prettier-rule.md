---
'@nelsonlaidev/eslint-config': patch
---

Replace `eslint-plugin-prettier` with `eslint-config-prettier`. This change removes the `prettier/prettier` ESLint rule which was causing significant performance issues. The new approach simply disables ESLint rules that conflict with Prettier, while letting Prettier handle formatting separately. This provides better performance while maintaining compatibility between ESLint and Prettier.
