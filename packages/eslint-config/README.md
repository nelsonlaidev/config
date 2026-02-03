# @nelsonlaidev/eslint-config

Personal ESLint configurations for Nelson Lai projects.

## Installation

```bash
npm i -D @nelsonlaidev/eslint-config
```

Create an `eslint.config.ts` file with the following content:

```js
import { defineConfig } from '@nelsonlaidev/eslint-config'

export default defineConfig({
  // Custom ESLint configuration options
})
```

### Options

```ts
type Options = {
  // Optional
  // The root directory of the TypeScript configuration
  // Defaults to process.cwd() if not specified
  tsconfigRootDir?: string
  // Optional
  // Enable React specific linting rules
  react?: boolean
  // Optional
  // Enable Next.js specific linting rules
  nextjs?: boolean
  // Optional
  // Specify the entry point for Tailwind CSS (also enable ESLint rules for tailwindcss)
  tailwindEntryPoint?: string
  // Optional
  // Specify glob patterns for Vitest (also enable ESLint rules for vitest)
  vitestGlob?: string
  // Optional
  // Specify glob patterns for Playwright (also enable ESLint rules for playwright)
  playwrightGlob?: string
  // Optional
  // Specify files to ignore
  ignores?: string[]
}
```
