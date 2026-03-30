import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  ignoreDependencies: [/eslint-plugin/],
  workspaces: {
    'packages/eslint-config': {
      entry: ['eslint-inspector.config.ts', 'src/index.ts'],
      ignoreDependencies: [
        // Required by eslint-plugin-import-x
        'eslint-import-resolver-typescript',
      ],
    },
  },
}

export default config
