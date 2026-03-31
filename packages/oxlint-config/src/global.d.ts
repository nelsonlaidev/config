// Fix incompatible types
declare module '@eslint-react/eslint-plugin' {
  import type { DummyRuleMap } from 'oxlint'

  const plugin: {
    configs: {
      all: {
        rules: DummyRuleMap
      }
      'disable-conflict-eslint-plugin-react-hooks': {
        rules: DummyRuleMap
      }
    }
  }

  export default plugin
}

declare module 'eslint-plugin-react-hooks' {
  import type { DummyRuleMap } from 'oxlint'

  const plugin: {
    configs: {
      'recommended-latest': {
        rules: DummyRuleMap
      }
    }
  }

  export default plugin
}

declare module 'eslint-plugin-sonarjs' {
  import type { DummyRuleMap } from 'oxlint'

  const plugin: {
    configs: {
      recommended: {
        rules: DummyRuleMap
      }
    }
  }

  export default plugin
}
