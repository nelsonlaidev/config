import type { Linter } from 'eslint'
import type { TypeScriptResolverOptions } from 'eslint-import-resolver-typescript'
import type { JsxA11yConfigOptions } from './jsx-a11y'
import type { PlaywrightOptions } from './playwright'
import type { TailwindCSSOptions } from './tailwindcss'
import type { VitestOptions } from './vitest'

/**
 * ESLint configuration options.
 */
export type ConfigOptions = {
  /**
   * Enable additional ESLint rules optimized for React projects.
   */
  react?: boolean
  /**
   * Enable additional ESLint rules optimized for Next.js projects.
   */
  nextjs?: boolean
  /**
   * Tailwind CSS configuration options.
   *
   * Providing this object (with any of its options) automatically enables ESLint rules related to Tailwind CSS.
   */
  tailwindcss?: TailwindCSSOptions
  /**
   * JSX accessibility configuration options.
   */
  jsxA11y?: JsxA11yConfigOptions
  /**
   * Vitest configuration options.
   *
   * Providing this object (with any of its options) automatically enables ESLint rules related to Vitest.
   */
  vitest?: VitestOptions
  /**
   * Playwright configuration options.
   *
   * Providing this object (with any of its options) automatically enables ESLint rules related to Playwright.
   */
  playwright?: PlaywrightOptions
  /**
   * Turn off all rules that are unnecessary or might conflict when using Prettier.
   *
   * Defaults to true if Prettier is installed.
   */
  prettier?: boolean
  /**
   * A list of file paths or glob patterns that ESLint should ignore.
   */
  ignores?: string[]
  /**
   * TypeScript import resolver configuration options.
   *
   * Providing this object allows customizing how TypeScript resolves imports,
   * useful for monorepos or custom project structures.
   */
  typescriptResolver?: TypeScriptResolverOptions
}

export type FlatConfig = Linter.Config
