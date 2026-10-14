import { execFileSync } from 'node:child_process'
import {
  copyFileSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { afterEach, beforeEach, describe, it } from 'vitest'

const packageDir = fileURLToPath(new URL('..', import.meta.url))
const manifest = JSON.parse(readFileSync(path.join(packageDir, 'package.json'), 'utf-8')) as {
  dependencies: Record<string, string>
}
const optionalPresets = [
  {
    preset: 'react',
    dependencies: ['@eslint-react/eslint-plugin', 'eslint-plugin-react-hooks'],
    plugin: '@eslint-react',
  },
  { preset: 'nextjs', dependencies: ['@next/eslint-plugin-next'], plugin: '@next/next' },
  { preset: 'stylex', dependencies: ['@stylexjs/eslint-plugin'], plugin: '@stylexjs' },
  { preset: 'tailwindcss', dependencies: ['eslint-plugin-better-tailwindcss'], plugin: 'better-tailwindcss' },
  { preset: 'vitest', dependencies: ['@vitest/eslint-plugin'], plugin: 'vitest' },
  { preset: 'playwright', dependencies: ['eslint-plugin-playwright'], plugin: 'playwright' },
  { preset: 'prettier', dependencies: ['eslint-config-prettier'], plugin: null },
]

describe('optional presets in the built package', () => {
  let fixtureDir: string
  let configScript: string

  beforeEach(() => {
    fixtureDir = mkdtempSync(path.join(tmpdir(), 'eslint-config-'))
    copyFileSync(path.join(packageDir, 'dist/index.mjs'), path.join(fixtureDir, 'index.mjs'))

    for (const dependency of Object.keys(manifest.dependencies)) {
      const target = path.join(fixtureDir, 'node_modules', dependency)
      mkdirSync(path.dirname(target), { recursive: true })
      symlinkSync(realpathSync(path.join(packageDir, 'node_modules', dependency)), target, 'dir')
    }

    configScript = `
      import assert from 'node:assert/strict'
      import * as config from ${JSON.stringify(pathToFileURL(path.join(fixtureDir, 'index.mjs')).href)}
    `
  })

  afterEach(() => {
    rmSync(fixtureDir, { recursive: true, force: true })
  })

  it('loads the base config without any optional dependencies installed', () => {
    execFileSync(process.execPath, ['--input-type=module'], {
      input: `${configScript}
        const result = config.defineConfig()
        assert.ok(Array.isArray(result))
        assert.ok(result.some(entry => entry.name === 'nelsonlaidev/javascript'))
      `,
    })
  })

  it.each(optionalPresets)('reports the missing dependency when $preset() is called', ({ preset, dependencies }) => {
    execFileSync(process.execPath, ['--input-type=module'], {
      input: `${configScript}
        await assert.rejects(() => config.${preset}(), {
          message: ${JSON.stringify(`Install "${dependencies[0]}" to use this preset: npm i -D ${dependencies[0]}`)},
        })
      `,
    })
  })

  it.each(optionalPresets)(
    'loads $preset() with only its dependencies installed',
    ({ preset, dependencies, plugin }) => {
      for (const dependency of dependencies) {
        const target = path.join(fixtureDir, 'node_modules', dependency)
        mkdirSync(path.dirname(target), { recursive: true })
        symlinkSync(realpathSync(path.join(packageDir, 'node_modules', dependency)), target, 'dir')
      }

      execFileSync(process.execPath, ['--input-type=module'], {
        input: `${configScript}
        const result = await config.${preset}({ rules: { 'no-console': 'warn' } })
        assert.equal(result.name, 'nelsonlaidev/${preset}')
        assert.equal(result.rules['no-console'], 'warn')
        assert.ok(Object.keys(result.rules).length > 1)
        ${plugin ? `assert.ok(result.plugins[${JSON.stringify(plugin)}].rules)` : ''}
        ${plugin ? `assert.equal(result.plugins[${JSON.stringify(plugin)}], (await config.${preset}()).plugins[${JSON.stringify(plugin)}])` : ''}
        ${preset === 'react' ? "assert.ok(result.plugins['react-hooks'].rules)" : ''}
      `,
      })
    },
  )

  it('reports missing React Hooks when the React plugin is installed', () => {
    const target = path.join(fixtureDir, 'node_modules/@eslint-react/eslint-plugin')
    mkdirSync(path.dirname(target), { recursive: true })
    symlinkSync(realpathSync(path.join(packageDir, 'node_modules/@eslint-react/eslint-plugin')), target, 'dir')

    execFileSync(process.execPath, ['--input-type=module'], {
      input: `${configScript}
        await assert.rejects(() => config.react(), {
          message: 'Install "eslint-plugin-react-hooks" to use this preset: npm i -D eslint-plugin-react-hooks',
        })
      `,
    })
  })

  it('loads optional presets under the tsx loader', () => {
    for (const dependency of optionalPresets.flatMap((preset) => preset.dependencies)) {
      const target = path.join(fixtureDir, 'node_modules', dependency)
      mkdirSync(path.dirname(target), { recursive: true })
      symlinkSync(realpathSync(path.join(packageDir, 'node_modules', dependency)), target, 'dir')
    }

    execFileSync(process.execPath, ['--import', import.meta.resolve('tsx'), '--input-type=module'], {
      input: `${configScript}
        for (const preset of ${JSON.stringify(optionalPresets)}) {
          const result = await config[preset.preset]()
          assert.equal(result.name, 'nelsonlaidev/' + preset.preset)
          assert.ok(Object.keys(result.rules).length > 0)
          if (preset.plugin) assert.ok(result.plugins[preset.plugin].rules)
        }
      `,
    })
  })

  it('loads an ESLint config file that awaits an optional preset', () => {
    const target = path.join(fixtureDir, 'node_modules/@stylexjs/eslint-plugin')
    mkdirSync(path.dirname(target), { recursive: true })
    symlinkSync(realpathSync(path.join(packageDir, 'node_modules/@stylexjs/eslint-plugin')), target, 'dir')

    const configFile = path.join(fixtureDir, 'eslint.config.mjs')
    writeFileSync(
      configFile,
      `
      import { defineConfig, stylex } from './index.mjs'
      export default defineConfig(await stylex())
    `,
    )
    const eslintUrl = pathToFileURL(realpathSync(path.join(packageDir, 'node_modules/eslint/lib/api.js'))).href

    execFileSync(process.execPath, ['--input-type=module'], {
      input: `${configScript}
        import { ESLint } from ${JSON.stringify(eslintUrl)}
        const eslint = new ESLint({ overrideConfigFile: ${JSON.stringify(configFile)} })
        const result = await eslint.calculateConfigForFile('src/index.ts')
        assert.ok(result.plugins['@stylexjs'].rules)
        assert.equal(result.rules['@stylexjs/valid-styles'][0], 2)
      `,
    })
  })

  it('preserves errors from an installed plugin with a missing transitive dependency', () => {
    const pluginDir = path.join(fixtureDir, 'node_modules/@stylexjs/eslint-plugin')
    mkdirSync(pluginDir, { recursive: true })
    writeFileSync(path.join(pluginDir, 'package.json'), JSON.stringify({ main: 'index.cjs' }))
    writeFileSync(path.join(pluginDir, 'index.cjs'), "require('missing-stylex-internal-dependency')")

    execFileSync(process.execPath, ['--input-type=module'], {
      input: `${configScript}
        await assert.rejects(() => config.stylex(), {
          code: 'MODULE_NOT_FOUND',
          message: /missing-stylex-internal-dependency/,
        })
      `,
    })
  })
})
