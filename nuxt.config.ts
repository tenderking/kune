import { createResolver } from 'nuxt/kit'

// Resolve relative from the current file
const resolver = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  css: ['@/assets/css/main.css'],

  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },

  modules: ['nuxt-icon', '@nuxt/ui'],

  nitro: {
    inlineDynamicImports: true,
  },

  imports: {
    dirs: ['types', 'store'],
  },

  // colorMode: {
  //   preference: "light",
  // },

  alias: {
    cookie: resolver.resolve(__dirname, 'node_modules/cookie'),
  },
})
