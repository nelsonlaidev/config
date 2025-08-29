import type { Linter } from 'eslint'

import { tailwindcssPlugin } from '../plugins'

export const tailwindcss = (entryPoint: string): Linter.Config[] => [
  {
    name: 'nelsonlaidev/tailwindcss/rules',
    plugins: {
      tailwindcss: tailwindcssPlugin
    },
    rules: {
      ...tailwindcssPlugin.configs['recommended-error'].rules,

      'tailwindcss/enforce-consistent-variable-syntax': 'error',
      'tailwindcss/no-deprecated-classes': 'error',
      'tailwindcss/no-restricted-classes': 'error',
      'tailwindcss/enforce-shorthand-classes': 'error',
      'tailwindcss/enforce-consistent-important-position': 'error'
    },
    settings: {
      tailwindcss: {
        entryPoint
      }
    }
  }
]
