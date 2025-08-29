import type { Linter } from 'eslint'

import { GLOB_SRC } from '../globs'
import { reactHooksPlugin, reactPlugin, reactRefreshPlugin } from '../plugins'

export const react: Linter.Config[] = [
  {
    name: 'nelsonlaidev/react/rules',
    files: [GLOB_SRC],
    plugins: {
      ...reactPlugin.configs.all.plugins,
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin
    },
    rules: {
      ...reactPlugin.configs.all.rules,
      ...reactHooksPlugin.configs['recommended-latest'].rules,
      ...reactRefreshPlugin.configs.recommended.rules
    }
  }
]
