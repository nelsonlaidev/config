import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  ignoreDependencies: [/eslint-plugin/, /prettier-plugin/],
  workspaces: {
    'packages/eslint-config': {
      entry: ['eslint-inspector.config.ts', 'src/index.ts'],
    },
  },
}

export default config
