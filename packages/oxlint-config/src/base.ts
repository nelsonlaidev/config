import type { OxlintConfig } from 'oxlint'

import { jsxA11y } from './jsx-a11y'
import { nextjs } from './nextjs'
import { node } from './node'
import { promise } from './promise'
import { typescript } from './typescript'
import { unicorn } from './unicorn'

export const defineConfig = (config: OxlintConfig = {}): OxlintConfig => ({
  ...config,
  extends: [typescript, unicorn, promise, node, nextjs, jsxA11y, ...(config.extends ?? [])],
})
