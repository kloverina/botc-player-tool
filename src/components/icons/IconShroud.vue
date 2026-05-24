<template>
  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <!-- Swallowtail banner: rectangle with two downward points and upward notch in center -->
    <path
      d="M28,0 L72,0 L72,68 L50,54 L28,68 Z"
      fill="currentColor"
    />
    <!-- Moon (night kill) -->
    <g v-if="type === 'dead'" transform="translate(50,26)" fill="white" opacity="0.9">
      <path d="M0,-8 A8,8 0 1,0 5.7,6 A5,5 0 1,1 0,-8 Z" />
    </g>
    <!-- Sun (executed) -->
    <g v-else transform="translate(50,26)" fill="white" stroke="white" opacity="0.9">
      <circle cx="0" cy="0" r="4.5" />
      <line v-for="i in 8" :key="i"
        :x1="Math.cos((i-1)*Math.PI/4)*6.5"
        :y1="Math.sin((i-1)*Math.PI/4)*6.5"
        :x2="Math.cos((i-1)*Math.PI/4)*9.5"
        :y2="Math.sin((i-1)*Math.PI/4)*9.5"
        stroke-width="1.8" stroke-linecap="round"
      />
    </g>
  </svg>
</template>

<script setup lang="ts">
defineProps<{ type: 'dead' | 'executed' }>()
</script>
