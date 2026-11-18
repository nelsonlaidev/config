---
'@nelsonlaidev/typescript-config': major
---

Enable `allowImportingTsExtensions` in the base preset so imports can use explicit
TypeScript extensions such as `./module.ts`.

Projects that use `tsc` to emit JavaScript must set
`rewriteRelativeImportExtensions: true` (TypeScript 5.7 or later) to rewrite
relative imports, or set `allowImportingTsExtensions: false` to keep their
existing JavaScript import paths.
