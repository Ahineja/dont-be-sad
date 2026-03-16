import {
  DEFAULT_THEME,
  SETTINGS_STORAGE_KEY,
  SUPPORTED_THEMES,
  type SupportedTheme,
} from '~/constants/themeOptions'

export interface PersistedUserSettings {
  locale?: string
  theme?: SupportedTheme
  [key: string]: unknown
}

const isObjectRecord = (value: unknown): value is Record<string, unknown> => {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

export const isSupportedTheme = (value: string): value is SupportedTheme => {
  return SUPPORTED_THEMES.includes(value as SupportedTheme)
}

export const readPersistedUserSettings = (): PersistedUserSettings | null => {
  if (!import.meta.client) {
    return null
  }

  try {
    const rawSettings = localStorage.getItem(SETTINGS_STORAGE_KEY)

    if (!rawSettings) {
      return null
    }

    const parsedSettings = JSON.parse(rawSettings) as unknown

    if (!isObjectRecord(parsedSettings)) {
      return null
    }

    const normalizedSettings: PersistedUserSettings = {
      ...parsedSettings,
    }

    if (typeof normalizedSettings.theme !== 'string' || !isSupportedTheme(normalizedSettings.theme)) {
      delete normalizedSettings.theme
    }

    return normalizedSettings
  } catch {
    return null
  }
}

export const savePersistedUserSettings = (settingsPatch: Partial<PersistedUserSettings>): void => {
  if (!import.meta.client) {
    return
  }

  const existingSettings = readPersistedUserSettings() ?? {}

  try {
    localStorage.setItem(
      SETTINGS_STORAGE_KEY,
      JSON.stringify({
        ...existingSettings,
        ...settingsPatch,
      })
    )
  } catch {
    // Ignore storage write failures to avoid breaking UI interactions.
  }
}

export const resolveSavedTheme = (): SupportedTheme => {
  const savedTheme = readPersistedUserSettings()?.theme

  if (savedTheme) {
    return savedTheme
  }

  return DEFAULT_THEME
}

export const applyThemeToDocument = (theme: SupportedTheme): void => {
  if (!import.meta.client) {
    return
  }

  document.documentElement.setAttribute('data-theme', theme)
}

