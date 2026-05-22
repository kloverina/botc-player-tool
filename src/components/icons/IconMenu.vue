<template>
  <svg :width="size" :height="size" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <line x1="3" y1="5"  x2="15" y2="5"  stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <line x1="3" y1="9"  x2="15" y2="9"  stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <line x1="3" y1="13" x2="15" y2="13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 18 })
</script>
