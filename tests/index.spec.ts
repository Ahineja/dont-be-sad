import { describe, it, expect, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Index from '../app/pages/index.vue'

vi.mock('../app/components/DogFactsComponent.vue', () => {
  return {
    default: {
      name: 'DogFactsComponentStub',
      template: '<div data-test-dog-facts-stub />',
    },
  }
})

describe('Index.vue', () => {
  it('renders index placeholder content', async () => {
    const wrapper = await mountSuspended(Index)

    expect(wrapper.text()).toContain('Ultimately, this page is a placeholder')
    expect(wrapper.find('[data-test-dog-facts-stub]').exists()).toBe(true)
  })

  it('passes width prop to skeleton list', async () => {
    const wrapper = await mountSuspended(Index)

    expect(wrapper.get('.skeleton-list').attributes('style')).toContain('--skeleton-width: 60%;')
  })
})
