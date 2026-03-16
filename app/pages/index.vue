<script setup lang="ts">
import { useHead } from '#app';
import SkeletonList from '~/components/SkeletonList.vue';
import DogFactsComponent from '~/components/DogFactsComponent.vue';
import { useTranslate } from '~/composables/useTranslate';

const { translate } = useTranslate();

useHead(() => ({
  title: translate('index.headTitle'),
  meta: [
    {
      name: 'description',
      content: translate('index.headDescription'),
    },
  ],
}));
</script>

<template>
  <main class="p-4">
    <p>{{ translate('index.placeholderText') }}</p>

    <skeleton-list
      width="60%"
      class="my-6"
    />

    <dog-facts-component />
  </main>
</template>

