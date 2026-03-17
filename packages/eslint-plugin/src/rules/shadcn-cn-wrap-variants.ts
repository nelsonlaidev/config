import type { TSESTree } from '@typescript-eslint/utils'

import { AST_NODE_TYPES } from '@typescript-eslint/utils'

import { shadcnCnWrapVariantsDefaults } from '../lib/defaults'
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
    schema: [
      {
        type: 'object',
        properties: {
          names: {
            type: 'array',
            items: { type: 'string' },
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [shadcnCnWrapVariantsDefaults],
  create(context, options) {
    const [{ names }] = options
    const nameSet = new Set(names)

    return {
      CallExpression(node) {
        const { callee } = node
        if (callee.type !== AST_NODE_TYPES.Identifier) return
        if (!nameSet.has(callee.name)) return

        if (isWrappedInCn(node)) return

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

function isWrappedInCn(node: TSESTree.CallExpression): boolean {
  const { parent } = node
  return (
    parent.type === AST_NODE_TYPES.CallExpression &&
    parent.callee.type === AST_NODE_TYPES.Identifier &&
    parent.callee.name === 'cn'
  )
}
