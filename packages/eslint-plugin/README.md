# @nelsonlaidev/eslint-plugin

Custom ESLint rules for Nelson Lai projects.

## Installation

```bash
npm i -D @nelsonlaidev/eslint-plugin
```

## Usage

```js
import nelsonlaidevPlugin from '@nelsonlaidev/eslint-plugin'

export default [
  {
    plugins: {
      '@nelsonlaidev': nelsonlaidevPlugin,
    },
    rules: {
      '@nelsonlaidev/lucide-icon-suffix': 'error',
    },
  },
]
```

## Rules

| Rule                                                                   | Description                                                                       | Fixable |
| ---------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------- |
| [lucide-icon-suffix](docs/rules/lucide-icon-suffix.md)                 | Enforce using the `Icon` suffixed version of `lucide-react` imports               | Yes     |
| [lucide-prefer-loader-icon](docs/rules/lucide-prefer-loader-icon.md)   | Enforce using `LoaderIcon` instead of `Loader2Icon` for better visual consistency | Yes     |
| [lucide-prefer-trash2-icon](docs/rules/lucide-prefer-trash2-icon.md)   | Enforce using `Trash2Icon` instead of `TrashIcon` for better visual consistency   | Yes     |
| [shadcn-cn-wrap-variants](docs/rules/shadcn-cn-wrap-variants.md)       | Enforce wrapping `*Variants()` calls inside `cn()`                                | Yes     |
| [shadcn-cva-variants-suffix](docs/rules/shadcn-cva-variants-suffix.md) | Enforce that variables assigned to `cva()` end with `Variants`                    | Yes     |
| [shadcn-prefer-spinner](docs/rules/shadcn-prefer-spinner.md)           | Enforce using `<Spinner />` instead of loader icons from lucide-react             | Yes     |
