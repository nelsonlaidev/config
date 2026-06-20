---
'@nelsonlaidev/oxlint-config': patch
---

Sync rules from ESLint configs with oxlint 1.70.0, including new rules for eslint, imports, jsx-a11y, unicorn, and vitest scopes.

- Remove jest fallback for vitest rules (oxlint now natively supports them under the vitest scope)
- Enable `no-unused-vars` with `fix.imports: "safe-fix"` to auto-remove unused imports
- Add `sync:check` (rules diff between ESLint source and Oxlint target, including jsPlugins)
- Add `sync:report --write` (migration gap table in README)
- Update unscanned ESLint plugins documentation in README
