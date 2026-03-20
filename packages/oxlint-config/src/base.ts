import type { OxlintConfig } from 'oxlint'
import type { CustomConfig } from './types'

import { mergeWith, pick } from 'es-toolkit/object'
import { getDefaultSelectors } from 'eslint-plugin-better-tailwindcss/defaults'
import { MatcherType, SelectorKind } from 'eslint-plugin-better-tailwindcss/types'
import { isPackageExists } from 'local-pkg'

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

export const DEFAULT_CONFIG: OxlintConfig = {
  options: {
    typeAware: true,
  },
  env: {
    node: true,
    browser: true,
    es2022: true,
  },
  ignorePatterns: ['**/routeTree.gen.ts'],
}

export const defineConfig = (config: OxlintConfig = {}, userConfig: CustomConfig = {}): OxlintConfig => {
  const DEFAULT_OVERRIDES = [
    ...oxc(),
    ...eslint(),
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

  DEFAULT_CONFIG.overrides = []
  DEFAULT_CONFIG.settings = {}

  DEFAULT_CONFIG.overrides.push(...DEFAULT_OVERRIDES)

  if (userConfig.react ?? isPackageExists('react')) {
    DEFAULT_CONFIG.overrides.push(...react())
  }

  if (userConfig.nextjs ?? isPackageExists('next')) {
    DEFAULT_CONFIG.overrides.push(...nextjs())
  }

  if (userConfig.vitest) {
    DEFAULT_CONFIG.overrides.push(...vitest(userConfig.vitest))
  }

  if (userConfig.playwright) {
    DEFAULT_CONFIG.overrides.push(...playwright(userConfig.playwright))
  }

  if (userConfig.tailwindcss) {
    DEFAULT_CONFIG.overrides.push(...tailwindcss(userConfig.tailwindcss))

    DEFAULT_CONFIG.settings['better-tailwindcss'] = {
      detectComponentClasses: false,
      rootFontSize: 16,
      selectors: [
        ...getDefaultSelectors(),
        ...['classNames', '.+ClassNames'].map((name) => ({
          name,
          kind: SelectorKind.Attribute,
          match: [{ type: MatcherType.String }, { type: MatcherType.ObjectValue }],
        })),
        ...['.+ClassName', '.+ClassNames'].map((name) => ({
          name,
          kind: SelectorKind.Variable,
          match: [{ type: MatcherType.String }, { type: MatcherType.ObjectValue }],
        })),
      ],
    }
  }

  return mergeWith(
    DEFAULT_CONFIG,
    {
      ...config,
      settings: {
        'better-tailwindcss': pick(userConfig.tailwindcss ?? {}, [
          'entryPoint',
          'tailwindConfig',
          'tsconfig',
          'detectComponentClasses',
          'rootFontSize',
          'messageStyle',
          'selectors',
        ]),
      },
    },
    (targetValue: unknown, sourceValue: unknown) => {
      if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
        return [...(targetValue as unknown[]), ...(sourceValue as unknown[])]
      }
      // mergeWith requires explicit undefined for default behavior
      // oxlint-disable-next-line unicorn/no-useless-undefined
      return undefined
    },
  )
}
