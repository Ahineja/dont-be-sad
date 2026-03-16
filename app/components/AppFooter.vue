<script setup lang="ts">
import { useTranslate } from '~/composables/useTranslate'

const { translate } = useTranslate()
</script>

<template>
  <footer class="border-t px-4 py-3">
    <p class="mx-auto max-w-5xl text-xs text-gray-600 text-center" data-test-footer-notice>
      {{ translate('footer.notice') }}
    </p>
  </footer>
</template>

