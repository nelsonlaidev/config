import type { ConfigOptions, FlatConfig } from './types'

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
import { node } from './configs/node'
import { promise } from './configs/promise'
import { regexp } from './configs/regexp'
import { sonarjs } from './configs/sonarjs'
import { stylistic } from './configs/stylistic'
import { typescript, typescriptDeclarations } from './configs/typescript'
import { unicorn } from './configs/unicorn'
import { unusedImports } from './configs/unused-imports'
import { zod } from './configs/zod'

const createConfig = (options: ConfigOptions, userConfigs: FlatConfig[]): FlatConfig[] => {
  const configs: FlatConfig[] = [
    gitignore(),
    ignores(options.ignores),
    javascript(),
    jsdoc(),
    sonarjs(),
    importSort(),
    deMorgan(),
    comments(),
    node(),
    importX(options.typescriptResolver),
    command(),
    unicorn(),
    jsxA11y(),
    typescript(),
    typescriptDeclarations(),
    unusedImports(),
    regexp(),
    stylistic(),
    zod(),
    promise(),
    nelsonlaidev(),
  ]

  return [...configs, ...userConfigs]
}

const withOptions = (options: ConfigOptions, ...userConfigs: FlatConfig[]): FlatConfig[] =>
  createConfig(options, userConfigs)

export const defineConfig = Object.assign(
  (...userConfigs: FlatConfig[]): FlatConfig[] => createConfig({}, userConfigs),
  { withOptions },
)
