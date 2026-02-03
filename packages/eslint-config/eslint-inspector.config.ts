// ESLint Inspector Configuration
//
// This configuration file is used for development and testing purposes only.
// It enables all features of the ESLint config to validate rule definitions
// and test various plugin integrations.
//
// The glob patterns and options defined here are examples and should not be
// considered as recommended patterns for production use.

import { defineConfig } from './src/base'
import { GLOB_SRC_EXT } from './src/globs'

export default defineConfig({
  react: true,
  nextjs: true,
  tailwindcss: {
    entryPoint: './fake/globals.css'
  },
  vitestGlob: `**/*.test.${GLOB_SRC_EXT}`,
  playwrightGlob: `**/e2e/**/*.test.${GLOB_SRC_EXT}`
})
