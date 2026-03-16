import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import DefaultLayout from '../../app/layouts/default.vue'

describe('default layout', () => {
  it('renders shared header, page content slot, and footer notice', async () => {
    const wrapper = await mountSuspended(DefaultLayout, {
      slots: {
        default: '<div data-test-page-content>Page content</div>',
      },
    })

    expect(wrapper.find('[data-test-header-greeting]').exists()).toBe(true)
    expect(wrapper.find('[data-test-locale-toggle]').exists()).toBe(true)
    expect(wrapper.find('[data-test-page-content]').text()).toBe('Page content')
    expect(wrapper.find('[data-test-footer-notice]').exists()).toBe(true)
    expect(wrapper.find('[data-test-footer-notice]').text()).toContain('Huge Thanks')
    expect(wrapper.find('[data-test-footer-notice]').text()).toContain('dogapi.dog')
    expect(wrapper.find('[data-test-footer-notice]').text()).toContain('dog.ceo/api')
  })

  it('updates footer notice translation after locale toggle', async () => {
    const wrapper = await mountSuspended(DefaultLayout, {
      slots: {
        default: '<div data-test-page-content>Page content</div>',
      },
    })

    expect(wrapper.find('[data-test-footer-notice]').text()).toContain('Huge Thanks')

    await wrapper.get('[data-test-locale-toggle]').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-test-footer-notice]').text()).toContain('Велика подяка')
    expect(wrapper.find('[data-test-footer-notice]').text()).toContain('dogapi.dog')
    expect(wrapper.find('[data-test-footer-notice]').text()).toContain('dog.ceo/api')
  })
})

