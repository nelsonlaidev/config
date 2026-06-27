---
'@nelsonlaidev/oxlint-config': patch
---

Avoid importing optional Oxlint `jsPlugins` at package load time by snapshotting plugin recommended rules and Tailwind selector defaults into generated local data. Required default `jsPlugins` are now marked as non-optional peer dependencies, while conditional presets can remain optional.
