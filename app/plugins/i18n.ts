import { watch } from 'vue'
import { createI18n } from 'vue-i18n'
import {
  DEFAULT_LOCALE,
  localeMessages,
  SUPPORTED_LOCALES,
  type SupportedLocale,
} from '~/locales/messages'
import { LEGACY_LOCALE_STORAGE_KEY } from '~/constants/themeOptions'
import { readPersistedUserSettings, savePersistedUserSettings } from '~/utils/userSettings'

const isSupportedLocale = (value: string): value is SupportedLocale => {
  return SUPPORTED_LOCALES.includes(value as SupportedLocale)
}

const readSavedLocale = (): SupportedLocale | null => {
  if (!import.meta.client) {
    return null
  }

  const savedSettings = readPersistedUserSettings()
  const settingsLocale = savedSettings?.locale

  if (typeof settingsLocale === 'string' && isSupportedLocale(settingsLocale)) {
    return settingsLocale
  }

  try {
    const legacyLocale = localStorage.getItem(LEGACY_LOCALE_STORAGE_KEY)

    if (legacyLocale && isSupportedLocale(legacyLocale)) {
      return legacyLocale
    }
  } catch {
    return null
  }

  return null
}

const saveLocale = (nextLocale: SupportedLocale): void => {
  if (!import.meta.client) {
    return
  }

  savePersistedUserSettings({ locale: nextLocale })
}

const resolvePreferredLocale = (): SupportedLocale => {
  if (!import.meta.client) {
    return DEFAULT_LOCALE
  }

  const savedLocale = readSavedLocale()

  if (savedLocale) {
    return savedLocale
  }

  const [localePrefix] = navigator.language.toLowerCase().split('-')

  if (localePrefix && isSupportedLocale(localePrefix)) {
    return localePrefix
  }

  return DEFAULT_LOCALE
}

export default defineNuxtPlugin((nuxtApp) => {
  const initialLocale = resolvePreferredLocale()

  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: initialLocale,
    fallbackLocale: DEFAULT_LOCALE,
    messages: localeMessages,
    missingWarn: false,
    fallbackWarn: false,
  })

  if (import.meta.client) {
    watch(
      i18n.global.locale,
      (nextLocale) => {
        if (!isSupportedLocale(nextLocale)) {
          return
        }

        saveLocale(nextLocale)
      },
      { immediate: true }
    )
  }

  nuxtApp.vueApp.use(i18n)
})
