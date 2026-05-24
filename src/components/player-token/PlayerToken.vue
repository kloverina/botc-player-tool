<template>
  <div
    class="token-wrapper"
    :class="{
      'is-selected': isSelected,
      'is-draggable': isDragMode,
      'is-dead': player.status === 'dead',
      'is-executed': player.status === 'executed',
    }"
    :style="wrapperStyle"
  >
    <div class="token-circle">
      <div v-if="player.role" class="token-role-img">
        <img :src="getCharacterIcon(player.role)" :alt="player.role" />
      </div>
      <div v-else class="token-initials">{{ initials }}</div>

      <!-- Shroud overlay: shown only for dead/executed -->
      <div v-if="player.status === 'dead' || player.status === 'executed'" class="token-shroud">
        <IconShroud :type="player.status" />
      </div>

      <!-- Drag-mode selected ring -->
      <div v-if="isDragMode && isSelected" class="token-selected-ring" />
    </div>
    <span class="token-name">{{ player.name }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PlayerTokenProps } from './types/player-token.types'
import { getCharacterIcon } from '@/data/characters'
import { IconShroud } from '@/components/icons'

const props = withDefaults(defineProps<PlayerTokenProps>(), {
  isDragMode: false,
  isSelected: false,
})

const initials = computed(() =>
  props.player.name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2),
)

const wrapperStyle = computed(() => ({
  left: `${props.x}px`,
  top: `${props.y}px`,
  width: `${props.size}px`,
  height: `${props.size + 20}px`,
}))
</script>

<style scoped>
@import './styles/player-token.css';
</style>
