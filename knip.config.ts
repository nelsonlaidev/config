import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  ignoreDependencies: [/eslint-plugin/],
  workspaces: {
    'packages/eslint-config': {
      entry: ['eslint-inspector.config.ts', 'src/index.ts'],
    },
    'packages/oxlint-config': {
      entry: ['oxlint-inspector.config.ts', 'src/index.ts'],
      ignoreFiles: ['tests/fixtures/**/*'],
    },
  },
}

export default config
