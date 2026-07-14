import type { FlatConfig } from '../types'

import gitignoreConfig from 'eslint-config-flat-gitignore'

export const gitignore = (): FlatConfig => gitignoreConfig({ name: 'nelsonlaidev/gitignore' })
