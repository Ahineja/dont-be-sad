import type { DogBreed } from '~/models/DogBreedInterface';
import type {
  DogApiServiceConfig,
  DogBreedsApiResponse,
  DogCeoRandomImageResponse,
} from '~/models/DogApiModel';
import {
  getDogApiBaseUrl,
  getDogApiBreedsSegment,
  getDogCeoApiBaseUrl,
  getDogCeoImageSegment,
} from '~/constants/env';

const BREEDS_PAGE_SIZE = 5;

const getRequiredApiConfigValue = (configValue: string | undefined, configName: string): string => {
  const normalizedValue = configValue?.trim();

  if (!normalizedValue) {
    throw new Error(`Missing required API config: ${configName}`);
  }

  return normalizedValue;
};

export class DogApiService {
  private readonly dogApiBaseUrl?: string;
  private readonly dogApiBreedsSegment?: string;
  private readonly dogCeoBaseUrl?: string;
  private readonly dogCeoImageSegment?: string;

  constructor(config: DogApiServiceConfig = {}) {
    this.dogApiBaseUrl = config.dogApiBaseUrl ?? getDogApiBaseUrl();
    this.dogApiBreedsSegment = config.dogApiBreedsSegment ?? getDogApiBreedsSegment();
    this.dogCeoBaseUrl = config.dogCeoBaseUrl ?? getDogCeoApiBaseUrl();
    this.dogCeoImageSegment = config.dogCeoImageSegment ?? getDogCeoImageSegment();
  }

  async getDogBreeds(): Promise<DogBreed[]> {
    const dogApiBaseUrl = getRequiredApiConfigValue(this.dogApiBaseUrl, 'DOG_API');
    const dogApiBreedsSegment = getRequiredApiConfigValue(this.dogApiBreedsSegment, 'DOG_API_BREEDS_SEGMENT');
    const breedsUrl = `${dogApiBaseUrl}${dogApiBreedsSegment}?page[size]=${BREEDS_PAGE_SIZE}`;
    const response = await fetch(breedsUrl);

    if (!response.ok) {
      throw new Error(`Dog breeds request failed with status ${response.status}`);
    }

    const responseData = await response.json() as DogBreedsApiResponse;

    if (!Array.isArray(responseData.data)) {
      throw new Error('Dog breeds response format is invalid');
    }

    return responseData.data;
  }

  async getRandomDogImageUrl(): Promise<string> {
    const dogCeoBaseUrl = getRequiredApiConfigValue(this.dogCeoBaseUrl, 'DOG_CEO_API');
    const dogCeoImageSegment = getRequiredApiConfigValue(this.dogCeoImageSegment, 'DOG_CEO_ARI_SEGMENT');
    const imageUrl = `${dogCeoBaseUrl}${dogCeoImageSegment}`;
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`Dog image request failed with status ${response.status}`);
    }

    const responseData = await response.json() as DogCeoRandomImageResponse;

    if (responseData.status !== 'success' || !responseData.message) {
      throw new Error('Dog image response format is invalid');
    }

    return responseData.message;
  }
}
