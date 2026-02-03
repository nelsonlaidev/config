import type { FlatConfig, JsxOptions } from '../types'

import { GLOB_JSX, GLOB_TSX } from '../globs'
import { jsxA11yPlugin } from '../plugins'

export const jsx = (options: JsxOptions): FlatConfig[] => [
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
      ...jsxA11yPlugin.flatConfigs.recommended.rules,

      'jsx-a11y/lang': 'error',
      'jsx-a11y/no-aria-hidden-on-focusable': 'error'
    },
    settings: {
      'jsx-a11y': {
        ...options.a11y,
        components: {
          Button: 'button',
          Image: 'img',
          Input: 'input',
          Textarea: 'textarea',
          Link: 'a',
          ...options.a11y?.components
        }
      }
    }
  }
]
