import type { Linter } from 'eslint'

/**
 * ESLint configuration options.
 */
export type ConfigOptions = {
  /**
   * The absolute or relative path to the root directory that contains
   * the `tsconfig.json`. Used to resolve TypeScript configuration.
   */
  tsconfigRootDir: string
  /**
   * Enable additional linting rules optimized for React projects.
   */
  react?: boolean
  /**
   * Enable additional linting rules optimized for Next.js projects.
   * Automatically implies React linting as well.
   */
  nextjs?: boolean
  /**
   * Path to the main entry file of your Tailwind CSS setup.
   * Enabling this also turns on ESLint rules related to Tailwind CSS.
   */
  tailwindEntryPoint?: string
  /**
   * Glob patterns that match your Vitest test files.
   * When provided, ESLint rules for Vitest will be enabled.
   */
  vitestGlob?: string
  /**
   * Glob patterns that match your Playwright test files.
   * When provided, ESLint rules for Playwright will be enabled.
   */
  playwrightGlob?: string
  /**
   * A list of file paths or glob patterns to be ignored by ESLint.
   */
  ignores?: string[]
}

export type FlatConfig = Linter.Config
