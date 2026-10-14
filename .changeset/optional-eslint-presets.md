---
'@nelsonlaidev/eslint-config': major
---

Move optional preset dependencies to optional peers and load them only when their presets are called. Install the dependencies for React, Next.js, StyleX, Tailwind CSS, Vitest, Playwright, and Prettier explicitly when enabling those presets.

Optional presets now return promises to load their dependencies with native dynamic imports. Await each preset before passing it to `defineConfig()` or `defineConfig.withOptions()`, for example `defineConfig(await react(), await stylex())`. The base configuration remains synchronous.
