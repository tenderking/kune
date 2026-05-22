import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/setup.ts'],
  },
  define: {
    'import.meta.dev': 'globalThis.__import_meta_dev',
  },
})
