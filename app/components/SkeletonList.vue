<script setup lang="ts">
const props = withDefaults(defineProps<{
  width?: string;
}>(), {
  width: '100px'
});
</script>

<template>
  <div
    class="my-4 animate-pulse"
    role="list"
  >
    <ul
      class="skeleton-list mx-auto"
      :style="{ '--skeleton-width': props.width }"
    >
      <li
        v-for="index in 5"
        :key="index"
        class="my-2 px-2 rounded-md bg-gray-200 text-emerald-700"
      >
        ⚪️
      </li>
    </ul>
  </div>
</template>

<style scoped>
.skeleton-list {
  --skeleton-width: 100px;
  width: var(--skeleton-width);
}
</style>
