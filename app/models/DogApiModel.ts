import type { DogBreed } from '~/models/DogBreedInterface'

export interface DogBreedsApiResponse {
  data: DogBreed[]
}

export interface DogCeoRandomImageResponse {
  status: string
  message: string
}

export interface DogApiServiceConfig {
  dogApiBaseUrl?: string
  dogApiBreedsSegment?: string
  dogCeoBaseUrl?: string
  dogCeoImageSegment?: string
}

