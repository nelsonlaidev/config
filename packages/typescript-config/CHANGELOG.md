# @nelsonlaidev/typescript-config

## 1.0.0

### Major Changes

- 4089f83: - Enhanced `nextjs.json` with explicit compiler options for better Next.js compatibility:
  - Set `target` to `ES2017` for broader browser support
  - Added `lib` array with `ESNext`, `DOM`, and `DOM.Iterable`
  - Explicitly configured `module` as `ESNext` and `moduleResolution` as `Bundler`
  - Enabled `allowJs`, `skipLibCheck`, `strict`, and `noEmit`
  - Configured `esModuleInterop`, `resolveJsonModule`, and `isolatedModules`
  - Set `incremental` to `true` for faster builds
  - Disabled `declaration` and `declarationMap` for Next.js projects

## 0.0.3

### Patch Changes

- e0ea602: Update README

## 0.0.2

### Patch Changes

- 714f933: Update README

## 0.0.1

### Patch Changes

- 03bd2f6: Initial release
