import type { Rule } from 'eslint'

const LUCIDE_REACT_SOURCE = 'lucide-react'

export const lucideIconSuffix: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        "Enforce using the 'Icon' suffixed version of lucide-react imports (e.g., 'HomeIcon' instead of 'Home')",
      url: 'https://github.com/nelsonlaidev/config/blob/main/packages/eslint-plugin/docs/rules/lucide-icon-suffix.md',
    },
    fixable: 'code',
    messages: {
      useSuffixed:
        "Import '{{suffixed}}' instead of '{{name}}' from lucide-react. Always use the 'Icon' suffixed version.",
    },
    schema: [],
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        if (node.source.value !== LUCIDE_REACT_SOURCE) return

        for (const specifier of node.specifiers) {
          if (specifier.type !== 'ImportSpecifier') continue

          const { imported } = specifier
          if (imported.type !== 'Identifier') continue

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
                // `import { Home as MyIcon } from 'lucide-react'` → `import { HomeIcon as MyIcon } from 'lucide-react'`
                return fixer.replaceText(imported, suffixed)
              }

              // `import { Home } from 'lucide-react'` → `import { HomeIcon } from 'lucide-react'`
              // Need to replace entire specifier and all references
              const { sourceCode } = context
              const scope = sourceCode.getScope(node)
              const variable = scope.variables.find((v) => v.name === name)

              if (!variable) {
                return fixer.replaceText(specifier, suffixed)
              }

              const fixes: Rule.Fix[] = [fixer.replaceText(specifier, suffixed)]

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
}

const NON_ICON_EXPORTS = new Set(['createLucideIcon', 'icons', 'LucideIcon', 'LucideProps', 'IconNode'])
