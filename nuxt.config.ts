// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/content",
    "@nuxtjs/tailwindcss",
    // "@pinia/nuxt", // ✅ registers Pinia
  ],
  devtools: { enabled: true },
  compatibilityDate: "2024-04-03",
  nitro: {
    plugins: ["../server/plugins/extend-html.ts"],
  },
  imports: {
    dirs: [
      // "stores", // ✅ auto-imports useAuthStore etc.
      // "composables", // ✅ auto-imports useApi, useToast, useSSE, useFormatters, useWallet
    ],
  },
});
