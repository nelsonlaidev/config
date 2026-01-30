import type { ConfigOptions, FlatConfig } from './types'

import process from 'node:process'

import { isPackageExists } from 'local-pkg'

import { command } from './configs/command'
import { comments } from './configs/comments'
import { deMorgan } from './configs/de-morgan'
import { gitignore } from './configs/gitignore'
import { ignores } from './configs/ignores'
import { importSort } from './configs/import-sort'
import { imports } from './configs/imports'
import { javascript } from './configs/javascript'
import { jsx } from './configs/jsx'
import { nextjs } from './configs/nextjs'
import { node } from './configs/node'
import { playwright } from './configs/playwright'
import { prettier } from './configs/prettier'
import { react } from './configs/react'
import { regexp } from './configs/regexp'
import { sonarjs } from './configs/sonarjs'
import { stylistic } from './configs/stylistic'
import { tailwindcss } from './configs/tailwindcss'
import { typescript } from './configs/typescript'
import { unicorn } from './configs/unicorn'
import { vitest } from './configs/vitest'
import { zod } from './configs/zod'

const isReactInstalled = isPackageExists('react')
const isNextjsInstalled = isPackageExists('next')

export const defineConfig = (options: ConfigOptions = {}, ...userConfigs: FlatConfig[]): FlatConfig[] => {
  const { overrides = {} } = options

  const configs = [
    ...gitignore(),
    ...ignores(options.ignores),
    ...javascript(overrides.javascript),
    ...sonarjs(overrides.sonarjs),
    ...importSort(overrides.importSort),
    ...deMorgan(overrides.deMorgan),
    ...comments(overrides.comments),
    ...node(overrides.node),
    ...imports(overrides.imports),
    ...command(),
    ...unicorn(overrides.unicorn),
    ...jsx(overrides.jsx),
    ...typescript(options.tsconfigRootDir ?? process.cwd(), overrides.typescript),
    ...regexp(overrides.regexp),
    ...stylistic(overrides.stylistic),
    ...zod(overrides.zod)
  ]

  const isNextjsEnabled = options.nextjs ?? isNextjsInstalled
  const isReactEnabled = (options.react ?? isReactInstalled) || isNextjsEnabled

  if (options.vitestGlob) {
    configs.push(...vitest(options.vitestGlob, overrides.vitest))
  }

  if (options.playwrightGlob) {
    configs.push(...playwright(options.playwrightGlob, overrides.playwright))
  }

  if (isReactEnabled) {
    configs.push(...react(overrides.react))
  }

  if (isNextjsEnabled) {
    configs.push(...nextjs(overrides.nextjs))
  }

  if (options.tailwindEntryPoint) {
    configs.push(...tailwindcss(options.tailwindEntryPoint, overrides.tailwindcss))
  }

  configs.push(...userConfigs)

  // Must be added as the last item
  // https://github.com/prettier/eslint-plugin-prettier?tab=readme-ov-file#configuration-new-eslintconfigjs
  // eslint-disable-next-line unicorn/prefer-single-call -- For better readability
  configs.push(...prettier(overrides.prettier))

  return configs
}
