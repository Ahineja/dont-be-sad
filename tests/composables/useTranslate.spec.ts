import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { describe, expect, it } from 'vitest'
import { useTranslate } from '../../app/composables/useTranslate'
import { createI18nForTests } from '../helpers/createI18nForTests'

describe('useTranslate', () => {
  it('translates message with params', () => {
    const TestComponent = defineComponent({
      setup() {
        const { translate } = useTranslate()

        return {
          translatedText: translate('index.greetingWithTitle', { title: 'Demo App' }),
        }
      },
      template: '<span data-test-translation>{{ translatedText }}</span>',
    })

    const wrapper = mount(TestComponent, {
      global: {
        plugins: [createI18nForTests('en')],
      },
    })

    expect(wrapper.get('[data-test-translation]').text()).toBe('Greeting from Demo App')
  })

  it('translates static message without params', () => {
    const TestComponent = defineComponent({
      setup() {
        const { translate } = useTranslate()

        return {
          translatedText: translate('index.languageSwitcherLabel'),
        }
      },
      template: '<span data-test-translation>{{ translatedText }}</span>',
    })

    const wrapper = mount(TestComponent, {
      global: {
        plugins: [createI18nForTests('uk')],
      },
    })

    expect(wrapper.get('[data-test-translation]').text()).toBe('Мова')
  })
})

