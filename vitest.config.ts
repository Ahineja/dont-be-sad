import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    globals: true,
    environment: 'nuxt',
    coverage: {
      include: ['app/**/*.{ts,tsx,js,jsx,vue}'],
      exclude: ['**/*.config.*'],
    },
  },
})
