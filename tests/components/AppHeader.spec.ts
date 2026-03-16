import { beforeEach, describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AppHeader from '../../app/components/AppHeader.vue'

const SETTINGS_STORAGE_KEY = 'ahineia.settings'

const readSettings = (): Record<string, unknown> => {
  const rawSettings = localStorage.getItem(SETTINGS_STORAGE_KEY)

  if (!rawSettings) {
    return {}
  }

  return JSON.parse(rawSettings) as Record<string, unknown>
}

describe('AppHeader', () => {
  beforeEach(() => {
    localStorage.removeItem(SETTINGS_STORAGE_KEY)
    localStorage.removeItem('ahineia.locale')
    document.documentElement.removeAttribute('data-theme')
  })

  it('renders greeting and English locale by default', async () => {
    const wrapper = await mountSuspended(AppHeader)

    expect(wrapper.get('[data-test-header-greeting]').text()).toContain('Greeting from Don\'t Be Sad Site')
    expect(wrapper.text()).toContain('Language')
    expect(wrapper.text()).toContain('Theme')
    expect(wrapper.get('[data-test-locale-toggle]').attributes('aria-checked')).toBe('false')
    expect(wrapper.get('[data-test-locale-current]').text()).toBe('EN')
    expect((wrapper.get('[data-test-theme-select]').element as HTMLSelectElement).value).toBe('light')
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('switches header content to Ukrainian when locale toggle is clicked', async () => {
    const wrapper = await mountSuspended(AppHeader)

    await wrapper.get('[data-test-locale-toggle]').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.get('[data-test-header-greeting]').text()).toContain('Вітання від Don\'t Be Sad Site')
    expect(wrapper.text()).toContain('Мова')
    expect(wrapper.get('[data-test-locale-toggle]').attributes('aria-checked')).toBe('true')
    expect(wrapper.get('[data-test-locale-current]').text()).toBe('UA')

    const settings = readSettings()
    expect(settings.locale).toBe('uk')
  })

  it('uses saved locale from settings localStorage on reload', async () => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify({ locale: 'uk', theme: 'unicorn' }))

    const wrapper = await mountSuspended(AppHeader)

    expect(wrapper.get('[data-test-header-greeting]').text()).toContain('Вітання від Don\'t Be Sad Site')
    expect(wrapper.text()).toContain('Мова')
    expect(wrapper.get('[data-test-locale-current]').text()).toBe('UA')
    expect((wrapper.get('[data-test-theme-select]').element as HTMLSelectElement).value).toBe('unicorn')
    expect(readSettings().theme).toBe('unicorn')
    expect(document.documentElement.getAttribute('data-theme')).toBe('unicorn')
  })

  it('updates and persists selected theme', async () => {
    const wrapper = await mountSuspended(AppHeader)
    const themeSelect = wrapper.get('[data-test-theme-select]')

    await themeSelect.setValue('dark')
    await wrapper.vm.$nextTick()

    expect((themeSelect.element as HTMLSelectElement).value).toBe('dark')
    expect(readSettings().theme).toBe('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('keeps unrelated settings when locale changes', async () => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify({ locale: 'en', theme: 'dark', notifications: true }))

    const wrapper = await mountSuspended(AppHeader)
    const localeToggle = wrapper.get('[data-test-locale-toggle]')
    const initialAriaChecked = localeToggle.attributes('aria-checked')
    const expectedLocaleAfterToggle = initialAriaChecked === 'true' ? 'en' : 'uk'

    await localeToggle.trigger('click')
    await wrapper.vm.$nextTick()

    const settings = readSettings()
    expect(settings.locale).toBe(expectedLocaleAfterToggle)
    expect(settings.theme).toBe('dark')
    expect(settings.notifications).toBe(true)
  })
})

