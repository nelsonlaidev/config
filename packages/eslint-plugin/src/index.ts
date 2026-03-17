import type { ESLint, Rule } from 'eslint'

import { name, version } from '../package.json'

import { rules } from './rules'

const plugin = {
  meta: { name, version },
  rules: rules as unknown as Record<string, Rule.RuleModule>,
} satisfies ESLint.Plugin

export default plugin
