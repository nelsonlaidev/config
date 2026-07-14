// ESLint Inspector Configuration
//
// This configuration file is used for development and testing purposes only.
// It enables all features of the ESLint config to validate rule definitions
// and test various plugin integrations.
//
// The glob patterns and options defined here are examples and should not be
// considered as recommended patterns for production use.
import { defineConfig, GLOB_SRC_EXT, nextjs, playwright, prettier, react, tailwindcss, vitest } from './src'

export default defineConfig(
  vitest({
    files: [`**/*.test.${GLOB_SRC_EXT}`],
  }),
  playwright({
    files: [`**/e2e/**/*.test.${GLOB_SRC_EXT}`],
  }),
  react(),
  nextjs(),
  tailwindcss({
    settings: {
      'better-tailwindcss': {
        entryPoint: './fake/globals.css',
      },
    },
  }),
  prettier(),
)
