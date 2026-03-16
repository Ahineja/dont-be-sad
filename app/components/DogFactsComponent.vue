<script setup lang="ts">
import { computed, ref } from 'vue';
import { DogApiService } from '~/api/dogApiService';
import type { DogBreed } from '~/models/DogBreedInterface';
import { useTranslate } from '~/composables/useTranslate';

const runtimeConfig = useRuntimeConfig();
let dogApiServiceInstance: DogApiService | null = null;
const breeds = ref<DogBreed[] | null>(null);
const randomDogImageUrl = ref<string | null>(null);
const isBreedsLoading = ref<boolean>(false);
const isImageLoading = ref<boolean>(false);
const breedsErrorMessage = ref<string | null>(null);
const imageErrorMessage = ref<string | null>(null);
const { translate } = useTranslate();

const getDogApiService = (): DogApiService => {
  if (dogApiServiceInstance) {
    return dogApiServiceInstance;
  }

  dogApiServiceInstance = new DogApiService({
    dogApiBaseUrl: runtimeConfig.public.dogApi,
    dogApiBreedsSegment: runtimeConfig.public.dogApiBreedsSegment,
    dogCeoBaseUrl: runtimeConfig.public.dogCeoApi,
    dogCeoImageSegment: runtimeConfig.public.dogCeoAriSegment,
  });

  return dogApiServiceInstance;
};


const loadingStatusText = computed<string>(() => {
  if (isBreedsLoading.value || isImageLoading.value) {
    return translate('dogFacts.loadingStatus');
  }

  return '';
});

const refreshRandomDogImage = async (): Promise<void> => {
  isImageLoading.value = true;
  imageErrorMessage.value = null;

  try {
    const dogApiService = getDogApiService();
    randomDogImageUrl.value = await dogApiService.getRandomDogImageUrl();
  } catch (error) {
    randomDogImageUrl.value = null;
    imageErrorMessage.value = translate('dogFacts.imageError');
    console.error('Failed to fetch random dog image', error);
  } finally {
    isImageLoading.value = false;
  }
};

const fetchDogBreeds = async () => {
  isBreedsLoading.value = true;
  breedsErrorMessage.value = null;

  try {
    const dogApiService = getDogApiService();
    breeds.value = await dogApiService.getDogBreeds();
  } catch (error) {
    breeds.value = null;
    breedsErrorMessage.value = translate('dogFacts.breedsError');
    console.error('Failed to fetch dog breeds', error);
  } finally {
    isBreedsLoading.value = false;
  }

  await refreshRandomDogImage();
};

const getHypoallergenicLabel = (isHypoallergenic: boolean): string => {
  return isHypoallergenic ? translate('common.yes') : translate('common.no');
};
</script>

<template>
  <section :aria-busy="isBreedsLoading || isImageLoading">
    <p v-if="loadingStatusText" class="sr-only" role="status" aria-live="polite">{{ loadingStatusText }}</p>

    <button
      type="button"
      class="bg-pink-400 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded mb-4 mr-2"
      data-test-fetch-breeds
      :disabled="isBreedsLoading"
      @click="fetchDogBreeds"
    >
      {{ translate('dogFacts.fetchButton') }}
    </button>

    <button
      type="button"
      class="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded mb-8"
      data-test-refresh-image
      :disabled="isImageLoading"
      @click="refreshRandomDogImage"
    >
      {{ translate('dogFacts.refreshImageButton') }}
    </button>

    <p v-if="breedsErrorMessage" role="alert" class="mb-3 text-red-700">{{ breedsErrorMessage }}</p>
    <p v-if="imageErrorMessage" role="alert" class="mb-3 text-red-700">{{ imageErrorMessage }}</p>

    <figure v-if="randomDogImageUrl" class="mb-8" :aria-label="translate('dogFacts.imageRegionLabel')">
      <figcaption class="mb-2 font-semibold">{{ translate('dogFacts.randomImageTitle') }}</figcaption>
      <img
        :src="randomDogImageUrl"
        :alt="translate('dogFacts.randomImageAlt')"
        class="max-w-sm rounded"
        loading="lazy"
      >
    </figure>

    <ul v-if="breeds" class="breed-list" :aria-label="translate('dogFacts.breedsRegionLabel')">
      <li
        v-for="breed in breeds"
        :key="breed.id"
        class="breed-item"
        :aria-label="translate('dogFacts.breedDetailsLabel', { breed: breed.attributes.name })"
      >
        <h3>{{ breed.attributes.name }}</h3>
        <p>{{ breed.attributes.description }}</p>
        <ul>
          <li>{{ translate('dogFacts.lifeSpan', { min: breed.attributes.life.min, max: breed.attributes.life.max }) }}</li>
          <li>{{ translate('dogFacts.maleWeight', { min: breed.attributes.male_weight.min, max: breed.attributes.male_weight.max }) }}</li>
          <li>{{ translate('dogFacts.femaleWeight', { min: breed.attributes.female_weight.min, max: breed.attributes.female_weight.max }) }}</li>
          <li>{{ translate('dogFacts.hypoallergenic', { value: getHypoallergenicLabel(breed.attributes.hypoallergenic) }) }}</li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.breed-list {
  list-style-type: none;
  padding: 0;
}
.breed-item {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}
</style>
