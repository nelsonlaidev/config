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
  (config.overrides ?? []).flatMap((o) => [
    ...(o.plugins ?? []),
    ...(o.jsPlugins ?? []).map((p) => (typeof p === 'string' ? p : p.specifier)),
  ])

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
      const config = defineConfig({ custom: { react: true } })

      const plugins = getPlugins(config)

      expect(plugins).toEqual(expect.arrayContaining(['@eslint-react/eslint-plugin']))
    })

    it('should not include react overrides when react is false and not installed', async () => {
      const { defineConfig } = await importModule()
      const config = defineConfig({ custom: { react: false } })

      const plugins = getPlugins(config)

      expect(plugins).not.toEqual(expect.arrayContaining(['@eslint-react/eslint-plugin']))
    })

    it('should auto-detect react when package exists', async () => {
      vi.mocked(isPackageExists).mockImplementation((pkg) => pkg === 'react')

      const { defineConfig } = await importModule()
      const config = defineConfig()

      const plugins = getPlugins(config)

      expect(plugins).toEqual(expect.arrayContaining(['@eslint-react/eslint-plugin']))
    })

    it('should include nextjs overrides when userConfig.nextjs is true', async () => {
      const { defineConfig } = await importModule()
      const config = defineConfig({ custom: { nextjs: true } })

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
      const config = defineConfig({ custom: { vitest: { files: ['**/*.test.ts'] } } })

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
      const config = defineConfig({ custom: { playwright: { files: ['**/*.spec.ts'] } } })

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

  describe('tailwindcss plugin', () => {
    it('should include tailwindcss overrides when userConfig.tailwindcss is provided', async () => {
      const { defineConfig } = await importModule()
      const config = defineConfig({ custom: { tailwindcss: {} } })

      const jsPlugins = (config.overrides ?? []).flatMap((o) =>
        (o.jsPlugins ?? []).map((p) => (typeof p === 'string' ? p : p.specifier)),
      )

      expect(jsPlugins).toEqual(expect.arrayContaining(['eslint-plugin-better-tailwindcss']))
    })

    it('should not include tailwindcss overrides when userConfig.tailwindcss is not provided', async () => {
      const { defineConfig } = await importModule()
      const config = defineConfig()

      const jsPlugins = (config.overrides ?? []).flatMap((o) =>
        (o.jsPlugins ?? []).map((p) => (typeof p === 'string' ? p : p.specifier)),
      )

      expect(jsPlugins).not.toEqual(expect.arrayContaining(['eslint-plugin-better-tailwindcss']))
    })

    it('should include default better-tailwindcss settings with selectors', async () => {
      const { defineConfig } = await importModule()
      const config = defineConfig({ custom: { tailwindcss: {} } })

      const twSettings = (config.settings as Record<string, unknown>)['better-tailwindcss'] as Record<string, unknown>

      expect(twSettings).toBeDefined()
      expect(twSettings.detectComponentClasses).toBe(false)
      expect(twSettings.rootFontSize).toBe(16)
      expect(twSettings.selectors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: 'classNames' }),
          expect.objectContaining({ name: '.+ClassNames' }),
          expect.objectContaining({ name: '.+ClassName' }),
        ]),
      )
    })

    it('should merge user-provided tailwindcss settings over defaults', async () => {
      const { defineConfig } = await importModule()
      const config = defineConfig({ custom: { tailwindcss: { rootFontSize: 14, entryPoint: './src/styles.css' } } })

      const twSettings = (config.settings as Record<string, unknown>)['better-tailwindcss'] as Record<string, unknown>

      expect(twSettings.rootFontSize).toBe(14)
      expect(twSettings.entryPoint).toBe('./src/styles.css')
    })
  })

  describe('config merging', () => {
    it('should merge user-provided oxlint config', async () => {
      const { defineConfig } = await importModule()
      const customConfig: OxlintConfig = {
        ignorePatterns: ['**/generated/**'],
      }
      const config = defineConfig({ config: customConfig })

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
      const config = defineConfig({ config: customConfig })

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

    it('should preserve caller-provided config.settings', async () => {
      const { defineConfig } = await importModule()
      const config = defineConfig({
        config: {
          settings: {
            'my-custom-setting': { enabled: true },
          },
        },
      })

      expect(config.settings).toHaveProperty('jsx-a11y')
      expect(config.settings).toHaveProperty('my-custom-setting')
      expect((config.settings as Record<string, unknown>)['my-custom-setting']).toEqual({ enabled: true })
    })

    it('should not include better-tailwindcss settings when tailwindcss is not enabled', async () => {
      const { defineConfig } = await importModule()
      const config = defineConfig()

      expect(config.settings).not.toHaveProperty('better-tailwindcss')
    })
  })
})
