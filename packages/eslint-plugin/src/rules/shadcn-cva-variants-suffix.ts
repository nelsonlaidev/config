import type { Rule } from 'eslint'

export const shadcnCvaVariantsSuffix: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: "Enforce that variables assigned to `cva()` calls always end with 'Variants'",
    },
    messages: {
      requireSuffix: "Variable '{{name}}' assigned to `cva()` should end with 'Variants' (e.g., '{{suggested}}').",
    },
    schema: [],
  },

  create(context) {
    return {
      VariableDeclarator(node) {
        const { id, init } = node
        if (!init) return
        if (id.type !== 'Identifier') return
        if (init.type !== 'CallExpression') return

        const { callee } = init
        if (callee.type !== 'Identifier' || callee.name !== 'cva') return

        const { name } = id
        if (name.endsWith('Variants')) return

        context.report({
          node: id,
          messageId: 'requireSuffix',
          data: { name, suggested: `${name}Variants` },
        })
      },
    }
  },
}
