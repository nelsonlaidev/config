// Oxlint Inspector Configuration
//
// This configuration file is used for development and testing purposes only.
// It enables all features of the Oxlint config to validate rule definitions
// and test various plugin integrations.
//
// The glob patterns and options defined here are examples and should not be
// considered as recommended patterns for production use.
import { defineConfig, GLOB_SRC_EXT, nextjs, playwright, react, tailwindcss, vitest } from './src'

export default defineConfig({
  settings: {
    'better-tailwindcss': {
      entryPoint: './fake/globals.css',
    },
  },
  overrides: [
    vitest({
      files: [`**/*.test.${GLOB_SRC_EXT}`],
    }),
    playwright({
      files: [`**/e2e/**/*.test.${GLOB_SRC_EXT}`],
    }),
    react(),
    nextjs(),
    tailwindcss(),
  ],
})
