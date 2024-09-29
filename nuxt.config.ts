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

  modules: ['@nuxt/icon', '@nuxt/ui', '@nuxt/image'],

  nitro: {
    inlineDynamicImports: true,
    preset: 'node-server',
  },

  imports: {
    dirs: ['types', 'store'],
  },

  colorMode: {
    preference: 'light',
  },

  alias: {
    cookie: resolver.resolve(__dirname, 'node_modules/cookie'),
  },
  runtimeConfig: {
    nodemailer: {
      host: import.meta.env.SMTP_HOST,
      port: import.meta.env.SMTP_PORT,
      user: import.meta.env.SMTP_USER,
      password: import.meta.env.SMTP_PASSWORD,
      from: import.meta.env.EMAIL_FROM,
      secure: import.meta.env.SMTP_SECURE,
    },
    public: {
      uploadsDir: import.meta.env.UPLOADS_DIR,
      nodeEnv: import.meta.env.NODE_ENV,
    },
  },
  compatibilityDate: '2024-09-03',
})
