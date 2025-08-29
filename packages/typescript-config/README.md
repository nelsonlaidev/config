# @nelsonlaidev/typescript-config

Personal TypeScript configurations for Nelson Lai projects.

## Installation

```bash
npm i -D @nelsonlaidev/typescript-config
```

Create a `tsconfig.json` file with the following content:

```jsonc
{
  "extends": "@nelsonlaidev/typescript-config/base.json",
  "compilerOptions": {
    // Custom TypeScript configuration options
  }
}
```

### Presets

You can also use predefined presets for your configuration.

- `@nelsonlaidev/typescript-config/base.json`
- `@nelsonlaidev/typescript-config/next.json`
- `@nelsonlaidev/typescript-config/react-library.json`
