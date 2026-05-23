<template>
  <svg :width="size" :height="size" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="6" stroke="currentColor" stroke-width="1.5" />
    <circle cx="9" cy="9" r="2.5" fill="currentColor" />
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 18 })
</script>
