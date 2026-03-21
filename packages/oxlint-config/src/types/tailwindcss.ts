import type { Selectors } from 'eslint-plugin-better-tailwindcss/types'

export type TailwindCSSConfig = {
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/settings/settings.md#entrypoint) for more details.
   */
  entryPoint?: string
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/settings/settings.md#tailwindconfig) for more details.
   */
  tailwindConfig?: string
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/settings/settings.md#tsconfig) for more details.
   */
  tsconfig?: string
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/settings/settings.md#detectcomponentclasses) for more details.
   * @default false
   */
  detectComponentClasses?: boolean
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/settings/settings.md#rootfontsize) for more details.
   * @default 16
   */
  rootFontSize?: number
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/settings/settings.md#messagestyle) for more details.
   */
  messageStyle?: 'visual' | 'compact' | 'raw'
  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/settings/settings.md#selectors) for more details.
   */
  selectors?: Selectors

  canonical?: {
    /**
     * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-canonical-classes.md#collapse) for more details.
     * @default true
     */
    collapse?: boolean
    /**
     * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-canonical-classes.md#logical) for more details.
     * @default true
     */
    logical?: boolean
  }

  classOrder?: {
    /**
     * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-consistent-class-order.md#order) for more details.
     * @default 'official'
     */
    order?: 'asc' | 'desc' | 'official' | 'strict'
    /**
     * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-consistent-class-order.md#componentClassOrder) for more details.
     * @default 'preserve'
     */
    componentOrder?: 'asc' | 'desc' | 'preserve'
    /**
     * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-consistent-class-order.md#componentClassPosition) for more details.
     * @default 'start'
     */
    componentPosition?: 'start' | 'end'
    /**
     * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-consistent-class-order.md#unknownClassOrder) for more details.
     * @default 'preserve'
     */
    unknownOrder?: 'asc' | 'desc' | 'preserve'
    /**
     * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-consistent-class-order.md#unknownClassPosition) for more details.
     * @default 'start'
     */
    unknownPosition?: 'start' | 'end'
  }

  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/no-restricted-classes.md#restrict) for more details.
   * @default []
   */
  restrict?: string[] | Array<{ pattern: string; message?: string; fix?: string }>

  /**
   * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/no-unknown-classes.md#ignore) for more details.
   * @default []
   */
  ignore?: string[]

  whitespace?: {
    /**
     * See [official docs](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/no-unnecessary-whitespace.md#allowMultiline) for more details.
     * @default true
     */
    allowMultiline?: boolean
  }
}
