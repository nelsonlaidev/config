import type { Rule } from 'eslint'

const LUCIDE_REACT_SOURCE = 'lucide-react'
const FORBIDDEN_ICONS = new Set(['LoaderIcon', 'Loader2Icon'])

export const shadcnPreferSpinner: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: "Enforce using the '<Spinner />' component instead of loader icons from lucide-react",
    },
    messages: {
      preferSpinner:
        "Do not use '{{name}}' from lucide-react. Use the '<Spinner />' component from '{{importSource}}' instead.",
    },
    schema: [
      {
        type: 'object',
        properties: {
          importSource: {
            type: 'string',
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    const importSource =
      (context.options[0] as { importSource?: string } | undefined)?.importSource ?? '@/components/ui/spinner'

    return {
      ImportDeclaration(node) {
        if (node.source.value !== LUCIDE_REACT_SOURCE) return

        for (const specifier of node.specifiers) {
          if (specifier.type !== 'ImportSpecifier') continue

          const { imported } = specifier
          if (imported.type !== 'Identifier') continue

          if (!FORBIDDEN_ICONS.has(imported.name)) continue

          context.report({
            node: specifier,
            messageId: 'preferSpinner',
            data: { name: imported.name, importSource },
          })
        }
      },
    }
  },
}
