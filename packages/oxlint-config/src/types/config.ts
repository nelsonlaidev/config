import type { PlaywrightConfig } from './playwright'
import type { TailwindCSSConfig } from './tailwindcss'
import type { VitestConfig } from './vitest'

export type CustomConfig = {
  nextjs?: boolean
  react?: boolean
  tailwindcss?: TailwindCSSConfig
  vitest?: VitestConfig
  playwright?: PlaywrightConfig
}
