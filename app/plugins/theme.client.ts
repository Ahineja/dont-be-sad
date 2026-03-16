import { resolveSavedTheme, applyThemeToDocument } from '~/utils/userSettings'

export default defineNuxtPlugin(() => {
  const preferredTheme = resolveSavedTheme()
  applyThemeToDocument(preferredTheme)
})

