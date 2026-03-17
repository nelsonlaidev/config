import { AST_NODE_TYPES } from '@typescript-eslint/utils'

import { LUCIDE_REACT_SOURCE } from '../lib/constants'
import { createRule } from '../utils/create-rule'

const FORBIDDEN_ICONS = new Set(['LoaderIcon', 'Loader2Icon'])

export const shadcnPreferSpinner = createRule({
  name: 'shadcn-prefer-spinner',
  meta: {
    docs: {
      description:
        "Enforce using a custom Spinner component instead of 'LoaderIcon' or 'Loader2Icon' from lucide-react",
    },
    messages: {
      preferSpinner: "Do not use '{{ name }}' from lucide-react. Use a custom '<Spinner />' component instead.",
    },
    type: 'suggestion',
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      ImportDeclaration(node) {
        if (node.source.value !== LUCIDE_REACT_SOURCE) return

        for (const specifier of node.specifiers) {
          if (specifier.type !== AST_NODE_TYPES.ImportSpecifier) continue
          if (specifier.imported.type !== AST_NODE_TYPES.Identifier) continue
          if (!FORBIDDEN_ICONS.has(specifier.imported.name)) continue

          context.report({
            node: specifier,
            messageId: 'preferSpinner',
            data: { name: specifier.imported.name },
          })
        }
      },
    }
  },
})
