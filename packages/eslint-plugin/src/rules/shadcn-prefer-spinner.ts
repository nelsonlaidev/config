import type { Rule } from 'eslint'

const LUCIDE_REACT_SOURCE = 'lucide-react'
const FORBIDDEN_ICONS = new Set(['LoaderIcon', 'Loader2Icon'])

function removeSpecifier(
  fixer: Rule.RuleFixer,
  node: Rule.Node,
  specifier: Rule.Node,
  importSpecifiers: Rule.Node[],
  index: number,
): Rule.Fix | null {
  if (importSpecifiers.length === 1) {
    return fixer.remove(node)
  }

  if (index === importSpecifiers.length - 1) {
    const prev = importSpecifiers[index - 1]
    if (prev?.range && specifier.range) {
      return fixer.removeRange([prev.range[1], specifier.range[1]])
    }
  } else {
    const next = importSpecifiers[index + 1]
    if (specifier.range && next?.range) {
      return fixer.removeRange([specifier.range[0], next.range[0]])
    }
  }

  return null
}

function hasSpinnerImport(sourceCode: Rule.RuleContext['sourceCode'], importSource: string): boolean {
  return sourceCode.ast.body.some(
    (stmt) =>
      stmt.type === 'ImportDeclaration' &&
      stmt.source.value === importSource &&
      stmt.specifiers.some(
        (s) => s.type === 'ImportSpecifier' && s.imported.type === 'Identifier' && s.imported.name === 'Spinner',
      ),
  )
}

export const shadcnPreferSpinner: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: "Enforce using the '<Spinner />' component instead of loader icons from lucide-react",
      url: 'https://github.com/nelsonlaidev/config/blob/main/packages/eslint-plugin/docs/rules/shadcn-prefer-spinner.md',
    },
    fixable: 'code',
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

          const localName = specifier.local.name
          const { sourceCode } = context
          const importSpecifiers = node.specifiers.filter((s) => s.type === 'ImportSpecifier') as Rule.Node[]
          const specifierNode = specifier as Rule.Node
          const index = importSpecifiers.indexOf(specifierNode)

          context.report({
            node: specifierNode,
            messageId: 'preferSpinner',
            data: { name: imported.name, importSource },
            *fix(fixer) {
              const removeFix = removeSpecifier(fixer, node, specifierNode, importSpecifiers, index)
              if (removeFix) yield removeFix

              const scope = sourceCode.getScope(node)
              const variable = scope.variables.find((v) => v.name === localName)
              if (variable) {
                for (const ref of variable.references) {
                  if (ref.identifier !== imported && ref.identifier !== specifier.local) {
                    yield fixer.replaceText(ref.identifier, 'Spinner')
                  }
                }
              }

              if (!hasSpinnerImport(sourceCode, importSource)) {
                const firstNode = sourceCode.ast.body[0]
                if (firstNode) {
                  yield fixer.insertTextBefore(firstNode, `import { Spinner } from '${importSource}'\n`)
                }
              }
            },
          })
        }
      },
    }
  },
}
