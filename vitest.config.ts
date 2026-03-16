import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    globals: true,
    environment: 'nuxt',
    //setupFiles: './vitest.setup.ts', // later we'd add mocking global variables
    coverage: {
      include: ['app/**/*.{ts,tsx,js,jsx,vue}'],
      exclude: ['**/*.config.*'],
    },
  },
})
