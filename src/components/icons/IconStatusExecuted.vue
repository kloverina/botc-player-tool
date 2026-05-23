<template>
  <svg :width="size" :height="size" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="6" stroke="currentColor" stroke-width="1.5" />
    <line x1="6" y1="6" x2="12" y2="12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <line x1="12" y1="6" x2="6" y2="12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 18 })
</script>
