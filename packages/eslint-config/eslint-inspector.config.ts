import { defineConfig } from './src/base'
import { GLOB_SRC_EXT } from './src/globs'

export default defineConfig({
  tsconfigRootDir: import.meta.dirname,
  react: true,
  nextjs: true,
  tailwindEntryPoint: './fake/globals.css',
  vitestGlob: `**/*.test.${GLOB_SRC_EXT}`,
  playwrightGlob: `**/e2e/**/*.test.${GLOB_SRC_EXT}`
})
