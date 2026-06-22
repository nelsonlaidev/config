---
'@nelsonlaidev/oxlint-config': patch
---

Explicitly disable oxlint default-enabled `correctness` rules not present in the ESLint config, preventing oxlint from warning about rules like `jsx-a11y/prefer-tag-over-role` that ESLint does not run
