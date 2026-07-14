import type { FlatConfig } from '../types'

import { jsdocPlugin } from '../plugins'

export const jsdoc = (): FlatConfig => ({
  name: 'nelsonlaidev/jsdoc',
  plugins: {
    jsdoc: jsdocPlugin,
  },
  rules: {
    'jsdoc/check-tag-names': 'error',
    'jsdoc/empty-tags': 'error',
  },
})
