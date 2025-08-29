import { FlatConfigComposer } from 'eslint-flat-config-utils'
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

/**
 * ESLint configuration options.
 */
export type Options = {
  /**
   * The absolute or relative path to the root directory that contains
   * the `tsconfig.json`. Used to resolve TypeScript configuration.
   */
  tsconfigRootDir: string
  /**
   * Enable additional linting rules optimized for React projects.
   */
  react?: boolean
  /**
   * Enable additional linting rules optimized for Next.js projects.
   * Automatically implies React linting as well.
   */
  nextjs?: boolean
  /**
   * Path to the main entry file of your Tailwind CSS setup.
   * Enabling this also turns on ESLint rules related to Tailwind CSS.
   */
  tailwindEntryPoint?: string
  /**
   * Glob patterns that match your Vitest test files.
   * When provided, ESLint rules for Vitest will be enabled.
   */
  vitestGlob?: string
  /**
   * Glob patterns that match your Playwright test files.
   * When provided, ESLint rules for Playwright will be enabled.
   */
  playwrightGlob?: string
  /**
   * A list of file paths or glob patterns to be ignored by ESLint.
   */
  ignores?: string[]
}

const isReactInstalled = isPackageExists('react')
const isNextjsInstalled = isPackageExists('next')

export const defineConfig = (options: Options): FlatConfigComposer => {
  const configs = [
    ...gitignore,
    ...ignores(options.ignores),
    ...javascript,
    ...sonarjs,
    ...importSort,
    ...deMorgan,
    ...comments,
    ...node,
    ...jsdoc,
    ...imports,
    ...command,
    ...unicorn,
    ...jsx,
    ...typescript(options.tsconfigRootDir),
    ...regexp
  ]

  if (options.vitestGlob) {
    configs.push(...vitest(options.vitestGlob))
  }

  if (options.playwrightGlob) {
    configs.push(...playwright(options.playwrightGlob))
  }

  if (options.react ?? isReactInstalled) {
    configs.push(...react)
  }

  if (options.nextjs ?? isNextjsInstalled) {
    configs.push(...nextjs)
  }

  if (options.tailwindEntryPoint) {
    configs.push(...tailwindcss(options.tailwindEntryPoint))
  }

  // Must be added as the last item
  // https://github.com/prettier/eslint-plugin-prettier?tab=readme-ov-file#configuration-new-eslintconfigjs
  configs.push(...prettier)

  let composer = new FlatConfigComposer()

  composer = composer.append(configs)
  composer = composer.renamePlugins({
    n: 'node',
    'import-lite': 'import',
    'better-tailwindcss': 'tailwindcss',
    '@eslint-community/eslint-comments': 'eslint-comments',
    '@next/next': 'next'
  })

  return composer
}
