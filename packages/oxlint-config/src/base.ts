import type { OxlintConfig } from 'oxlint'

import { eslint } from './eslint'
import { imports } from './imports'
import { jsdoc } from './jsdoc'
import { jsxA11y } from './jsx-a11y'
import { nextjs } from './nextjs'
import { node } from './node'
import { oxc } from './oxc'
import { promise } from './promise'
import { react } from './react'
import { typescript } from './typescript'
import { unicorn } from './unicorn'

export const defineConfig = (config: OxlintConfig = {}): OxlintConfig => ({
  ...config,
  overrides: [
    ...oxc,
    ...eslint,
    ...typescript,
    ...unicorn,
    ...promise,
    ...node,
    ...nextjs,
    ...jsxA11y,
    ...imports,
    ...jsdoc,
    ...react,
    ...(config.overrides ?? []),
  ],
})
