<template>
  <svg :width="size" :height="size" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <polyline
      points="3,9 7,13 15,5"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 18 })
</script>
