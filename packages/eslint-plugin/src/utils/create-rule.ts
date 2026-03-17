import { ESLintUtils } from '@typescript-eslint/utils'

const DOCS_BASE_URL = 'https://github.com/nelsonlaidev/config/blob/main/packages/eslint-plugin/docs/rules'

export const createRule = ESLintUtils.RuleCreator((name) => `${DOCS_BASE_URL}/${name}.md`)
