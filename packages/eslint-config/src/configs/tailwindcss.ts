import type { Linter } from 'eslint'

import { tailwindcssPlugin } from '../plugins'

export const tailwindcss = (entryPoint: string): Linter.Config[] => [
  {
    name: 'nelsonlaidev/tailwindcss/rules',
    plugins: {
      'better-tailwindcss': tailwindcssPlugin
    },
    rules: {
      ...tailwindcssPlugin.configs['recommended-error'].rules,

      'better-tailwindcss/enforce-consistent-variable-syntax': 'error',
      'better-tailwindcss/no-deprecated-classes': 'error',
      'better-tailwindcss/no-restricted-classes': 'error',
      'better-tailwindcss/enforce-shorthand-classes': 'error',
      'better-tailwindcss/enforce-consistent-important-position': 'error'
    },
    settings: {
      tailwindcss: {
        entryPoint
      }
    }
  }
]
