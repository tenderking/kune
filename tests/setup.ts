import { vi } from 'vitest'

// Mock h3 globals
globalThis.defineEventHandler = (handler: any) => handler
globalThis.getHeader = vi.fn()
globalThis.getCookie = vi.fn()
globalThis.setCookie = vi.fn()

// Mock import.meta.dev stub
;(globalThis as any).__import_meta_dev = true
