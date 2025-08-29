import type { Linter } from 'eslint'

import { GLOB_JSX, GLOB_TSX } from '../globs'
import { jsxA11yPlugin } from '../plugins'

export const jsx: Linter.Config[] = [
  {
    name: 'nelsonlaidev/jsx/setup',
    files: [GLOB_JSX, GLOB_TSX],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  },
  {
    name: 'nelsonlaidev/jsx/rules',
    files: [GLOB_JSX, GLOB_TSX],
    plugins: {
      'jsx-a11y': jsxA11yPlugin
    },
    rules: {
      ...jsxA11yPlugin.flatConfigs.strict.rules,

      'jsx-a11y/anchor-ambiguous-text': 'error',
      'jsx-a11y/lang': 'error',
      'jsx-a11y/no-aria-hidden-on-focusable': 'error',
      'jsx-a11y/prefer-tag-over-role': 'error'
    },
    settings: {
      'jsx-a11y': {
        components: {
          Button: 'button',
          Image: 'img',
          Input: 'input',
          Textarea: 'textarea',
          Link: 'a'
        }
      }
    }
  }
]
