import type { Linter } from 'eslint'

/**
 * ESLint configuration options.
 */
export type ConfigOptions = {
  /**
   * The absolute or relative path to the root directory that contains
   * the `tsconfig.json`. Used to resolve TypeScript configuration.
   */
  tsconfigRootDir?: string
  /**
   * Enable additional ESLint rules optimized for React projects.
   */
  react?: boolean
  /**
   * Enable additional ESLint rules optimized for Next.js projects.
   * This option also automatically enables React rules.
   */
  nextjs?: boolean
  /**
   * Path to the main entry point of your Tailwind CSS setup.
   * Enabling this also turns on ESLint rules related to Tailwind CSS.
   */
  tailwindEntryPoint?: string
  /**
   * Glob patterns for your Vitest test files.
   * When provided, ESLint rules for Vitest will be enabled.
   */
  vitestGlob?: string
  /**
   * Glob patterns for your Playwright test files.
   * When provided, ESLint rules for Playwright will be enabled.
   */
  playwrightGlob?: string
  /**
   * A list of file paths or glob patterns that ESLint should ignore.
   */
  ignores?: string[]
  /**
   * Override specific ESLint rules for each plugin.
   */
  overrides?: Overrides
}

export type RuleOverrides = Linter.Config['rules']

export type Overrides = {
  javascript?: RuleOverrides
  sonarjs?: RuleOverrides
  importSort?: RuleOverrides
  deMorgan?: RuleOverrides
  comments?: RuleOverrides
  node?: RuleOverrides
  jsdoc?: RuleOverrides
  imports?: RuleOverrides
  unicorn?: RuleOverrides
  jsx?: RuleOverrides
  typescript?: RuleOverrides
  regexp?: RuleOverrides
  vitest?: RuleOverrides
  playwright?: RuleOverrides
  react?: RuleOverrides
  nextjs?: RuleOverrides
  tailwindcss?: RuleOverrides
  prettier?: RuleOverrides
}

export type FlatConfig = Linter.Config
