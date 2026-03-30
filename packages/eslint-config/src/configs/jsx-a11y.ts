import type { FlatConfig, JsxA11yConfigOptions, JsxA11yOptions } from '../types'

import { GLOB_JSX, GLOB_TSX } from '../globs'
import { jsxA11yPlugin } from '../plugins'

export const jsxA11y = (options: JsxA11yConfigOptions): FlatConfig[] => [
  {
    name: 'nelsonlaidev/jsx-a11y/setup',
    files: [GLOB_JSX, GLOB_TSX],
    plugins: {
      'jsx-a11y': jsxA11yPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
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
          ...options.a11y?.components,
        },
      } satisfies JsxA11yOptions,
    },
  },
  {
    name: 'nelsonlaidev/jsx-a11y/rules',
    files: [GLOB_JSX, GLOB_TSX],
    rules: {
      ...jsxA11yPlugin.configs.recommended.rules,

      'jsx-a11y/lang': 'error',
      'jsx-a11y/no-aria-hidden-on-focusable': 'error',
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['to'],
          aspects: ['noHref', 'invalidHref', 'preferButton'],
        },
      ],
    },
  },
]
