import type { Rule } from 'eslint'

const LUCIDE_REACT_SOURCE = 'lucide-react'

type Preferred = 'Trash2Icon' | 'TrashIcon'

const OPPOSITES: Record<Preferred, Preferred> = {
  Trash2Icon: 'TrashIcon',
  TrashIcon: 'Trash2Icon',
}

export const lucidePreferTrash2Icon: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: "Enforce using 'Trash2Icon' instead of 'TrashIcon' from lucide-react for better visual consistency",
    },
    fixable: 'code',
    messages: {
      preferIcon: "Import '{{preferred}}' instead of '{{forbidden}}' from lucide-react for better visual consistency.",
    },
    schema: [
      {
        type: 'object',
        properties: {
          preferred: {
            type: 'string',
            enum: ['Trash2Icon', 'TrashIcon'],
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    const preferred: Preferred =
      (context.options[0] as { preferred?: Preferred } | undefined)?.preferred ?? 'Trash2Icon'
    const forbidden = OPPOSITES[preferred]

    return {
      ImportDeclaration(node) {
        if (node.source.value !== LUCIDE_REACT_SOURCE) return

        for (const specifier of node.specifiers) {
          if (specifier.type !== 'ImportSpecifier') continue

          const { imported } = specifier
          if (imported.type !== 'Identifier') continue

          if (imported.name !== forbidden) continue

          const isRenamed = specifier.local.name !== imported.name

          context.report({
            node: specifier,
            messageId: 'preferIcon',
            data: { preferred, forbidden },
            fix(fixer) {
              if (isRenamed) {
                return fixer.replaceText(imported, preferred)
              }

              const { sourceCode } = context
              const scope = sourceCode.getScope(node)
              const variable = scope.variables.find((v) => v.name === forbidden)

              if (!variable) {
                return fixer.replaceText(specifier, preferred)
              }

              const fixes: Rule.Fix[] = [fixer.replaceText(specifier, preferred)]

              for (const ref of variable.references) {
                if (ref.identifier !== imported) {
                  fixes.push(fixer.replaceText(ref.identifier, preferred))
                }
              }

              return fixes
            },
          })
        }
      },
    }
  },
}
