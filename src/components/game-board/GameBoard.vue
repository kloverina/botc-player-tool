<template>
  <div class="board-container">
    <!-- Free-form board area -->
    <div
      class="board"
      ref="boardRef"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
    >
      <!-- Connecting lines -->
      <svg class="board-svg" :width="boardW" :height="boardH" aria-hidden="true">
        <polygon
          v-if="orderedPlayers.length > 1"
          :points="svgPoints"
          fill="none"
          stroke="rgba(201,168,76,0.22)"
          stroke-width="1.5"
          stroke-linejoin="round"
        />
      </svg>

      <!-- Player tokens -->
      <PlayerToken
        v-for="(player, idx) in orderedPlayers"
        :key="player.id"
        :player="player"
        :x="tokenPositions[idx]?.x ?? 0"
        :y="tokenPositions[idx]?.y ?? 0"
        :size="tokenSize"
        :is-drag-mode="isDragMode"
        :is-selected="draggingId === player.id"
        :data-player-id="player.id"
      />

      <!-- Drag hint overlay -->
      <Transition name="fade">
        <div v-if="isDragMode" class="drag-hint">
          {{ t.dragHint }}
        </div>
      </Transition>
    </div>

    <!-- Bottom toolbar -->
    <div class="board-toolbar">
      <button class="toolbar-btn" @click="$emit('open-setup')">
        <IconPlus />
        <span>{{ t.newGame }}</span>
      </button>

      <button class="toolbar-btn" :class="{ active: isDragMode }" @click="toggleDragMode">
        <IconCheck v-if="isDragMode" />
        <IconMove v-else />
        <span>{{ isDragMode ? t.done : t.arrange }}</span>
      </button>

      <button class="toolbar-btn" @click="$emit('open-settings')">
        <IconMenu />
        <span>{{ t.settings }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGameStore } from '@/stores/game.store'
import PlayerToken from '@/components/player-token/PlayerToken.vue'
import { IconPlus, IconMove, IconCheck, IconMenu } from '@/components/icons'
import { useBoardLayout } from './composables/use-board-layout'
import { useTokenDrag } from './composables/use-token-drag'
import t from '@/i18n/game.json'

defineEmits<{
  'open-setup': []
  'open-settings': []
}>()

const store = useGameStore()
const orderedPlayers = computed(() => store.orderedPlayers)

const boardRef = ref<HTMLElement | null>(null)
const isDragMode = ref(false)

const { boardW, boardH, tokenPositions, tokenSize, svgPoints } = useBoardLayout(boardRef, orderedPlayers)
const { draggingId, onPointerDown, onPointerMove, onPointerUp } = useTokenDrag(boardRef, isDragMode)

function toggleDragMode() {
  isDragMode.value = !isDragMode.value
}
</script>

<style scoped>
@import './styles/game-board.css';
</style>
