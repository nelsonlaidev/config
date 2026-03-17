import path from 'node:path'

import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { minimatch } from 'minimatch'

import { LUCIDE_REACT_SOURCE } from '../lib/constants'
import { shadcnPreferSpinnerDefaults } from '../lib/defaults'
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
    schema: [
      {
        type: 'object',
        properties: {
          ignore: {
            type: 'array',
            items: { type: 'string' },
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [shadcnPreferSpinnerDefaults],
  create(context, options) {
    const [{ ignore }] = options
    const { filename } = context

    const relativePath = path.relative(context.cwd, filename).replaceAll('\\', '/')
    if (ignore.some((pattern) => minimatch(relativePath, pattern))) return {}

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
