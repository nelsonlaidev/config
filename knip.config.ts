import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  workspaces: {
    'packages/eslint-config': {
      entry: ['eslint-inspector.config.ts', 'src/index.ts'],
      ignoreDependencies: [
        // Required by eslint-plugin-import-x
        'eslint-import-resolver-typescript',
      ],
    },
    'packages/oxlint-config': {
      ignoreDependencies: [
        // Used in Oxlint Config as JS plugins
        'eslint-plugin-*',
      ],
    },
  },
}

export default config
