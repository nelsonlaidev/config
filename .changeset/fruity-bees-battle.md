---
'@nelsonlaidev/typescript-config': major
---

- Enhanced `nextjs.json` with explicit compiler options for better Next.js compatibility:
  - Set `target` to `ES2017` for broader browser support
  - Added `lib` array with `ESNext`, `DOM`, and `DOM.Iterable`
  - Explicitly configured `module` as `ESNext` and `moduleResolution` as `Bundler`
  - Enabled `allowJs`, `skipLibCheck`, `strict`, and `noEmit`
  - Configured `esModuleInterop`, `resolveJsonModule`, and `isolatedModules`
  - Set `incremental` to `true` for faster builds
  - Disabled `declaration` and `declarationMap` for Next.js projects
