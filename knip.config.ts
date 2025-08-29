import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  workspaces: {
    'packages/eslint-config': {
      entry: ['eslint-inspector.config.ts', 'src/index.ts']
    }
  }
}

export default config
