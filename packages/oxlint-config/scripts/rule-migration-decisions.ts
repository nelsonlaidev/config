export type RuleMigrationStatus = 'not_implemented' | 'deprecated' | 'replaced_by' | 'intentionally_omitted'

export type RuleMigrationDecision = {
  status: RuleMigrationStatus
  replacement?: string
  note?: string
}

export const ruleMigrationDecisions = {
  'eslint/nelsonlaidev/javascript/rules:no-dupe-args': {
    status: 'replaced_by',
    replacement: 'Strict Mode',
  },
  'eslint/nelsonlaidev/javascript/rules:no-octal': {
    status: 'replaced_by',
    replacement: 'Strict Mode',
  },
  'imports/nelsonlaidev/import-x/rules:import-x/no-deprecated': {
    status: 'replaced_by',
    replacement: 'typescript/no-deprecated',
  },
  'imports/nelsonlaidev/import-x/rules:import-x/no-extraneous-dependencies': {
    status: 'not_implemented',
  },
  'imports/nelsonlaidev/import-x/rules:import-x/no-import-module-exports': {
    status: 'not_implemented',
  },
  'imports/nelsonlaidev/import-x/rules:import-x/no-relative-packages': {
    status: 'not_implemented',
  },
  'imports/nelsonlaidev/import-x/rules:import-x/no-unresolved': {
    status: 'intentionally_omitted',
    note: 'Will always contain false positives due to module resolution complexity.',
  },
  'imports/nelsonlaidev/import-x/rules:import-x/no-useless-path-segments': {
    status: 'not_implemented',
  },
  'jsx-a11y/nelsonlaidev/jsx-a11y/rules:jsx-a11y/label-has-for': {
    status: 'deprecated',
    note: 'Replaced by jsx-a11y/label-has-associated-control',
  },
  'node/nelsonlaidev/node/rules:n/no-deprecated-api': {
    status: 'not_implemented',
  },
  'node/nelsonlaidev/node/rules:n/prefer-node-protocol': {
    status: 'replaced_by',
    replacement: 'unicorn/prefer-node-protocol',
  },
  'node/nelsonlaidev/node/rules:n/prefer-promises/dns': {
    status: 'not_implemented',
  },
  'node/nelsonlaidev/node/rules:n/prefer-promises/fs': {
    status: 'not_implemented',
  },
  'promise/nelsonlaidev/promise/rules:promise/no-native': {
    status: 'replaced_by',
    replacement: 'eslint/no-undef',
  },
  'react/nelsonlaidev/react/rules:@eslint-react/no-leaked-conditional-rendering': {
    status: 'intentionally_omitted',
    note: 'Oxlint JavaScript plugins do not support type-aware rules.',
  },
  'react/nelsonlaidev/react/rules:@eslint-react/no-unused-props': {
    status: 'intentionally_omitted',
    note: 'Oxlint JavaScript plugins do not support type-aware rules.',
  },
  'typescript/nelsonlaidev/typescript/rules:@typescript-eslint/class-methods-use-this': {
    status: 'replaced_by',
    replacement: 'eslint/class-methods-use-this',
  },
  'typescript/nelsonlaidev/typescript/rules:@typescript-eslint/default-param-last': {
    status: 'replaced_by',
    replacement: 'eslint/default-param-last',
  },
  'typescript/nelsonlaidev/typescript/rules:@typescript-eslint/no-array-constructor': {
    status: 'replaced_by',
    replacement: 'eslint/no-array-constructor',
  },
  'typescript/nelsonlaidev/typescript/rules:@typescript-eslint/no-empty-function': {
    status: 'replaced_by',
    replacement: 'eslint/no-empty-function',
  },
  'typescript/nelsonlaidev/typescript/rules:@typescript-eslint/no-invalid-this': {
    status: 'replaced_by',
    replacement: 'eslint/no-invalid-this',
  },
  'typescript/nelsonlaidev/typescript/rules:@typescript-eslint/no-loop-func': {
    status: 'replaced_by',
    replacement: 'eslint/no-loop-func',
  },
  'typescript/nelsonlaidev/typescript/rules:@typescript-eslint/no-shadow': {
    status: 'replaced_by',
    replacement: 'eslint/no-shadow',
  },
  'typescript/nelsonlaidev/typescript/rules:@typescript-eslint/no-unused-expressions': {
    status: 'replaced_by',
    replacement: 'eslint/no-unused-expressions',
  },
  'typescript/nelsonlaidev/typescript/rules:@typescript-eslint/no-unused-vars': {
    status: 'replaced_by',
    replacement: 'eslint/no-unused-vars',
  },
  'typescript/nelsonlaidev/typescript/rules:@typescript-eslint/no-useless-constructor': {
    status: 'replaced_by',
    replacement: 'eslint/no-useless-constructor',
  },
  'typescript/nelsonlaidev/typescript/rules:dot-notation': {
    status: 'replaced_by',
    replacement: 'typescript/dot-notation',
  },
  'typescript/nelsonlaidev/typescript/rules:no-array-constructor': {
    status: 'replaced_by',
    replacement: 'eslint/no-array-constructor',
  },
  'typescript/nelsonlaidev/typescript/rules:no-dupe-args': {
    status: 'replaced_by',
    replacement: 'Strict Mode',
  },
  'typescript/nelsonlaidev/typescript/rules:no-dupe-class-members': {
    status: 'replaced_by',
    replacement: 'eslint/no-dupe-class-members',
  },
  'typescript/nelsonlaidev/typescript/rules:no-empty-function': {
    status: 'replaced_by',
    replacement: 'eslint/no-empty-function',
  },
  'typescript/nelsonlaidev/typescript/rules:no-new-symbol': {
    status: 'deprecated',
  },
  'typescript/nelsonlaidev/typescript/rules:no-redeclare': {
    status: 'replaced_by',
    replacement: 'eslint/no-redeclare',
  },
  'typescript/nelsonlaidev/typescript/rules:no-return-await': {
    status: 'deprecated',
  },
  'typescript/nelsonlaidev/typescript/rules:no-unused-expressions': {
    status: 'replaced_by',
    replacement: 'eslint/no-unused-expressions',
  },
  'typescript/nelsonlaidev/typescript/rules:no-unused-vars': {
    status: 'replaced_by',
    replacement: 'eslint/no-unused-vars',
  },
  'typescript/nelsonlaidev/typescript/rules:no-useless-constructor': {
    status: 'replaced_by',
    replacement: 'eslint/no-useless-constructor',
  },
  'unicorn/nelsonlaidev/unicorn/rules:no-process-exit': {
    status: 'replaced_by',
    replacement: 'unicorn/no-process-exit',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/better-dom-traversing': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/class-reference-in-static-methods': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/comment-content': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/consistent-boolean-name': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/consistent-class-member-order': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/consistent-compound-words': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/consistent-conditional-object-spread': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/consistent-destructuring': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/consistent-export-decorator-position': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/consistent-function-style': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/consistent-json-file-read': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/consistent-optional-chaining': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/consistent-tuple-labels': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/default-export-style': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/dom-node-dataset': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/expiring-todo-comments': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/explicit-timer-delay': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/id-match': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/isolated-functions': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/logical-assignment-operators': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/name-replacements': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-accidental-bitwise-operator': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-array-concat-in-loop': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-array-from-fill': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-array-front-mutation': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-array-sort-for-min-max': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-array-splice': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-asterisk-prefix-in-documentation-comments': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-async-promise-finally': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-blob-to-file': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-boolean-sort-comparator': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-break-in-nested-loop': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-canvas-to-image': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-chained-comparison': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-collection-bracket-access': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-computed-property-existence-check': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-confusing-array-splice': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-confusing-array-with': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-constant-zero-expression': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-declarations-before-early-exit': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-double-comparison': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-duplicate-if-branches': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-duplicate-logical-operands': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-duplicate-loops': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-duplicate-set-values': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-error-property-assignment': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-exports-in-scripts': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-for-each': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-for-loop': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-global-object-property-assignment': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-impossible-length-comparison': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-incorrect-query-selector': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-incorrect-template-string-interpolation': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-invalid-argument-count': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-invalid-character-comparison': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-invalid-file-input-accept': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-invalid-well-known-symbol-methods': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-keyword-prefix': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-late-current-target-access': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-late-event-control': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-loop-iterable-mutation': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-manually-wrapped-comments': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-mismatched-map-key': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-misrefactored-assignment': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-named-default': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-negated-array-predicate': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-negated-comparison': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-non-function-verb-prefix': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-nonstandard-builtin-properties': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-object-methods-with-collections': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-optional-chaining-on-undeclared-variable': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-redundant-comparison': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-return-array-push': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-selector-as-dom-name': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-subtraction-comparison': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-this-outside-of-class': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-top-level-assignment-in-function': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-top-level-side-effects': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-uncalled-method': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-undeclared-class-members': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-unnecessary-array-flat-map': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-unnecessary-boolean-comparison': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-unnecessary-fetch-options': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-unnecessary-global-this': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-unnecessary-nested-ternary': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-unnecessary-polyfills': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-unnecessary-splice': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-unreadable-for-of-expression': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-unreadable-new-expression': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-unreadable-object-destructuring': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-unsafe-buffer-conversion': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-unsafe-dom-html': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-unsafe-promise-all-settled-values': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-unsafe-property-key': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-unsafe-string-replacement': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-unused-array-method-return': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-unused-properties': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-useless-boolean-cast': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-useless-coercion': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-useless-compound-assignment': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-useless-concat': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-useless-continue': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-useless-delete-check': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-useless-else': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-useless-logical-operand': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-useless-override': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-useless-recursion': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-useless-template-literals': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/no-xor-as-exponentiation': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/operator-assignment': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-abort-signal-any': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-abort-signal-timeout': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-add-event-listener-options': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-aggregate-error': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-array-from-async': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-array-from-map': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-array-from-range': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-array-iterable-methods': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-array-last-methods': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-array-slice': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-await': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-block-statement-over-iife': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-boolean-return': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-continue': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-direct-iteration': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-dispose': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-dom-node-html-methods': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-dom-node-replace-children': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-early-return': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-else-if': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-error-is-error': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-flat-math-min-max': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-get-or-insert-computed': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-global-number-constants': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-group-by': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-has-check': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-hoisting-branch-code': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-https': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-identifier-import-export-specifiers': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-includes-over-repeated-comparisons': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-iterable-in-constructor': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-iterator-concat': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-iterator-helpers': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-iterator-to-array': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-iterator-to-array-at-end': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-location-assign': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-map-from-entries': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-math-abs': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-math-constants': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-minimal-ternary': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-number-is-safe-integer': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-object-define-properties': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-object-destructuring-defaults': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-object-iterable-methods': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-observer-apis': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-path2d': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-private-class-fields': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-promise-try': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-promise-with-resolvers': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-queue-microtask': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-regexp-escape': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-scoped-selector': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-set-methods': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-short-arrow-method': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-simple-condition-first': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-simple-sort-comparator': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-simplified-conditions': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-single-array-predicate': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-single-object-destructuring': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-single-replace': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-smaller-scope': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-split-limit': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-string-match-all': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-string-pad-start-end': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-string-repeat': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-switch': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-temporal': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-toggle-attribute': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-type-literal-last': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-uint8array-base64': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-unary-minus': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-unicode-code-point-escapes': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-url-can-parse': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-url-href': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-url-search-parameters': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prefer-while-loop-condition': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/prevent-abbreviations': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/require-array-sort-compare': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/require-css-escape': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/require-passive-events': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/require-proxy-trap-boolean-return': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/string-content': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/template-indent': {
    status: 'not_implemented',
  },
  'unicorn/nelsonlaidev/unicorn/rules:unicorn/try-complexity': {
    status: 'not_implemented',
  },
} satisfies Record<string, RuleMigrationDecision>
