import { AST_NODE_TYPES } from '@typescript-eslint/utils'

import { createRule } from '../utils/create-rule'

export const shadcnCvaVariantsSuffix = createRule({
  name: 'shadcn-cva-variants-suffix',
  meta: {
    type: 'suggestion',
    docs: {
      description: "Enforce that variables assigned to `cva()` calls always end with 'Variants'",
    },
    messages: {
      requireSuffix: "Variable '{{ name }}' assigned to `cva()` should end with 'Variants' (e.g., '{{ suggested }}').",
    },
    fixable: 'code',
    schema: [],
  },
  create(context) {
    return {
      VariableDeclarator(node) {
        const { id, init } = node
        if (!init) return
        if (id.type !== AST_NODE_TYPES.Identifier) return
        if (init.type !== AST_NODE_TYPES.CallExpression) return

        const { callee } = init
        if (callee.type !== AST_NODE_TYPES.Identifier || callee.name !== 'cva') return

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

            const fixes = [fixer.replaceText(id, suggested)]

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
})
