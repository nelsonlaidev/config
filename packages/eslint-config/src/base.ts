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
const isPrettierInstalled = isPackageExists('prettier')

export const defineConfig = (options: ConfigOptions = {}, ...userConfigs: FlatConfig[]): FlatConfig[] => {
  const configs = [
    ...gitignore(),
    ...ignores(options.ignores),
    ...javascript(),
    ...sonarjs(),
    ...importSort(),
    ...deMorgan(),
    ...comments(),
    ...node(),
    ...imports(),
    ...command(),
    ...unicorn(),
    ...jsx(options.jsx ?? {}),
    ...typescript(),
    ...regexp(),
    ...stylistic(),
    ...zod()
  ]

  const isNextjsEnabled = options.nextjs ?? isNextjsInstalled
  const isReactEnabled = (options.react ?? isReactInstalled) || isNextjsEnabled
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

  configs.push(...userConfigs)

  if (isPrettierEnabled) {
    // Must be added as the last item
    // https://github.com/prettier/eslint-plugin-prettier?tab=readme-ov-file#configuration-new-eslintconfigjs
    configs.push(...prettier())
  }

  return configs
}
