<script setup lang="ts">
import AppFooter from '~/components/AppFooter.vue'
import AppHeader from '~/components/AppHeader.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />

    <main class="flex-1 mx-auto w-full max-w-5xl">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>

