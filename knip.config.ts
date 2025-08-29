import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  workspaces: {
    'packages/eslint-config': {
      entry: ['eslint-inspector.config.ts'],
      ignore: ['src/globs.ts']
    }
  }
}

export default config
