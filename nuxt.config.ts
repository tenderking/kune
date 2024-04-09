import { resolve } from 'node:path'
import process from 'node:process'

process.exit(0)
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: ['@/assets/css/main.css'],

  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },

  modules: ['nuxt-icon', '@nuxt/ui', '@hebilicious/authjs-nuxt'],

  // formkit: {
  //   autoImport: true,
  //   configFile: "./formkit.config.ts",
  // },

  nitro: {
    inlineDynamicImports: true,
  },

  imports: {
    dirs: ['types', 'store'],
  },

  // colorMode: {
  //   preference: "light",
  // },

  runtimeConfig: {
    authJs: {
      secret: process.env.NUXT_NEXTAUTH_SECRET, // You can generate one with `openssl rand -base64 32`
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    email: {
      smtpHost: process.env.SMTP_HOST,
      smtpPort: Number(process.env.SMTP_PORT),
      smtpUser: process.env.SMTP_USER,
      smtpPassword: process.env.SMTP_PASSWORD,
      emailFrom: process.env.EMAIL_FROM,
    },
    public: {
      authJs: {
        baseUrl: process.env.NUXT_NEXTAUTH_URL, // The URL of your deployed app (used for origin Check in production)
        verifyClientOnEveryRequest: false, // whether to hit the /auth/session endpoint on every client request
      },
    },
  },

  alias: {
    cookie: resolve(__dirname, 'node_modules/cookie'),
  },
})
