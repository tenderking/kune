import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'

describe('styling and color mode setup', () => {
  it('has tailwindcss and nuxt/ui imported before base.css in main.css', () => {
    const mainCssPath = path.resolve(__dirname, '../assets/css/main.css')
    const content = fs.readFileSync(mainCssPath, 'utf8')
    const lines = content.split('\n').map(l => l.trim()).filter(Boolean)

    const tailwindIdx = lines.findIndex(l => l.includes('tailwindcss'))
    const nuxtUiIdx = lines.findIndex(l => l.includes('@nuxt/ui'))
    const baseCssIdx = lines.findIndex(l => l.includes('./base.css'))

    expect(tailwindIdx).toBeGreaterThan(-1)
    expect(nuxtUiIdx).toBeGreaterThan(-1)
    expect(baseCssIdx).toBeGreaterThan(-1)

    // Tailwind and Nuxt UI must load before base.css overrides
    expect(tailwindIdx).toBeLessThan(baseCssIdx)
    expect(nuxtUiIdx).toBeLessThan(baseCssIdx)
  })

  it('defines class-based dark mode custom variant in main.css', () => {
    const mainCssPath = path.resolve(__dirname, '../assets/css/main.css')
    const content = fs.readFileSync(mainCssPath, 'utf8')
    expect(content).toContain('@custom-variant dark')
  })

  it('contains .dark selector in base.css for user toggle dark mode support', () => {
    const baseCssPath = path.resolve(__dirname, '../assets/css/base.css')
    const content = fs.readFileSync(baseCssPath, 'utf8')
    expect(content).toContain('.dark {')
  })

  it('declares ssr: true and main.css in nuxt.config.ts', () => {
    const nuxtConfigPath = path.resolve(__dirname, '../nuxt.config.ts')
    const content = fs.readFileSync(nuxtConfigPath, 'utf8')
    expect(content).toContain('ssr: true')
    expect(content).toContain('css: [\'@/assets/css/main.css\']')
  })

  it('wraps NavBar theme toggle button in ClientOnly to prevent hydration mismatch', () => {
    const navBarPath = path.resolve(__dirname, '../components/NavBar.vue')
    const content = fs.readFileSync(navBarPath, 'utf8')
    expect(content).toContain('<ClientOnly>')
    expect(content).toContain('</ClientOnly>')
  })
})
