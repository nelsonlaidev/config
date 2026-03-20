import type { OxlintConfig } from 'oxlint'
import type { PlaywrightConfig } from './playwright'
import type { TailwindCSSConfig } from './tailwindcss'
import type { VitestConfig } from './vitest'

export type DefaultConfig = Required<
  Pick<OxlintConfig, 'options' | 'env' | 'ignorePatterns' | 'overrides' | 'settings'>
> &
  OxlintConfig

export type CustomConfig = {
  nextjs?: boolean
  react?: boolean
  tailwindcss?: TailwindCSSConfig
  vitest?: VitestConfig
  playwright?: PlaywrightConfig
}
