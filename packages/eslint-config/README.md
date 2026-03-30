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
  // Enable React specific linting rules
  react?: boolean
  // Optional
  // Enable Next.js specific linting rules
  nextjs?: boolean
  // Optional
  // Configure Tailwind CSS ESLint rules
  tailwindcss?: {
    // Path to the main entry point of your Tailwind CSS setup
    entryPoint?: string
    // Path to your tailwind.config.ts file
    tailwindConfig?: string
    // Path to your tsconfig.json file
    tsconfig?: string
    detectComponentClasses?: boolean
    rootFontSize?: number
    messageStyle?: 'visual' | 'compact' | 'raw'
    selectors?: Selectors
    canonical?: {
      collapse?: boolean
      logical?: boolean
    }
    classOrder?: {
      order?: 'asc' | 'desc' | 'official' | 'strict'
      componentOrder?: 'asc' | 'desc' | 'preserve'
      componentPosition?: 'start' | 'end'
      unknownOrder?: 'asc' | 'desc' | 'preserve'
      unknownPosition?: 'start' | 'end'
    }
    restrict?: Array<string | { pattern: string; message?: string; fix?: string }>
    ignore?: string[]
    whitespace?: {
      allowMultiline?: boolean
    }
  }
  // Optional
  // Configure JSX accessibility linting rules
  jsxA11y?: {
    // jsx-a11y plugin options
    a11y?: {
      // Custom component to native element mappings
      // Example: { Button: 'button', Link: 'a' }
      components?: Record<string, string>
      // Custom attribute mappings
      attributes?: {
        for?: string[]
      }
      // Polymorphic component prop name (e.g., 'as' or 'component')
      polymorphicPropName?: string
      // List of allowed polymorphic component types
      polymorphicAllowList?: string[]
    }
  }
  // Optional
  // Configure Vitest (also enable ESLint rules for vitest)
  vitest?: {
    // Specify files/globs for Vitest
    files: Array<string | string[]>
  }
  // Optional
  // Configure Playwright (also enable ESLint rules for playwright)
  playwright?: {
    // Specify files/globs for Playwright
    files: Array<string | string[]>
    assertFunctionNames?: string[]
    assertFunctionPatterns?: string[]
  }
  // Optional
  // Disable ESLint rules that conflict with Prettier
  // Defaults to true if Prettier is installed
  prettier?: boolean
  // Optional
  // Specify files to ignore
  ignores?: string[]
}
```
