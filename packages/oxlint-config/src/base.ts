import type { OxlintConfig, OxlintOverride } from 'oxlint'

import { merge } from 'ts-deepmerge'

import { command } from './configs/command'
import { deMorgan } from './configs/de-morgan'
import { eslint } from './configs/eslint'
import { importSort } from './configs/import-sort'
import { imports } from './configs/imports'
import { jsdoc } from './configs/jsdoc'
import { jsxA11y } from './configs/jsx-a11y'
import { nelsonlaidev } from './configs/nelsonlaidev'
import { node } from './configs/node'
import { oxc } from './configs/oxc'
import { promise } from './configs/promise'
import { regexp } from './configs/regexp'
import { sonarjs } from './configs/sonarjs'
import { stylistic } from './configs/stylistic'
import { typescript, typescriptDeclarations } from './configs/typescript'
import { unicorn } from './configs/unicorn'
import { zod } from './configs/zod'

export const defineConfig = (config: OxlintConfig = {}): OxlintConfig => {
  const overrides: OxlintOverride[] = [
    oxc(),
    eslint(),
    command(),
    typescript(),
    typescriptDeclarations(),
    unicorn(),
    promise(),
    node(),
    jsxA11y(),
    imports(),
    jsdoc(),
    nelsonlaidev(),
    stylistic(),
    deMorgan(),
    zod(),
    regexp(),
    sonarjs(),
    importSort(),
  ]

  const base: OxlintConfig = {
    options: {
      typeAware: true,
      maxWarnings: 0,
      denyWarnings: true,
      reportUnusedDisableDirectives: 'error',
    },
    env: {
      node: true,
      browser: true,
      es2022: true,
    },
    ignorePatterns: ['**/routeTree.gen.ts'],
    overrides,
    settings: {
      'jsx-a11y': {
        components: {
          Button: 'button',
          Image: 'img',
          Input: 'input',
          Textarea: 'textarea',
          Link: 'a',
        },
      },
      'better-tailwindcss': {
        detectComponentClasses: false,
        rootFontSize: 16,
      },
    },
  }

  return merge(base, config)
}
