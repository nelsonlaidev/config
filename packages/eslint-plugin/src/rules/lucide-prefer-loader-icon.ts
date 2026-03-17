import { AST_NODE_TYPES } from '@typescript-eslint/utils'

import { LUCIDE_REACT_SOURCE } from '../lib/constants'
import { createRule } from '../utils/create-rule'

type Preferred = 'LoaderIcon' | 'Loader2Icon'

const OPPOSITES: Record<Preferred, Preferred> = {
  LoaderIcon: 'Loader2Icon',
  Loader2Icon: 'LoaderIcon',
}

export const lucidePreferLoaderIcon = createRule({
  name: 'lucide-prefer-loader-icon',
  meta: {
    docs: {
      description:
        "Enforce using 'LoaderIcon' instead of 'Loader2Icon' from lucide-react for better visual consistency",
    },
    messages: {
      preferIcon:
        "Import '{{ preferred }}' instead of '{{ forbidden }}' from lucide-react for better visual consistency.",
    },
    type: 'suggestion',
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          preferred: {
            type: 'string',
            enum: ['LoaderIcon', 'Loader2Icon'],
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [{ preferred: 'LoaderIcon' as Preferred }],
  create(context, options) {
    const [{ preferred }] = options
    const forbidden = OPPOSITES[preferred]

    return {
      ImportDeclaration(node) {
        if (node.source.value !== LUCIDE_REACT_SOURCE) return

        for (const specifier of node.specifiers) {
          if (specifier.type !== AST_NODE_TYPES.ImportSpecifier) continue

          const { imported } = specifier
          if (imported.type !== AST_NODE_TYPES.Identifier) continue

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

              const fixes = [fixer.replaceText(specifier, preferred)]

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
})
