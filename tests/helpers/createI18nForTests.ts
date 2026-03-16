import { createI18n } from 'vue-i18n'
import {
  DEFAULT_LOCALE,
  localeMessages,
  type SupportedLocale,
} from '../../app/locales/messages'

export const createI18nForTests = (locale: SupportedLocale = DEFAULT_LOCALE) => {
  return createI18n({
    legacy: false,
    locale,
    fallbackLocale: DEFAULT_LOCALE,
    messages: localeMessages,
    missingWarn: false,
    fallbackWarn: false,
  })
}

