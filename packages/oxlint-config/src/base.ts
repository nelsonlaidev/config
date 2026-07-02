import type { OxlintConfig } from 'oxlint'
import type { DefineConfigOptions } from './types'

import { mergeWith, pick } from 'es-toolkit/object'
import { isPackageExists } from 'local-pkg'

import { command } from './configs/command'
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
import { tailwindcss } from './configs/tailwindcss'
import { typescript } from './configs/typescript'
import { unicorn } from './configs/unicorn'
import { vitest } from './configs/vitest'
import { zod } from './configs/zod'
import { makeAllErrors } from './utils'

const concatArrays = (target: unknown, source: unknown) => {
  if (Array.isArray(target) && Array.isArray(source)) {
    return [...(target as unknown[]), ...(source as unknown[])]
  }
  // mergeWith requires explicit undefined for default behavior
  // eslint-disable-next-line unicorn/no-useless-undefined
  return undefined
}

export const defineConfig = ({ config = {}, custom: userConfig = {} }: DefineConfigOptions = {}): OxlintConfig => {
  const overrides = [
    ...oxc(),
    ...eslint(),
    ...command(),
    ...typescript(),
    ...unicorn(),
    ...promise(),
    ...node(),
    ...jsxA11y(),
    ...imports(),
    ...jsdoc(),
    ...nelsonlaidev(),
    ...stylistic(),
    ...deMorgan(),
    ...zod(),
    ...regexp(),
    ...sonarjs(),
    ...importSort(),
  ]

  if (userConfig.react ?? isPackageExists('react')) {
    overrides.push(...react())
  }

  if (userConfig.nextjs ?? isPackageExists('next')) {
    overrides.push(...nextjs())
  }

  if (userConfig.vitest) {
    overrides.push(...vitest(userConfig.vitest))
  }

  if (userConfig.playwright) {
    overrides.push(...playwright(userConfig.playwright))
  }

  if (userConfig.tailwindcss) {
    overrides.push(...tailwindcss(userConfig.tailwindcss))
  }

  return mergeWith<OxlintConfig, OxlintConfig>(
    {
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
      overrides: makeAllErrors(overrides),
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
        ...(userConfig.tailwindcss && {
          'better-tailwindcss': {
            detectComponentClasses: false,
            rootFontSize: 16,
          },
        }),
      },
    },
    {
      ...config,
      settings: {
        ...config.settings,
        ...(userConfig.tailwindcss && {
          'better-tailwindcss': pick(userConfig.tailwindcss, [
            'entryPoint',
            'tailwindConfig',
            'tsconfig',
            'cwd',
            'detectComponentClasses',
            'rootFontSize',
            'messageStyle',
            'selectors',
          ]),
        }),
      },
    },
    concatArrays,
  )
}
