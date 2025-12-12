import type { FlatConfig } from '../types'

export const ignores = (userIgnores: string[] = []): FlatConfig[] => [
  {
    name: 'nelsonlaidev/ignores',
    ignores: ['**/routeTree.gen.ts', ...userIgnores]
  }
]
