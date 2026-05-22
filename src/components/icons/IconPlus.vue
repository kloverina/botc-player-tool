<template>
  <svg :width="size" :height="size" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <line x1="9" y1="3" x2="9" y2="15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <line x1="3" y1="9" x2="15" y2="9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 18 })
</script>
