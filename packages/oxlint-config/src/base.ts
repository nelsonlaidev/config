import type { ConfigOptions } from './types'
import type { OxlintConfig } from 'oxlint'

import { getDefaultSelectors } from 'eslint-plugin-better-tailwindcss/defaults'
import { MatcherType, SelectorKind } from 'eslint-plugin-better-tailwindcss/types'

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
import { unusedImports } from './configs/unused-imports'
import { vitest } from './configs/vitest'
import { zod } from './configs/zod'

export const defineConfig = (options: ConfigOptions = {}, config: OxlintConfig = {}): OxlintConfig => {
  const overrides = [
    ...oxc(),
    ...eslint(),
    ...typescript(),
    ...unicorn(),
    ...promise(),
    ...node(),
    ...nextjs(),
    ...jsxA11y(),
    ...imports(),
    ...jsdoc(),
    ...react(),
    ...vitest(),
    ...nelsonlaidev(),
    ...stylistic(),
    ...deMorgan(),
    ...zod(),
    ...playwright(),
    ...regexp(),
    ...sonarjs(),
    ...unusedImports(),
    ...importSort(),
  ]

  const settings: NonNullable<OxlintConfig['settings']> = { ...config.settings }

  if (options.tailwindcss) {
    overrides.push(...tailwindcss(options.tailwindcss))

    settings['better-tailwindcss'] = {
      rootFontSize: options.tailwindcss.rootFontSize ?? 16,
      entryPoint: options.tailwindcss.entryPoint,
      tailwindConfig: options.tailwindcss.config,
      tsconfig: options.tailwindcss.tsconfig,
      detectComponentClasses: options.tailwindcss.detectComponentClasses ?? false,
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
        ...(options.tailwindcss.selectors ?? []),
      ],
    }
  }

  overrides.push(...(config.overrides ?? []))

  return {
    ...config,
    ignorePatterns: ignores(config.ignorePatterns),
    overrides,
    settings,
  }
}
