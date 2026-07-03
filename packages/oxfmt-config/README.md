# @nelsonlaidev/oxfmt-config

[![Version](https://img.shields.io/npm/v/@nelsonlaidev/oxfmt-config?style=flat&colorA=111111&colorB=000000)](https://npmx.dev/package/@nelsonlaidev/oxfmt-config)
[![Downloads](https://img.shields.io/npm/dt/@nelsonlaidev/oxfmt-config.svg?style=flat&colorA=222222&colorB=000000)](https://npmx.dev/package/@nelsonlaidev/oxfmt-config)
[![License](https://img.shields.io/npm/l/@nelsonlaidev/oxfmt-config?style=flat&colorA=333333&colorB=000000)](https://github.com/nelsonlaidev/config/blob/main/LICENSE)

Personal Oxfmt configurations for Nelson Lai projects.

## Installation

```bash
npm i -D @nelsonlaidev/oxfmt-config
```

Create an `oxfmt.config.ts` file with the following content:

```ts
import { defineConfig } from '@nelsonlaidev/oxfmt-config'

export default defineConfig({
  // Custom Oxfmt configuration options
})
```

### What's Included

This config applies the following opinionated defaults:

- Single quotes
- JSX single quotes
- No semicolons
- 120 character print width
