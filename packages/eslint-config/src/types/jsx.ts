export type JsxOptions = {
  a11y?: JsxA11yOptions
}

export type JsxA11yOptions = {
  /**
   * See [official docs](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/main?tab=readme-ov-file#component-mapping) for more details.
   */
  components?: Record<string, string>
  /**
   * See [official docs](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/main?tab=readme-ov-file#attribute-mapping) for more details.
   */
  attributes?: {
    for?: string[]
  }
  /**
   * See [official docs](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/main?tab=readme-ov-file#polymorphic-components) for more details.
   */
  polymorphicPropName?: string
  /**
   * See [official docs](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/main?tab=readme-ov-file#polymorphic-components) for more details.
   */
  polymorphicAllowList?: string[]
}
