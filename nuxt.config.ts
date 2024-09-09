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

  tailwindcss: {
    exposeConfig: true,
    viewer: true,
    // and more...
  },

  modules: ['nuxt-icon', '@nuxt/ui', '@hebilicious/authjs-nuxt'],

  nitro: {
    inlineDynamicImports: true,
    preset: 'node-server',
  },
  authJs: {
    baseUrl: import.meta.env.NUXT_NEXTAUTH_URL,
    verifyClientOnEveryRequest: false,
    authenticatedRedirectTo: '/profile',

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
    authJs: {
      secret: import.meta.env.NUXT_NEXTAUTH_SECRET, // You can generate one with `openssl rand -base64 32`

    },
    nodemailer: {
      host: import.meta.env.SMTP_HOST,
      port: import.meta.env.SMTP_PORT,
      user: import.meta.env.SMTP_USER,
      password: import.meta.env.SMTP_PASSWORD,
      from: import.meta.env.EMAIL_FROM,
    },
    public: {
      authJs: {
        baseUrl: import.meta.env.NUXT_NEXTAUTH_URL, // The URL of your deployed app (used for origin Check in production)

      },
    },
  },

  compatibilityDate: '2024-09-03',
})
