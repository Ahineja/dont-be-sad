import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SkeletonList from '../../app/components/SkeletonList.vue'
import { createI18nForTests } from '../helpers/createI18nForTests'

describe('SkeletonList', () => {
  it('uses width from props in generated styles', () => {
    const wrapper = mount(SkeletonList, {
      props: {
        width: '320px',
      },
      global: {
        plugins: [createI18nForTests('en')],
      },
    })

    expect(wrapper.get('.skeleton-list').attributes('style')).toContain('--skeleton-width: 320px;')
  })

  it('uses default width when prop is not provided', () => {
    const wrapper = mount(SkeletonList, {
      global: {
        plugins: [createI18nForTests('en')],
      },
    })

    expect(wrapper.get('.skeleton-list').attributes('style')).toContain('--skeleton-width: 100px;')
  })
})

