import { AST_NODE_TYPES } from '@typescript-eslint/utils'

import { LUCIDE_REACT_SOURCE } from '../lib/constants'
import { createRule } from '../utils/create-rule'

const NON_ICON_EXPORTS = new Set(['createLucideIcon', 'icons', 'LucideIcon', 'LucideProps', 'IconNode', 'Icon'])

export const lucideIconSuffix = createRule({
  name: 'lucide-icon-suffix',
  meta: {
    docs: {
      description:
        "Enforce using the 'Icon' suffixed version of lucide-react imports (e.g., 'HomeIcon' instead of 'Home')",
    },
    messages: {
      useSuffixed:
        "Import '{{ suffixed }}' instead of '{{ name }}' from lucide-react. Always use the 'Icon' suffixed version.",
    },
    type: 'suggestion',
    fixable: 'code',
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      ImportDeclaration(node) {
        if (node.source.value !== LUCIDE_REACT_SOURCE) return

        for (const specifier of node.specifiers) {
          if (specifier.type !== AST_NODE_TYPES.ImportSpecifier) continue

          const { imported } = specifier
          if (imported.type !== AST_NODE_TYPES.Identifier) continue

          const { name } = imported

          // Skip if already has Icon suffix, or is not a PascalCase icon name
          if (name.endsWith('Icon') || !/^[A-Z]/.test(name)) continue

          // Skip known non-icon exports (utilities, types, components)
          if (NON_ICON_EXPORTS.has(name)) continue

          const suffixed = `${name}Icon`
          const isRenamed = specifier.local.name !== name

          context.report({
            node: specifier,
            messageId: 'useSuffixed',
            data: { name, suffixed },
            fix(fixer) {
              if (isRenamed) {
                return fixer.replaceText(imported, suffixed)
              }

              const { sourceCode } = context
              const scope = sourceCode.getScope(node)
              const variable = scope.variables.find((v) => v.name === name)

              if (!variable) {
                return fixer.replaceText(specifier, suffixed)
              }

              const fixes = [fixer.replaceText(specifier, suffixed)]

              for (const ref of variable.references) {
                if (ref.identifier !== imported) {
                  fixes.push(fixer.replaceText(ref.identifier, suffixed))
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
