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
    // Additional rule options...
  }
  // Optional
  // Configure JSX and accessibility linting rules
  jsx?: {
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
    // Alias globals for Playwright's test runner functions
    globalAliases?: {
      test?: string[]
      expect?: string[]
    }
    // Custom messages used by Playwright plugin rules
    messages?: Record<string, string | undefined>
    // Rule options
    expectExpect?: {
      assertFunctionNames?: string[]
      assertFunctionPatterns?: string[]
    }
    maxNestedDescribe?: {
      max?: number
    }
    missingPlaywrightAwait?: {
      customMatchers?: string[]
    }
    noSkippedTest?: {
      allowConditional?: boolean
    }
    validExpect?: {
      minArgs?: number
      maxArgs?: number
    }
    validTitle?: {
      ignoreSpaces?: boolean
      ignoreTypeOfStepName?: boolean
      ignoreTypeOfTestName?: boolean
      ignoreTypeOfDescribeName?: boolean
      disallowedWords?: string[]
      mustNotMatch?: Partial<Record<'describe' | 'test', string>> | string
      mustMatch?: Partial<Record<'describe' | 'test', string>> | string
    }
    validTestTags?: {
      allowedTags?: (string | RegExp)[]
      disallowedTags?: (string | RegExp)[]
    }
  }
  // Optional
  // Specify files to ignore
  ignores?: string[]
}
```
