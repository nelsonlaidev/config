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
  // Optional
  // Override specific ESLint rules for each plugin
  overrides?: {
    javascript?: Record<string, any>
    sonarjs?: Record<string, any>
    importSort?: Record<string, any>
    deMorgan?: Record<string, any>
    comments?: Record<string, any>
    node?: Record<string, any>
    imports?: Record<string, any>
    unicorn?: Record<string, any>
    jsx?: Record<string, any>
    typescript?: Record<string, any>
    regexp?: Record<string, any>
    vitest?: Record<string, any>
    playwright?: Record<string, any>
    react?: Record<string, any>
    nextjs?: Record<string, any>
    tailwindcss?: Record<string, any>
    prettier?: Record<string, any>
    stylistic?: Record<string, any>
    zod?: Record<string, any>
  }
}
```
