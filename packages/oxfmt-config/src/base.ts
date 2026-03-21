import type { OxfmtConfig } from 'oxfmt'

export const defineConfig = (config: OxfmtConfig = {}): OxfmtConfig => ({
  singleQuote: true,
  jsxSingleQuote: true,
  semi: false,
  printWidth: 120,
  ...config,
})
