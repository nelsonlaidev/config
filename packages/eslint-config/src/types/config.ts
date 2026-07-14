import type { Linter } from 'eslint'
import type { TypeScriptResolverOptions } from 'eslint-import-resolver-typescript'

/**
 * ESLint configuration options.
 */
export type ConfigOptions = {
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
