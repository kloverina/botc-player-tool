<template>
  <svg :width="size" :height="size" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="1.8" fill="currentColor" />
    <line x1="9" y1="2" x2="9" y2="5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <line x1="9" y1="13" x2="9" y2="16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <line x1="2" y1="9" x2="5" y2="9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <line x1="13" y1="9" x2="16" y2="9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 18 })
</script>
