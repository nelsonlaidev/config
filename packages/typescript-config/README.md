# @nelsonlaidev/typescript-config

[![Version](https://img.shields.io/npm/v/@nelsonlaidev/typescript-config?style=flat&colorA=111111&colorB=000000)](https://npmx.dev/package/@nelsonlaidev/typescript-config)
[![Downloads](https://img.shields.io/npm/dt/@nelsonlaidev/typescript-config.svg?style=flat&colorA=222222&colorB=000000)](https://npmx.dev/package/@nelsonlaidev/typescript-config)
[![License](https://img.shields.io/npm/l/@nelsonlaidev/typescript-config?style=flat&colorA=333333&colorB=000000)](https://github.com/nelsonlaidev/config/blob/main/LICENSE)

Personal TypeScript configurations for Nelson Lai projects.

## Installation

```bash
npm i -D @nelsonlaidev/typescript-config
```

Create a `tsconfig.json` file with the following content:

```jsonc
{
  "extends": "@nelsonlaidev/typescript-config/base.json",
  "compilerOptions": {
    // Custom TypeScript configuration options
  },
}
```

### Presets

You can also use predefined presets for your configuration.

- `@nelsonlaidev/typescript-config/base.json`
- `@nelsonlaidev/typescript-config/library.json`
- `@nelsonlaidev/typescript-config/nextjs.json`
- `@nelsonlaidev/typescript-config/react-library.json`
- `@nelsonlaidev/typescript-config/tanstack-start.json`
