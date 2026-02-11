import type { Config } from 'prettier'

export const defineConfig = (config: Config = {}): Config => {
  const { plugins = [], ...rest } = config

  return {
    arrowParens: 'always',
    singleQuote: true,
    jsxSingleQuote: true,
    tabWidth: 2,
    semi: false,
    trailingComma: 'all',
    endOfLine: 'lf',
    plugins: ['prettier-plugin-packagejson', ...plugins],
    printWidth: 120,
    ...rest
  }
}
