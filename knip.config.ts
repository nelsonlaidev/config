import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  workspaces: {
    'packages/oxlint-config': {
      ignoreDependencies: [
        // Oxlint JS plugins are not parsed by Knip currently
        // See: https://github.com/webpro-nl/knip/issues/1575
        'eslint-plugin-*',
      ],
    },
  },
}

export default config
