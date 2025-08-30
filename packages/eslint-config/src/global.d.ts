/**
 * This declaration file defines the missing/incompatible types for ESLint plugins.
 * Note: only the types I needed are defined.
 *
 * - eslint-plugin-eslint-comments: missing types
 * - eslint-plugin-jsx-a11y: missing types
 * - @next/eslint-plugin-next: incompatible types
 * - @vitest/eslint-plugin: incompatible types
 * - @eslint-react/eslint-plugin: incompatible types
 * - eslint-plugin-better-tailwindcss: incompatible types
 */
declare module '@eslint-community/eslint-plugin-eslint-comments' {
  import type { ESLint, Linter } from 'eslint'

  const plugin: ESLint.Plugin & {
    configs: {
      recommended: Linter.Config
    }
  }

  export default plugin
}

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

declare module '@next/eslint-plugin-next' {
  import type { ESLint, Linter } from 'eslint'

  const plugin: ESLint.Plugin & {
    configs: {
      recommended: Linter.Config
      'core-web-vitals': Linter.Config
    }
  }

  export default plugin
}

declare module '@vitest/eslint-plugin' {
  import type { ESLint, Linter } from 'eslint'

  const plugin: ESLint.Plugin & {
    configs: {
      recommended: Linter.Config
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

declare module 'eslint-plugin-better-tailwindcss' {
  import type { ESLint, Linter } from 'eslint'

  const plugin: ESLint.Plugin & {
    configs: {
      'recommended-error': Linter.Config
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
        // https://github.com/typescript-eslint/typescript-eslint/blob/264ca2fad49a298a2963de83746f8e8044229a3b/packages/eslint-plugin/src/configs/eslint-recommended-raw.ts
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
