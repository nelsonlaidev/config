import type { OxlintConfig } from 'oxlint'

import { isPackageExists } from 'local-pkg'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('local-pkg', () => ({
  isPackageExists: vi.fn(() => false),
}))

const importModule = async () => {
  const mod = await import('../src/base')
  return mod
}

const getPlugins = (config: OxlintConfig) =>
  (config.overrides ?? []).flatMap((o) => [...(o.plugins ?? []), ...(o.jsPlugins ?? [])])

describe('defineConfig', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.mocked(isPackageExists).mockReturnValue(false)
  })

  describe('default config', () => {
    it('should include default options', async () => {
      const { defineConfig } = await importModule()
      const config = defineConfig()

      expect(config.options).toEqual(
        expect.objectContaining({
          typeAware: true,
          maxWarnings: 0,
          denyWarnings: true,
          reportUnusedDisableDirectives: 'error',
        }),
      )
    })

    it('should include default env settings', async () => {
      const { defineConfig } = await importModule()
      const config = defineConfig()

      expect(config.env).toEqual(
        expect.objectContaining({
          node: true,
          browser: true,
          es2022: true,
        }),
      )
    })

    it('should include default ignore patterns', async () => {
      const { defineConfig } = await importModule()
      const config = defineConfig()

      expect(config.ignorePatterns).toEqual(expect.arrayContaining(['**/routeTree.gen.ts']))
    })

    it('should include jsx-a11y component mappings in settings', async () => {
      const { defineConfig } = await importModule()
      const config = defineConfig()

      expect(config.settings).toEqual(
        expect.objectContaining({
          'jsx-a11y': {
            components: {
              Button: 'button',
              Image: 'img',
              Input: 'input',
              Textarea: 'textarea',
              Link: 'a',
            },
          },
        }),
      )
    })

    it('should include default plugin overrides', async () => {
      const { defineConfig } = await importModule()
      const config = defineConfig()

      const plugins = getPlugins(config)

      expect(plugins).toEqual(
        expect.arrayContaining([
          'oxc',
          'eslint',
          'typescript',
          'unicorn',
          'promise',
          'node',
          'jsx-a11y',
          'import',
          'jsdoc',
        ]),
      )
    })
  })

  describe('conditional plugins', () => {
    it('should include react overrides when userConfig.react is true', async () => {
      const { defineConfig } = await importModule()
      const config = defineConfig({}, { react: true })

      const plugins = getPlugins(config)

      expect(plugins).toEqual(expect.arrayContaining(['react']))
    })

    it('should not include react overrides when react is false and not installed', async () => {
      const { defineConfig } = await importModule()
      const config = defineConfig({}, { react: false })

      const plugins = getPlugins(config)

      expect(plugins).not.toEqual(expect.arrayContaining(['react']))
    })

    it('should auto-detect react when package exists', async () => {
      vi.mocked(isPackageExists).mockImplementation((pkg) => pkg === 'react')

      const { defineConfig } = await importModule()
      const config = defineConfig()

      const plugins = getPlugins(config)

      expect(plugins).toEqual(expect.arrayContaining(['react']))
    })

    it('should include nextjs overrides when userConfig.nextjs is true', async () => {
      const { defineConfig } = await importModule()
      const config = defineConfig({}, { nextjs: true })

      const plugins = getPlugins(config)

      expect(plugins).toEqual(expect.arrayContaining(['nextjs']))
    })

    it('should auto-detect next when package exists', async () => {
      vi.mocked(isPackageExists).mockImplementation((pkg) => pkg === 'next')

      const { defineConfig } = await importModule()
      const config = defineConfig()

      const plugins = getPlugins(config)

      expect(plugins).toEqual(expect.arrayContaining(['nextjs']))
    })

    it('should include vitest overrides when userConfig.vitest is provided', async () => {
      const { defineConfig } = await importModule()
      const config = defineConfig({}, { vitest: { files: ['**/*.test.ts'] } })

      const plugins = getPlugins(config)

      expect(plugins).toEqual(expect.arrayContaining(['vitest']))

      const vitestOverride = (config.overrides ?? []).find((o) => o.plugins?.includes('vitest'))
      expect(vitestOverride?.files).toEqual(['**/*.test.ts'])
    })

    it('should not include vitest overrides when userConfig.vitest is not provided', async () => {
      const { defineConfig } = await importModule()
      const config = defineConfig()

      const plugins = getPlugins(config)

      expect(plugins).not.toEqual(expect.arrayContaining(['vitest']))
    })

    it('should include playwright overrides when userConfig.playwright is provided', async () => {
      const { defineConfig } = await importModule()
      const config = defineConfig({}, { playwright: { files: ['**/*.spec.ts'] } })

      const jsPlugins = (config.overrides ?? []).flatMap((o) =>
        (o.jsPlugins ?? []).map((p) => (typeof p === 'string' ? p : p.specifier)),
      )

      expect(jsPlugins).toEqual(expect.arrayContaining(['eslint-plugin-playwright']))

      const playwrightOverride = (config.overrides ?? []).find((o) =>
        o.jsPlugins?.some((p) => (typeof p === 'string' ? p : p.specifier) === 'eslint-plugin-playwright'),
      )
      expect(playwrightOverride?.files).toEqual(['**/*.spec.ts'])
    })
  })

  describe('config merging', () => {
    it('should merge user-provided oxlint config', async () => {
      const { defineConfig } = await importModule()
      const customConfig: OxlintConfig = {
        ignorePatterns: ['**/generated/**'],
      }
      const config = defineConfig(customConfig)

      expect(config.ignorePatterns).toEqual(expect.arrayContaining(['**/routeTree.gen.ts', '**/generated/**']))
    })

    it('should concatenate arrays instead of replacing them', async () => {
      const { defineConfig } = await importModule()
      const customConfig: OxlintConfig = {
        overrides: [
          {
            files: ['**/*.custom.ts'],
            rules: { 'no-console': 'error' },
          },
        ],
      }
      const config = defineConfig(customConfig)

      expect((config.overrides ?? []).length).toBeGreaterThan(1)

      const customOverride = (config.overrides ?? []).find((o) => o.files.includes('**/*.custom.ts'))
      expect(customOverride).toBeDefined()
      expect(customOverride?.rules).toEqual({ 'no-console': 'error' })
    })

    it('should deep merge settings', async () => {
      const { defineConfig } = await importModule()
      const config = defineConfig()

      expect(config.settings).toHaveProperty('jsx-a11y')
    })
  })
})
