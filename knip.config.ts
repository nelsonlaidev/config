import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  ignoreDependencies: [/^(@[\w-]+\/)?eslint-plugin(-[\w-]+)?$/],
}

export default config
