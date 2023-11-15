// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  runtimeConfig: {
    public: {
      // eslint-disable-next-line n/prefer-global/process
      apiEndpoint: process.env.API_ENDPOINT,
    },
    auth: {
      name: "nuxt-session",
      // eslint-disable-next-line n/prefer-global/process
      password: process.env.NUXT_AUTH_PASSWORD || "",
    },
  },
  // plugins: [
  //   {
  //     src: '~/plugins/amplify.ts',
  //     mode: 'client',
  //   },
  // ],

  css: [
    // CSS file in the project
    "@/assets/css/main.css",

    // SCSS file in the project
  ],

  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  modules: ["@pinia/nuxt", "nuxt-icon", "@nuxt/ui"],

  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      "defineStore", // import { defineStore } from 'pinia'
      ["definePiniaStore", "acceptHMRUpdate"], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },

  vite: {
    resolve: {
      alias: { "./runtimeConfig": "./runtimeConfig.browser" },
    },
    define: {
      "window.global": {},
    },
  },
  nitro: {
    inlineDynamicImports: true,
  },
})
