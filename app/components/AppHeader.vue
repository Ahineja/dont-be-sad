<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useAppConfig } from '#app'
import { useI18n } from 'vue-i18n'
import { useTranslate } from '~/composables/useTranslate'
import { LOCALE_SHORT_LABELS } from '~/constants/localeLabels'
import type { SupportedLocale } from '~/locales/messages'
import { DEFAULT_THEME, SUPPORTED_THEMES, type SupportedTheme } from '~/constants/themeOptions'
import {
  applyThemeToDocument,
  resolveSavedTheme,
  savePersistedUserSettings,
} from '~/utils/userSettings'

const appConfig = useAppConfig()
const i18nComposer = useI18n()
const locale = i18nComposer.locale
const { translate } = useTranslate()
const availableThemes = SUPPORTED_THEMES
const selectedTheme = ref<SupportedTheme>(import.meta.client ? resolveSavedTheme() : DEFAULT_THEME)

const isUkrainianLocale = computed<boolean>(() => {
  return locale.value === 'uk'
})

const currentLanguageLabel = computed<string>(() => {
  return isUkrainianLocale.value ? LOCALE_SHORT_LABELS.uk : LOCALE_SHORT_LABELS.en
})

const greetingText = computed<string>(() => {
  if (appConfig.title) {
    return translate('index.greetingWithTitle', { title: appConfig.title })
  }

  return translate('index.greetingWithoutTitle')
})

const setLocale = (nextLocale: SupportedLocale): void => {
  locale.value = nextLocale
}

const toggleLocale = (): void => {
  setLocale(isUkrainianLocale.value ? 'en' : 'uk')
}


watch(
  selectedTheme,
  (nextTheme) => {
    if (!import.meta.client) {
      return
    }

    applyThemeToDocument(nextTheme)
    savePersistedUserSettings({ theme: nextTheme })
  },
  { immediate: true }
)
</script>

<template>
  <header class="border-b p-4">
    <div class="mx-auto flex max-w-5xl items-center justify-between gap-4">
      <h1 class="text-xl font-semibold" data-test-header-greeting>{{ greetingText }}</h1>

      <section>
        <div class="inline-flex items-center gap-4">
          <div class="inline-flex items-center gap-2">
            <label class="font-medium" for="locale-toggle">{{ translate('index.languageSwitcherLabel') }}</label>

            <button
              id="locale-toggle"
              type="button"
              role="switch"
              class="rounded border px-3 py-1"
              data-test-locale-toggle
              :aria-checked="isUkrainianLocale"
              :aria-label="translate('index.languageToggleLabel')"
              @click="toggleLocale"
            >
              <span data-test-locale-current>{{ currentLanguageLabel }}</span>
            </button>
          </div>

          <div class="inline-flex items-center gap-2">
            <label class="font-medium" for="theme-select">{{ translate('index.themeSwitcherLabel') }}</label>
            <select
              id="theme-select"
              v-model="selectedTheme"
              class="rounded border px-2 py-1"
              data-test-theme-select
              :aria-label="translate('index.themeSwitcherLabel')"
            >
              <option
                v-for="theme in availableThemes"
                :key="theme"
                :value="theme"
              >
                {{ translate(`index.themeOption.${theme}`) }}
              </option>
            </select>
          </div>
        </div>
      </section>
    </div>
  </header>
</template>

