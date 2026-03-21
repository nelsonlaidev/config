import type { OxlintConfig } from 'oxlint'
import type { CustomConfig, DefaultConfig } from './types'

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

const DEFAULT_CONFIG: DefaultConfig = {
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
  overrides: [],
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
  },
}

export const defineConfig = (config: OxlintConfig = {}, userConfig: CustomConfig = {}): OxlintConfig => {
  const overrides = [
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

  const settings: Record<string, unknown> = {
    ...DEFAULT_CONFIG.settings,
  }

  if (userConfig.tailwindcss) {
    overrides.push(...tailwindcss(userConfig.tailwindcss))

    settings['better-tailwindcss'] = {
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

  const baseConfig: DefaultConfig = {
    ...DEFAULT_CONFIG,
    overrides: [...DEFAULT_CONFIG.overrides, ...overrides],
    settings,
  }

  return mergeWith(
    baseConfig,
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
      return
    },
  )
}
