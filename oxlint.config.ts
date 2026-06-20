import { defineConfig } from '@nelsonlaidev/oxlint-config'

export default defineConfig({
  config: {
    ignorePatterns: ['packages/oxlint-config/tests/fixtures/**'],
  },
})
