export type NoNamespaceOptions = {
  /**
   * A list of module names to ignore for the `no-namespace` rule.
   *
   * @default []
   */
  ignore?: string[]
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
}
