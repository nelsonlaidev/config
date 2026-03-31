# Config

Personal configurations for Nelson Lai projects.

This monorepo contains shared configuration packages for various tools used across Nelson Lai's projects, including ESLint, Oxlint, Oxfmt, Prettier, and TypeScript.

## Packages

### [@nelsonlaidev/oxlint-config](packages/oxlint-config)

A shared Oxlint configuration to enforce consistent code style and best practices.

```bash
npm i -D @nelsonlaidev/oxlint-config
```

### [@nelsonlaidev/eslint-plugin](packages/eslint-plugin)

Custom ESLint rules for Nelson Lai projects.

```bash
npm i -D @nelsonlaidev/eslint-plugin
```

### [@nelsonlaidev/eslint-config](packages/eslint-config)

A shared ESLint configuration for consistent linting across Nelson Lai projects.

```bash
npm i -D @nelsonlaidev/eslint-config
```

### [@nelsonlaidev/oxfmt-config](packages/oxfmt-config)

A shared Oxfmt configuration to ensure consistent code formatting.

```bash
npm i -D @nelsonlaidev/oxfmt-config
```

### [@nelsonlaidev/prettier-config](packages/prettier-config)

A shared Prettier configuration that bundles `prettier-plugin-packagejson`.

```bash
npm i -D @nelsonlaidev/prettier-config
```

### [@nelsonlaidev/typescript-config](packages/typescript-config)

A shared TypeScript configuration to standardize TypeScript compiler options.

```bash
npm i -D @nelsonlaidev/typescript-config
```

## Credits

This project is inspired by the excellent work from:

- [antfu/eslint-config](https://github.com/antfu/eslint-config)
- [sxzz/eslint-config](https://github.com/sxzz/eslint-config)

## License

This project is licensed under the [MIT License](LICENSE).
