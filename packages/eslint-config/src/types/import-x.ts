export type NoNamespaceOptions = {
  /**
   * A list of module names to ignore for the `no-namespace` rule.
   *
   * @default []
   */
  ignore?: string[]
}

export type NoUnassignedImportOptions = {
  /**
   * A list of glob patterns to allow for the `no-unassigned-import` rule.
   *
   * @default []
   */
  allow?: string[]
}

/**
 * Import-x configuration options.
 */
export type ImportXOptions = {
  /**
   * Configuration for the `no-namespace` rule.
   *
   * See [official docs](https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-namespace.md) for more details.
   */
  noNamespace?: NoNamespaceOptions

  /**
   * Configuration for the `no-unassigned-import` rule.
   *
   * See [official docs](https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-unassigned-import.md) for more details.
   */
  noUnassignedImport?: NoUnassignedImportOptions
}
