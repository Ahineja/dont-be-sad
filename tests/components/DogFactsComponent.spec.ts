import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import DogFactsComponent from '../../app/components/DogFactsComponent.vue'
import { DogApiService } from '../../app/api/dogApiService'
import { mockBreeds, mockDogCeoRandomImageResponse } from '../mocks/dogApi.mock'
import { createI18nForTests } from '../helpers/createI18nForTests'

vi.mock('../../app/api/dogApiService')

describe('DogFactsComponent', () => {
  it('should fetch and display dog breeds on button click in English', async () => {
    const getDogBreedsMock = vi.fn().mockResolvedValue(mockBreeds)
    const getRandomDogImageUrlMock = vi.fn().mockResolvedValue(mockDogCeoRandomImageResponse.message)

    vi.mocked(DogApiService).mockImplementation(() => {
      return {
        getDogBreeds: getDogBreedsMock,
        getRandomDogImageUrl: getRandomDogImageUrlMock,
      } as unknown as DogApiService
    })

    const wrapper = mount(DogFactsComponent, {
      global: {
        plugins: [createI18nForTests('en')],
      },
    })

    await wrapper.get('[data-test-fetch-breeds]').trigger('click')
    await wrapper.vm.$nextTick()

    expect(getDogBreedsMock).toHaveBeenCalledTimes(1)
    expect(getRandomDogImageUrlMock).toHaveBeenCalledTimes(1)

    const breedItems = wrapper.findAll('.breed-item')
    expect(breedItems).toHaveLength(1)
    expect(wrapper.html()).toContain('Life Span: 10 - 12 years')
    expect(wrapper.html()).toContain('Hypoallergenic: No')
    expect(wrapper.find('img').attributes('src')).toBe(mockDogCeoRandomImageResponse.message)
    expect(wrapper.text()).toContain('Random dog image')
    expect(wrapper.get('[data-test-fetch-breeds]').attributes('type')).toBe('button')
    expect(wrapper.get('[data-test-refresh-image]').attributes('type')).toBe('button')
    expect(wrapper.find('ul.breed-list').attributes('aria-label')).toBe('Dog breed results')
    expect(wrapper.find('figure').attributes('aria-label')).toBe('Random dog image section')
  })

  it('should fetch and display Ukrainian labels when locale is uk', async () => {
    const getDogBreedsMock = vi.fn().mockResolvedValue(mockBreeds)
    const getRandomDogImageUrlMock = vi.fn().mockResolvedValue(mockDogCeoRandomImageResponse.message)

    vi.mocked(DogApiService).mockImplementation(() => {
      return {
        getDogBreeds: getDogBreedsMock,
        getRandomDogImageUrl: getRandomDogImageUrlMock,
      } as unknown as DogApiService
    })

    const wrapper = mount(DogFactsComponent, {
      global: {
        plugins: [createI18nForTests('uk')],
      },
    })

    expect(wrapper.text()).toContain('Завантажити породи собак')
    expect(wrapper.text()).toContain('Оновити випадкове фото')

    await wrapper.get('[data-test-fetch-breeds]').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toContain('Тривалість життя: 10 - 12 років')
    expect(wrapper.html()).toContain('Гіпоалергенність: Ні')
    expect(wrapper.text()).toContain('Випадкове фото собаки')
  })

  it('should refresh only random image without refetching breeds', async () => {
    const getDogBreedsMock = vi.fn().mockResolvedValue(mockBreeds)
    const getRandomDogImageUrlMock = vi.fn().mockResolvedValue(mockDogCeoRandomImageResponse.message)

    vi.mocked(DogApiService).mockImplementation(() => {
      return {
        getDogBreeds: getDogBreedsMock,
        getRandomDogImageUrl: getRandomDogImageUrlMock,
      } as unknown as DogApiService
    })

    const wrapper = mount(DogFactsComponent, {
      global: {
        plugins: [createI18nForTests('en')],
      },
    })

    await wrapper.get('[data-test-refresh-image]').trigger('click')
    await wrapper.vm.$nextTick()

    expect(getRandomDogImageUrlMock).toHaveBeenCalledTimes(1)
    expect(getDogBreedsMock).not.toHaveBeenCalled()
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('.breed-list').exists()).toBe(false)
  })

  it('should not display the list if breeds are null', () => {
    vi.mocked(DogApiService).mockImplementation(() => {
      return {
        getDogBreeds: vi.fn().mockResolvedValue(null),
        getRandomDogImageUrl: vi.fn().mockResolvedValue(null),
      } as unknown as DogApiService
    })

    const wrapper = mount(DogFactsComponent, {
      global: {
        plugins: [createI18nForTests()],
      },
    })

    expect(wrapper.find('.breed-list').exists()).toBe(false)
  })

  it('should not render image when random image request fails', async () => {
    const getDogBreedsMock = vi.fn().mockResolvedValue(mockBreeds)
    const getRandomDogImageUrlMock = vi.fn().mockRejectedValue(new Error('Dog CEO unavailable'))

    vi.mocked(DogApiService).mockImplementation(() => {
      return {
        getDogBreeds: getDogBreedsMock,
        getRandomDogImageUrl: getRandomDogImageUrlMock,
      } as unknown as DogApiService
    })

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    const wrapper = mount(DogFactsComponent, {
      global: {
        plugins: [createI18nForTests('en')],
      },
    })

    await wrapper.get('[data-test-fetch-breeds]').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.find('[role="alert"]').text()).toContain('Could not load random dog image.')
    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to fetch random dog image', expect.any(Error))

    consoleErrorSpy.mockRestore()
  })

  it('should show accessible alert when breeds request fails', async () => {
    const getDogBreedsMock = vi.fn().mockRejectedValue(new Error('Breeds unavailable'))
    const getRandomDogImageUrlMock = vi.fn().mockResolvedValue(mockDogCeoRandomImageResponse.message)

    vi.mocked(DogApiService).mockImplementation(() => {
      return {
        getDogBreeds: getDogBreedsMock,
        getRandomDogImageUrl: getRandomDogImageUrlMock,
      } as unknown as DogApiService
    })

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    const wrapper = mount(DogFactsComponent, {
      global: {
        plugins: [createI18nForTests('en')],
      },
    })

    await wrapper.get('[data-test-fetch-breeds]').trigger('click')
    await wrapper.vm.$nextTick()

    const alerts = wrapper.findAll('[role="alert"]')
    expect(alerts[0].text()).toContain('Could not load dog breeds.')
    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to fetch dog breeds', expect.any(Error))

    consoleErrorSpy.mockRestore()
  })
})
