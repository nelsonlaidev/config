import type { OxlintConfig } from 'oxlint'

import { deMorgan } from './configs/de-morgan'
import { eslint } from './configs/eslint'
import { importSort } from './configs/import-sort'
import { imports } from './configs/imports'
import { jsdoc } from './configs/jsdoc'
import { jsxA11y } from './configs/jsx-a11y'
import { nelsonlaidev } from './configs/nelsonlaidev'
import { nextjs } from './configs/nextjs'
import { node } from './configs/node'
import { oxc } from './configs/oxc'
import { playwright } from './configs/playwright'
import { promise } from './configs/promise'
import { react } from './configs/react'
import { regexp } from './configs/regexp'
import { sonarjs } from './configs/sonarjs'
import { stylistic } from './configs/stylistic'
import { typescript } from './configs/typescript'
import { unicorn } from './configs/unicorn'
import { unusedImports } from './configs/unused-imports'
import { vitest } from './configs/vitest'
import { zod } from './configs/zod'

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
    ...vitest,
    ...nelsonlaidev,
    ...stylistic,
    ...deMorgan,
    ...zod,
    ...playwright,
    ...regexp,
    ...sonarjs,
    ...unusedImports,
    ...importSort,
    ...(config.overrides ?? []),
  ],
})
