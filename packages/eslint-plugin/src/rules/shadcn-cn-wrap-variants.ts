import type { Rule } from 'eslint'

export const shadcnCnWrapVariants: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        "Enforce wrapping '*Variants()' calls inside the 'cn()' utility to ensure Tailwind classes merge correctly",
      url: 'https://github.com/nelsonlaidev/config/blob/main/packages/eslint-plugin/docs/rules/shadcn-cn-wrap-variants.md',
    },
    fixable: 'code',
    messages: {
      wrapWithCn: "'{{name}}()' should be wrapped inside 'cn()' to ensure Tailwind classes merge correctly.",
    },
    schema: [],
  },

  create(context) {
    return {
      CallExpression(node) {
        const { callee } = node
        if (callee.type !== 'Identifier') return
        if (!callee.name.endsWith('Variants')) return

        const { parent } = node

        // Already wrapped in cn()
        if (parent.type === 'CallExpression' && parent.callee.type === 'Identifier' && parent.callee.name === 'cn') {
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
}
