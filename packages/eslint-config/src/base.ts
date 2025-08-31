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

export const defineConfig = (options: ConfigOptions = {}): FlatConfig[] => {
  const { overrides = {} } = options

  const configs = [
    ...gitignore(),
    ...ignores(options.ignores ?? []),
    ...javascript(overrides.javascript),
    ...sonarjs(overrides.sonarjs),
    ...importSort(overrides.importSort),
    ...deMorgan(overrides.deMorgan),
    ...comments(overrides.comments),
    ...node(overrides.node),
    ...jsdoc(overrides.jsdoc),
    ...imports(overrides.imports),
    ...command(),
    ...unicorn(overrides.unicorn),
    ...jsx(overrides.jsx),
    ...typescript(options.tsconfigRootDir, overrides.typescript),
    ...regexp(overrides.regexp)
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

  // Must be added as the last item
  // https://github.com/prettier/eslint-plugin-prettier?tab=readme-ov-file#configuration-new-eslintconfigjs
  configs.push(...prettier(overrides.prettier))

  return configs
}
