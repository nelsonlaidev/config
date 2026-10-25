---
'@nelsonlaidev/typescript-config': major
---

Remove implicit Vite client types from the TanStack Start preset. Consumers must
add `vite/client` to their own `compilerOptions.types` when needed.

Add an optional React CSS custom property augmentation, enabled through
`"types": ["@nelsonlaidev/typescript-config/react"]`.
