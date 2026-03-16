import { useI18n } from 'vue-i18n'

export const useTranslate = () => {
  const i18nComposer = useI18n()

  const translate = (key: string, params?: Record<string, unknown>): string => {
    if (typeof i18nComposer.t !== 'function') {
      return key
    }

    return i18nComposer.t(key, params ?? {})
  }

  return {
    translate,
  }
}

