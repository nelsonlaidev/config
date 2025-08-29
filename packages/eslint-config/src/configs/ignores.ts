import type { Linter } from 'eslint'

export const ignores = (userIgnores: string[] = []): Linter.Config[] => [
  {
    name: 'nelsonlaidev/ignores',
    ignores: [...userIgnores]
  }
]
