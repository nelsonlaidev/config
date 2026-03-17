import { AST_NODE_TYPES } from '@typescript-eslint/utils'

import { createRule } from '../utils/create-rule'

export const shadcnCnWrapVariants = createRule({
  name: 'shadcn-cn-wrap-variants',
  meta: {
    docs: {
      description:
        "Enforce wrapping '*Variants()' calls inside the 'cn()' utility to ensure Tailwind classes merge correctly",
    },
    messages: {
      wrapWithCn: "'{{ name }}()' should be wrapped inside 'cn()' to ensure Tailwind classes merge correctly.",
    },
    type: 'suggestion',
    fixable: 'code',
    schema: [],
  },
  create(context) {
    return {
      CallExpression(node) {
        const { callee } = node
        if (callee.type !== AST_NODE_TYPES.Identifier) return
        if (!callee.name.endsWith('Variants')) return

        const { parent } = node

        // Already wrapped in cn()
        if (
          parent.type === AST_NODE_TYPES.CallExpression &&
          parent.callee.type === AST_NODE_TYPES.Identifier &&
          parent.callee.name === 'cn'
        ) {
          return
        }

        context.report({
          node,
          messageId: 'wrapWithCn',
          data: { name: callee.name },
          fix(fixer) {
            const { sourceCode } = context
            const text = sourceCode.getText(node)
            return fixer.replaceText(node, `cn(${text})`)
          },
        })
      },
    }
  },
})
