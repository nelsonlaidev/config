import type { OxlintConfig } from 'oxlint'
import type { CustomConfig } from './types'

import { getDefaultSelectors } from 'eslint-plugin-better-tailwindcss/defaults'
import { MatcherType, SelectorKind } from 'eslint-plugin-better-tailwindcss/types'
import { isPackageExists } from 'local-pkg'

import { deMorgan } from './configs/de-morgan'
import { eslint } from './configs/eslint'
import { ignores } from './configs/ignores'
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

  const settings: NonNullable<OxlintConfig['settings']> = { ...config.settings }

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

    settings['better-tailwindcss'] = {
      rootFontSize: userConfig.tailwindcss.rootFontSize ?? 16,
      entryPoint: userConfig.tailwindcss.entryPoint,
      tailwindConfig: userConfig.tailwindcss.config,
      tsconfig: userConfig.tailwindcss.tsconfig,
      detectComponentClasses: userConfig.tailwindcss.detectComponentClasses ?? false,
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
        ...(userConfig.tailwindcss.selectors ?? []),
      ],
    }
  }

  overrides.push(...(config.overrides ?? []))

  return {
    ...config,
    options: {
      typeAware: true,
      ...config.options,
    },
    env: {
      node: true,
      browser: true,
      es2022: true,
      ...config.env,
    },
    ignorePatterns: ignores(config.ignorePatterns),
    overrides,
    settings,
  }
}
