import type { FlatConfig } from '../types'

import { deMorganPlugin } from '../plugins'

export const deMorgan = (): FlatConfig => ({
  name: 'nelsonlaidev/de-morgan',
  plugins: {
    'de-morgan': deMorganPlugin,
  },
  rules: {
    ...deMorganPlugin.configs.recommended.rules,
  },
})
