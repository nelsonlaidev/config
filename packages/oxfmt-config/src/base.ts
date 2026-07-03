import type { OxfmtConfig } from 'oxfmt'

export const defineConfig = (config: OxfmtConfig = {}): OxfmtConfig => {
  const { ignorePatterns = [], ...rest } = config
  return {
    singleQuote: true,
    jsxSingleQuote: true,
    semi: false,
    printWidth: 120,
    ignorePatterns: ['**/routeTree.gen.ts', ...ignorePatterns],
    ...rest,
  }
}
