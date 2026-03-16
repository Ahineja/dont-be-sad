import { afterEach, describe, expect, it, vi } from 'vitest'
import { mockBreeds, mockDogCeoRandomImageResponse } from '../mocks/dogApi.mock'

const mockBreedsResponse = {
  data: mockBreeds,
  links: {},
}

const mockFetch = vi.fn()
global.fetch = mockFetch

const createDogApiService = async (envOverrides?: {
  DOG_API?: string
  DOG_API_BREEDS_SEGMENT?: string
  DOG_CEO_API?: string
  DOG_CEO_ARI_SEGMENT?: string
}) => {
  vi.resetModules()

  const resolvedEnv = {
    DOG_API: 'https://dogapi.dog/',
    DOG_API_BREEDS_SEGMENT: 'api/v2/breeds',
    DOG_CEO_API: 'https://dog.ceo/api',
    DOG_CEO_ARI_SEGMENT: '/breeds/image/random',
    ...envOverrides,
  }

  vi.doMock('~/constants/env', () => {
    return {
      getDogApiBaseUrl: () => resolvedEnv.DOG_API,
      getDogApiBreedsSegment: () => resolvedEnv.DOG_API_BREEDS_SEGMENT,
      getDogCeoApiBaseUrl: () => resolvedEnv.DOG_CEO_API,
      getDogCeoImageSegment: () => resolvedEnv.DOG_CEO_ARI_SEGMENT,
    }
  })

  const { DogApiService } = await import('../../app/api/dogApiService')

  return new DogApiService()
}

afterEach(() => {
  vi.clearAllMocks()
  vi.resetModules()
  vi.doUnmock('~/constants/env')
})

describe('DogApiService', () => {
  it('should be created', async () => {
    const service = await createDogApiService()

    expect(service).toBeTruthy()
  })

  it('should throw when breeds api config is missing', async () => {
    const service = await createDogApiService({ DOG_API: undefined })

    await expect(service.getDogBreeds()).rejects.toThrow('Missing required API config: DOG_API')
  })

  it('should throw when image api config is missing', async () => {
    const service = await createDogApiService({ DOG_CEO_API: undefined })

    await expect(service.getRandomDogImageUrl()).rejects.toThrow('Missing required API config: DOG_CEO_API')
  })

  describe('getDogBreeds', () => {
    it('should fetch dog breeds and return the data', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockBreedsResponse),
      } as Response)

      const service = await createDogApiService()
      const breeds = await service.getDogBreeds()

      expect(mockFetch).toHaveBeenCalledWith('https://dogapi.dog/api/v2/breeds?page[size]=5')
      expect(breeds).toEqual(mockBreeds)
    })

    it('should handle fetch errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const service = await createDogApiService()

      await expect(service.getDogBreeds()).rejects.toThrow('Network error')
    })
  })

  describe('getRandomDogImageUrl', () => {
    it('should fetch random dog image url', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockDogCeoRandomImageResponse),
      } as Response)

      const service = await createDogApiService()
      const randomImageUrl = await service.getRandomDogImageUrl()

      expect(mockFetch).toHaveBeenCalledWith('https://dog.ceo/api/breeds/image/random')
      expect(randomImageUrl).toBe(mockDogCeoRandomImageResponse.message)
    })

    it('should throw when random image response status is not success', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ status: 'error', message: '' }),
      } as Response)

      const service = await createDogApiService()

      await expect(service.getRandomDogImageUrl()).rejects.toThrow('Dog image response format is invalid')
    })
  })
})
