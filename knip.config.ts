import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  workspaces: {
    'packages/eslint-config': {
      entry: ['eslint-inspector.config.ts', 'src/index.ts'],
    },
    'packages/eslint-plugin': {
      ignore: ['tests/**/*.ts'],
    },
  },
}

export default config
