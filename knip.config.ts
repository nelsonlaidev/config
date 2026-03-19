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
        // Oxlint JS plugins are not parsed by Knip currently
        // See: https://github.com/webpro-nl/knip/issues/1575
        'eslint-plugin-*',
        // Some JS plugins need ESLint
        'eslint',
      ],
    },
  },
}

export default config
