export default defineNuxtConfig({
  compatibilityDate: '2026-03-14',
  devtools: { enabled: true },
  modules: [
    '@nuxt/a11y',
    '@nuxt/eslint',
    '@nuxt/hints',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
  ],
  runtimeConfig: {
    public: {
      dogApi: process.env.DOG_API,
      dogApiBreedsSegment: process.env.DOG_API_BREEDS_SEGMENT,
      dogCeoApi: process.env.DOG_CEO_API,
      dogCeoAriSegment: process.env.DOG_CEO_ARI_SEGMENT,
    },
  },
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
  },
  typescript: {
    typeCheck: true,
  },
})
