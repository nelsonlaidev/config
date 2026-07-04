# @nelsonlaidev/config

[![License](https://img.shields.io/npm/l/@nelsonlaidev/eslint-config?style=flat&colorA=333333&colorB=000000)](https://github.com/nelsonlaidev/config/blob/main/LICENSE)
[![Built with tsdown](https://img.shields.io/badge/built_with-tsdown-000000?style=flat&colorA=333333)](https://tsdown.dev)
[![Node >=22](https://img.shields.io/badge/node-%3E%3D22-000000?style=flat&colorA=333333)](https://nodejs.org)

Personal configurations for Nelson Lai projects. This monorepo contains shared configuration packages for ESLint, Oxlint, Oxfmt, Prettier, and TypeScript.

## Table of Contents

- [Packages](#packages)
  - [@nelsonlaidev/eslint-config](#nelsonlaideveslint-config)
  - [@nelsonlaidev/oxlint-config](#nelsonlaidevoxlint-config)
  - [@nelsonlaidev/eslint-plugin](#nelsonlaideveslint-plugin)
  - [@nelsonlaidev/oxfmt-config](#nelsonlaidevoxfmt-config)
  - [@nelsonlaidev/prettier-config](#nelsonlaidevprettier-config)
  - [@nelsonlaidev/typescript-config](#nelsonlaidevtypescript-config)
- [Credits](#credits)
- [License](#license)

## Packages

### @nelsonlaidev/eslint-config

Nelson Lai's ESLint config preset. A comprehensive, opinionated ESLint flat configuration with first-class TypeScript and framework support.

```bash
npm i -D @nelsonlaidev/eslint-config
```

```ts
// eslint.config.ts
import { defineConfig } from '@nelsonlaidev/eslint-config'

export default defineConfig({
  react: true,
  nextjs: true,
})
```

[Full Documentation →](packages/eslint-config)

---

### @nelsonlaidev/oxlint-config

Nelson Lai's Oxlint config preset. Synced from `eslint-config`, enabling every supported Oxlint rule.

```bash
npm i -D @nelsonlaidev/oxlint-config oxlint oxlint-tsgolint
```

`oxlint-tsgolint` is optional — enables type-aware linting rules.

```ts
// oxlint.config.ts
import { defineConfig } from '@nelsonlaidev/oxlint-config'

export default defineConfig({
  react: true,
})
```

[Full Documentation →](packages/oxlint-config)

---

### @nelsonlaidev/eslint-plugin

Nelson Lai's ESLint plugin with custom rules for lucide-react, shadcn/ui, and more.

```bash
npm i -D @nelsonlaidev/eslint-plugin
```

[Full Documentation →](packages/eslint-plugin)

---

### @nelsonlaidev/oxfmt-config

Nelson Lai's Oxfmt config preset. Opinionated formatting defaults: single quotes, no semicolons, 120 print width.

```bash
npm i -D @nelsonlaidev/oxfmt-config
```

```ts
// oxfmt.config.ts
import { defineConfig } from '@nelsonlaidev/oxfmt-config'

export default defineConfig({
  // Custom Oxfmt configuration options
})
```

[Full Documentation →](packages/oxfmt-config)

---

### @nelsonlaidev/prettier-config

Nelson Lai's Prettier config preset.

```bash
npm i -D @nelsonlaidev/prettier-config prettier-plugin-packagejson
```

```js
// prettier.config.js
import { defineConfig } from '@nelsonlaidev/prettier-config'

export default defineConfig({
  // Custom Prettier configuration options
})
```

[Full Documentation →](packages/prettier-config)

---

### @nelsonlaidev/typescript-config

Nelson Lai's TypeScript config preset. Shared TSConfig presets for base, library, Next.js, React library, and TanStack Start projects.

```bash
npm i -D @nelsonlaidev/typescript-config
```

```jsonc
// tsconfig.json
{
  "extends": "@nelsonlaidev/typescript-config/base.json",
}
```

[Full Documentation →](packages/typescript-config)

## Credits

This project is inspired by the excellent work from:

- [antfu/eslint-config](https://github.com/antfu/eslint-config)
- [sxzz/eslint-config](https://github.com/sxzz/eslint-config)

## License

[MIT](LICENSE)
