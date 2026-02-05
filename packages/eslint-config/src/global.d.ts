// This declaration file defines the missing/incompatible types for ESLint plugins.
// Note: only the types I needed are defined.
//
// - eslint-plugin-jsx-a11y: missing types
// - @eslint-react/eslint-plugin: incompatible types
// - @typescript-eslint/eslint-plugin: missing types
// - eslint-plugin-react-hooks: incompatible types
// - eslint-plugin-sonarjs: incompatible types
declare module 'eslint-plugin-jsx-a11y' {
  import type { ESLint, Linter } from 'eslint'

  const plugin: ESLint.Plugin & {
    configs: {
      recommended: Linter.Config
      strict: Linter.Config
    }
    flatConfigs: {
      recommended: Linter.Config
      strict: Linter.Config
    }
  }

  export default plugin
}

declare module '@eslint-react/eslint-plugin' {
  import type { ESLint, Linter } from 'eslint'

  const plugin: ESLint.Plugin & {
    configs: {
      all: Linter.Config
    }
  }

  export default plugin
}

declare module '@typescript-eslint/eslint-plugin' {
  import type { ESLint, Linter } from 'eslint'

  const plugin: ESLint.Plugin & {
    configs: {
      'eslint-recommended': {
        // Defined
        // https://github.com/typescript-eslint/typescript-eslint/blob/8a95834bb5fd818cc049390e4cb57196717a011f/packages/eslint-plugin/src/configs/eslintrc/eslint-recommended.ts
        overrides: [
          {
            files: string[]
            rules: Linter.RulesRecord
          }
        ]
      }
      'strict-type-checked': Linter.Config
      'stylistic-type-checked': Linter.Config
    }
  }

  export default plugin
}

declare module 'eslint-plugin-react-hooks' {
  import type { ESLint, Linter } from 'eslint'

  const plugin: ESLint.Plugin & {
    configs: {
      recommended: Linter.Config
      'recommended-latest': Linter.Config
    }
  }

  export default plugin
}

declare module 'eslint-plugin-sonarjs' {
  import type { ESLint, Linter } from 'eslint'

  const plugin: ESLint.Plugin & {
    configs: {
      recommended: Linter.Config
    }
  }

  export default plugin
}
