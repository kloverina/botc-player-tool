<template>
  <svg :width="size" :height="size" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path
      d="M9 2 C6.5 5 3.5 7.5 3.5 10.5 C3.5 13.5 6 16 9 16 C12 16 14.5 13.5 14.5 10.5 C14.5 7.5 11.5 5 9 2 Z"
      fill="currentColor"
    />
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 18 })
</script>
