import { defineConfig } from '@nelsonlaidev/oxlint-config'

export default defineConfig({
  config: {
    ignorePatterns: ['**/routeTree.gen.ts', 'packages/oxlint-config/tests/fixtures/**'],
  },
})
