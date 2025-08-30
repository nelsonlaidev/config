import type { ConfigOptions, FlatConfig } from './types'

import { isPackageExists } from 'local-pkg'

import { command } from './configs/command'
import { comments } from './configs/comments'
import { deMorgan } from './configs/de-morgan'
import { gitignore } from './configs/gitignore'
import { ignores } from './configs/ignores'
import { importSort } from './configs/import-sort'
import { imports } from './configs/imports'
import { javascript } from './configs/javascript'
import { jsdoc } from './configs/jsdoc'
import { jsx } from './configs/jsx'
import { nextjs } from './configs/nextjs'
import { node } from './configs/node'
import { playwright } from './configs/playwright'
import { prettier } from './configs/prettier'
import { react } from './configs/react'
import { regexp } from './configs/regexp'
import { sonarjs } from './configs/sonarjs'
import { tailwindcss } from './configs/tailwindcss'
import { typescript } from './configs/typescript'
import { unicorn } from './configs/unicorn'
import { vitest } from './configs/vitest'

const isReactInstalled = isPackageExists('react')
const isNextjsInstalled = isPackageExists('next')

export const defineConfig = (options: ConfigOptions): FlatConfig[] => {
  const configs = [
    ...gitignore(),
    ...ignores(options.ignores),
    ...javascript(),
    ...sonarjs(),
    ...importSort(),
    ...deMorgan(),
    ...comments(),
    ...node(),
    ...jsdoc(),
    ...imports(),
    ...command(),
    ...unicorn(),
    ...jsx(),
    ...typescript(options.tsconfigRootDir),
    ...regexp()
  ]

  const isNextjsEnabled = options.nextjs ?? isNextjsInstalled
  const isReactEnabled = (options.react ?? isReactInstalled) || isNextjsEnabled

  if (options.vitestGlob) {
    configs.push(...vitest(options.vitestGlob))
  }

  if (options.playwrightGlob) {
    configs.push(...playwright(options.playwrightGlob))
  }

  if (isReactEnabled) {
    configs.push(...react(isNextjsEnabled))
  }

  if (isNextjsEnabled) {
    configs.push(...nextjs())
  }

  if (options.tailwindEntryPoint) {
    configs.push(...tailwindcss(options.tailwindEntryPoint))
  }

  // Must be added as the last item
  // https://github.com/prettier/eslint-plugin-prettier?tab=readme-ov-file#configuration-new-eslintconfigjs
  configs.push(...prettier())

  return configs
}
