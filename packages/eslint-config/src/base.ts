import type { ConfigOptions, FlatConfig } from './types'

import { isPackageExists } from 'local-pkg'

import { command } from './configs/command'
import { comments } from './configs/comments'
import { deMorgan } from './configs/de-morgan'
import { gitignore } from './configs/gitignore'
import { ignores } from './configs/ignores'
import { importSort } from './configs/import-sort'
import { importX } from './configs/import-x'
import { javascript } from './configs/javascript'
import { jsdoc } from './configs/jsdoc'
import { jsxA11y } from './configs/jsx-a11y'
import { nelsonlaidev } from './configs/nelsonlaidev'
import { nextjs } from './configs/nextjs'
import { node } from './configs/node'
import { playwright } from './configs/playwright'
import { prettier } from './configs/prettier'
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
import { makeAllErrors } from './utils'

const isReactInstalled = isPackageExists('react')
const isNextjsInstalled = isPackageExists('next')
const isPrettierInstalled = isPackageExists('prettier')

export const defineConfig = (options: ConfigOptions = {}, ...userConfigs: FlatConfig[]): FlatConfig[] => {
  const configs = [
    ...gitignore(),
    ...ignores(options.ignores),
    ...javascript(),
    ...jsdoc(),
    ...sonarjs(),
    ...importSort(),
    ...deMorgan(),
    ...comments(),
    ...node(),
    ...importX(options.typescriptResolver),
    ...command(),
    ...unicorn(),
    ...jsxA11y(options.jsxA11y),
    ...typescript(),
    ...unusedImports(),
    ...regexp(),
    ...stylistic(),
    ...zod(),
    ...promise(),
    ...nelsonlaidev(),
  ]

  const isNextjsEnabled = options.nextjs ?? isNextjsInstalled
  const isReactEnabled = options.react ?? isReactInstalled
  const isPrettierEnabled = options.prettier ?? isPrettierInstalled

  if (options.vitest) {
    configs.push(...vitest(options.vitest))
  }

  if (options.playwright) {
    configs.push(...playwright(options.playwright))
  }

  if (isReactEnabled) {
    configs.push(...react())
  }

  if (isNextjsEnabled) {
    configs.push(...nextjs())
  }

  if (options.tailwindcss) {
    configs.push(...tailwindcss(options.tailwindcss))
  }

  const normalized = makeAllErrors(configs)

  normalized.push(...userConfigs)

  if (isPrettierEnabled) {
    // Must be added as the last item
    // https://github.com/prettier/eslint-config-prettier#installation
    normalized.push(...prettier())
  }

  return normalized
}
