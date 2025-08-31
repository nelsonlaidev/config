import type { FlatConfig, RuleOverrides } from '../types'

import { GLOB_SRC } from '../globs'
import { reactHooksPlugin, reactPlugin, reactRefreshPlugin } from '../plugins'

export const react = (isNextjsEnabled: boolean, overrides?: RuleOverrides): FlatConfig[] => [
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
      ...reactRefreshPlugin.configs.recommended.rules,

      '@eslint-react/naming-convention/filename': ['error', 'kebab-case'],

      'react-refresh/only-export-components': [
        'error',
        {
          allowExportNames: isNextjsEnabled
            ? ['runtime', 'metadata', 'viewport', 'generateStaticParams', 'generateMetadata', 'generateViewport']
            : []
        }
      ],

      // Unnecessary
      '@eslint-react/avoid-shorthand-fragment': 'off',

      ...overrides
    }
  }
]
