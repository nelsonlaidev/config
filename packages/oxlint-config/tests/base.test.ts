import type { Selectors } from 'eslint-plugin-better-tailwindcss/types'
import type { OxlintConfig } from 'oxlint'

import { MatcherType, SelectorKind } from 'eslint-plugin-better-tailwindcss/types'
import { describe, expect, it } from 'vitest'

import { defineConfig, nextjs, playwright, react, tailwindcss, vitest } from '../src'

const getPlugins = (config: OxlintConfig) =>
  (config.overrides ?? []).flatMap((override) => [
    ...(override.plugins ?? []),
    ...(override.jsPlugins ?? []).map((plugin) => (typeof plugin === 'string' ? plugin : plugin.specifier)),
  ])

describe('defineConfig', () => {
  describe('default config', () => {
    it('should include default options', () => {
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

    it('should include default env settings', () => {
      const config = defineConfig()

      expect(config.env).toEqual(
        expect.objectContaining({
          node: true,
          browser: true,
          es2022: true,
        }),
      )
    })

    it('should include default ignore patterns', () => {
      const config = defineConfig()

      expect(config.ignorePatterns).toEqual(expect.arrayContaining(['**/routeTree.gen.ts']))
    })

    it('should include jsx-a11y component mappings in settings', () => {
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

    it('should include default plugin overrides', () => {
      const plugins = getPlugins(defineConfig())

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

    it('should not include optional presets', () => {
      const plugins = getPlugins(defineConfig())

      expect(plugins).not.toEqual(
        expect.arrayContaining([
          '@eslint-react/eslint-plugin',
          'nextjs',
          'vitest',
          'eslint-plugin-playwright',
          'eslint-plugin-better-tailwindcss',
        ]),
      )
    })
  })

  describe('explicit presets', () => {
    it('should include react when react() is added to overrides', () => {
      const config = defineConfig({ overrides: [react()] })

      expect(getPlugins(config)).toEqual(expect.arrayContaining(['@eslint-react/eslint-plugin']))
    })

    it('should include nextjs when nextjs() is added to overrides', () => {
      const config = defineConfig({ overrides: [nextjs()] })

      expect(getPlugins(config)).toEqual(expect.arrayContaining(['nextjs']))
    })

    it('should apply native override fields passed to a preset', () => {
      const override = react({
        files: ['src/**/*.tsx'],
        rules: {
          '@eslint-react/no-array-index-key': 'off',
        },
      })

      expect(override.files).toEqual(['src/**/*.tsx'])
      expect(override.rules).toEqual(
        expect.objectContaining({
          '@eslint-react/no-array-index-key': 'off',
          '@eslint-react/immutability': 'error',
        }),
      )
    })

    it('should include vitest with a files override', () => {
      const config = defineConfig({
        overrides: [vitest({ files: ['**/*.test.ts'] })],
      })
      const override = (config.overrides ?? []).find((item) => item.plugins?.includes('vitest'))

      expect(override?.files).toEqual(['**/*.test.ts'])
    })

    it('should include playwright with a files override', () => {
      const config = defineConfig({
        overrides: [playwright({ files: ['**/*.spec.ts'] })],
      })
      const override = (config.overrides ?? []).find((item) =>
        item.jsPlugins?.some(
          (plugin) => (typeof plugin === 'string' ? plugin : plugin.specifier) === 'eslint-plugin-playwright',
        ),
      )

      expect(override?.files).toEqual(['**/*.spec.ts'])
    })

    it('should include tailwindcss and use root settings', () => {
      const selectors: Selectors = [
        {
          kind: SelectorKind.Variable,
          name: '^buttonClassName$',
          match: [{ type: MatcherType.String }],
        },
      ]
      const config = defineConfig({
        settings: {
          'better-tailwindcss': {
            entryPoint: './src/styles.css',
            selectors,
          },
        },
        overrides: [tailwindcss()],
      })

      expect(getPlugins(config)).toEqual(expect.arrayContaining(['eslint-plugin-better-tailwindcss']))
      expect((config.settings as Record<string, unknown>)['better-tailwindcss']).toEqual({
        detectComponentClasses: false,
        rootFontSize: 16,
        entryPoint: './src/styles.css',
        selectors,
      })
    })
  })

  describe('config merging', () => {
    it('should merge user-provided root config', () => {
      const config = defineConfig({
        ignorePatterns: ['**/generated/**'],
        options: {
          typeAware: false,
        },
      })

      expect(config.ignorePatterns).toEqual(expect.arrayContaining(['**/routeTree.gen.ts', '**/generated/**']))
      expect(config.options?.typeAware).toBe(false)
    })

    it('should append user-provided overrides', () => {
      const customOverride = {
        files: ['**/*.custom.ts'],
        rules: { 'eslint/no-console': 'error' as const },
      }
      const config = defineConfig({ overrides: [customOverride] })

      expect((config.overrides ?? []).length).toBeGreaterThan(1)
      expect(config.overrides).toContainEqual(customOverride)
    })

    it('should preserve caller-provided settings', () => {
      const config = defineConfig({
        settings: {
          'my-custom-setting': { enabled: true },
        },
      })

      expect(config.settings).toHaveProperty('jsx-a11y')
      expect(config.settings).toHaveProperty('my-custom-setting')
      expect((config.settings as Record<string, unknown>)['my-custom-setting']).toEqual({ enabled: true })
    })
  })
})
