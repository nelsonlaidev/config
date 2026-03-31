# @nelsonlaidev/prettier-config

Personal Prettier configurations for Nelson Lai projects.

## Installation

```bash
npm i -D @nelsonlaidev/prettier-config
```

Create a `prettier.config.js` file with the following content:

```js
import { defineConfig } from '@nelsonlaidev/prettier-config'

export default defineConfig({
  // Custom Prettier configuration options
})
```

### Notes

If you are using pnpm, add the following to your `.npmrc` to hoist the bundled Prettier plugin dependency so Prettier can resolve it:

```ini
public-hoist-pattern[]=*prettier-plugin*
```
