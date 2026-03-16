import type { Rule } from 'eslint'

export const shadcnCvaVariantsSuffix: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: "Enforce that variables assigned to `cva()` calls always end with 'Variants'",
      url: 'https://github.com/nelsonlaidev/config/blob/main/packages/eslint-plugin/docs/rules/shadcn-cva-variants-suffix.md',
    },
    fixable: 'code',
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

        const suggested = `${name}Variants`

        context.report({
          node: id,
          messageId: 'requireSuffix',
          data: { name, suggested },
          fix(fixer) {
            const { sourceCode } = context
            const scope = sourceCode.getScope(node)
            const variable = scope.variables.find((v) => v.name === name)

            if (!variable) {
              return fixer.replaceText(id, suggested)
            }

            const fixes: Rule.Fix[] = [fixer.replaceText(id, suggested)]

            for (const ref of variable.references) {
              if (ref.identifier !== id) {
                fixes.push(fixer.replaceText(ref.identifier, suggested))
              }
            }

            return fixes
          },
        })
      },
    }
  },
}
