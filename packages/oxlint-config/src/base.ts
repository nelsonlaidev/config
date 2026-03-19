import type { OxlintConfig } from 'oxlint'

import { deMorgan } from './de-morgan'
import { eslint } from './eslint'
import { importSort } from './import-sort'
import { imports } from './imports'
import { jsdoc } from './jsdoc'
import { jsxA11y } from './jsx-a11y'
import { nelsonlaidev } from './nelsonlaidev'
import { nextjs } from './nextjs'
import { node } from './node'
import { oxc } from './oxc'
import { playwright } from './playwright'
import { promise } from './promise'
import { react } from './react'
import { regexp } from './regexp'
import { sonarjs } from './sonarjs'
import { stylistic } from './stylistic'
import { typescript } from './typescript'
import { unicorn } from './unicorn'
import { unusedImports } from './unused-imports'
import { vitest } from './vitest'
import { zod } from './zod'

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
