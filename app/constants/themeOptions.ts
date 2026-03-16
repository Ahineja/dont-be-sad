export const SETTINGS_STORAGE_KEY = 'ahineia.settings'
export const LEGACY_LOCALE_STORAGE_KEY = 'ahineia.locale'

export const SUPPORTED_THEMES = ['light', 'dark', 'unicorn'] as const

export type SupportedTheme = typeof SUPPORTED_THEMES[number]

export const DEFAULT_THEME: SupportedTheme = 'light'

