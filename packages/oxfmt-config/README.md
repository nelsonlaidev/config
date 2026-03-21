# @nelsonlaidev/oxfmt-config

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
