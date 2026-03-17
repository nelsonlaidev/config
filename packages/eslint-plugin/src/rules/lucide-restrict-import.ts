import type { LucideRestrictImportRestriction } from '../lib/defaults'

import { AST_NODE_TYPES } from '@typescript-eslint/utils'

import { LUCIDE_REACT_SOURCE } from '../lib/constants'
import { lucideRestrictImportDefaults } from '../lib/defaults'
import { createRule } from '../utils/create-rule'

export const lucideRestrictImport = createRule({
  name: 'lucide-restrict-import',
  meta: {
    docs: {
      description: 'Restrict specific imports from lucide-react and suggest preferred alternatives',
    },
    messages: {
      preferIcon:
        "Import '{{ preferred }}' instead of '{{ forbidden }}' from lucide-react for better visual consistency.",
      preferIconCustom: '{{ message }}',
    },
    type: 'suggestion',
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          restrictions: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                preferred: { type: 'string' },
                message: { type: 'string' },
              },
              required: ['name', 'preferred'],
              additionalProperties: false,
            },
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [lucideRestrictImportDefaults],
  create(context, options) {
    const [{ restrictions }] = options
    const restrictionMap = new Map<string, LucideRestrictImportRestriction>()

    for (const restriction of restrictions) {
      restrictionMap.set(restriction.name, restriction)
    }

    return {
      ImportDeclaration(node) {
        if (node.source.value !== LUCIDE_REACT_SOURCE) return

        for (const specifier of node.specifiers) {
          if (specifier.type !== AST_NODE_TYPES.ImportSpecifier) continue

          const { imported } = specifier
          if (imported.type !== AST_NODE_TYPES.Identifier) continue

          const restriction = restrictionMap.get(imported.name)
          if (!restriction) continue

          const { preferred } = restriction
          const isRenamed = specifier.local.name !== imported.name

          context.report({
            node: specifier,
            messageId: restriction.message ? 'preferIconCustom' : 'preferIcon',
            data: restriction.message ? { message: restriction.message } : { preferred, forbidden: imported.name },
            fix(fixer) {
              if (isRenamed) {
                return fixer.replaceText(imported, preferred)
              }

              const { sourceCode } = context
              const scope = sourceCode.getScope(node)
              const variable = scope.variables.find((v) => v.name === imported.name)

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
