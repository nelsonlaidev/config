import type { JsxOptions } from './jsx'
import type { PlaywrightOptions } from './playwright'
import type { TailwindCSSOptions } from './tailwindcss'
import type { VitestOptions } from './vitest'
import type { Linter } from 'eslint'

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
   *
   * This option also automatically enables React rules.
   */
  nextjs?: boolean
  /**
   * Tailwind CSS configuration options.
   *
   * Providing this object (with any of its options) automatically enables ESLint rules related to Tailwind CSS.
   */
  tailwindcss?: TailwindCSSOptions
  /**
   * JSX configuration options.
   */
  jsx?: JsxOptions
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
   * A list of file paths or glob patterns that ESLint should ignore.
   */
  ignores?: string[]
}

export type FlatConfig = Linter.Config
