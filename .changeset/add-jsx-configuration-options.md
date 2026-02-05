---
'@nelsonlaidev/eslint-config': minor
---

Add JSX configuration options for customizing accessibility linting rules.

You can now customize JSX accessibility settings through the new `jsx` configuration option:

```ts
// Example usage
export default defineConfig({
  jsx: {
    a11y: {
      // Map custom components to native elements
      components: {
        Button: 'button',
        CustomLink: 'a',
        CustomImage: 'img'
      },
      // Configure polymorphic components
      polymorphicPropName: 'as',
      polymorphicAllowList: ['div', 'span']
    }
  }
})
```

This allows you to configure jsx-a11y plugin settings including:

- Custom component to native element mappings
- Custom attribute mappings
- Polymorphic component configuration
