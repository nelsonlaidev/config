import { AST_NODE_TYPES } from '@typescript-eslint/utils'

import { LUCIDE_REACT_SOURCE } from '../lib/constants'
import { lucideIconSuffixDefaults } from '../lib/defaults'
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
        "Import '{{ expected }}' instead of '{{ name }}' from lucide-react. Always use the 'Icon' suffixed version.",
      useUnsuffixed:
        "Import '{{ expected }}' instead of '{{ name }}' from lucide-react. Always use the version without the 'Icon' suffix.",
    },
    type: 'suggestion',
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          suffix: {
            type: 'string',
            enum: ['with', 'without'],
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [lucideIconSuffixDefaults],
  create(context, options) {
    const [{ suffix }] = options

    return {
      ImportDeclaration(node) {
        if (node.source.value !== LUCIDE_REACT_SOURCE) return

        const withSuffix = suffix === 'with'

        for (const specifier of node.specifiers) {
          if (specifier.type !== AST_NODE_TYPES.ImportSpecifier) continue

          const { imported } = specifier
          if (imported.type !== AST_NODE_TYPES.Identifier) continue

          const { name } = imported

          if (!/^[A-Z]/.test(name)) continue
          if (NON_ICON_EXPORTS.has(name)) continue

          const hasIconSuffix = name.endsWith('Icon')
          if (withSuffix === hasIconSuffix) continue

          const expected = withSuffix ? `${name}Icon` : name.slice(0, -4)
          const isRenamed = specifier.local.name !== name

          context.report({
            node: specifier,
            messageId: withSuffix ? 'useSuffixed' : 'useUnsuffixed',
            data: { name, expected },
            fix(fixer) {
              if (isRenamed) {
                return fixer.replaceText(imported, expected)
              }

              const scope = context.sourceCode.getScope(node)
              const variable = scope.variables.find((v) => v.name === name)

              if (!variable) {
                return fixer.replaceText(specifier, expected)
              }

              const fixes = [fixer.replaceText(specifier, expected)]

              for (const ref of variable.references) {
                if (ref.identifier !== imported) {
                  fixes.push(fixer.replaceText(ref.identifier, expected))
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
