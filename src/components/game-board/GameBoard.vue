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
      @click="onBoardClick"
    >
      <!-- Connecting lines -->
      <svg class="board-svg" :width="boardW" :height="boardH" aria-hidden="true">
        <polygon
          v-if="orderedPlayers.length > 1 && isDragMode"
          :points="svgPoints"
          fill="none"
          stroke="rgba(201,168,76,0.35)"
          stroke-width="2.5"
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

      <button class="toolbar-btn" :class="{ active: showScriptEditor }" @click="toggleScriptEditor">
        <IconScript />
        <span>{{ t.script }}</span>
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

  <!-- Player card (status + role editor) -->
  <PlayerCard :player="selectedPlayer" @close="selectedPlayerId = null" />

  <!-- Script picker (shown when no script is set) -->
  <ScriptPicker
    :show="showScriptPicker"
    @close="showScriptPicker = false"
    @custom="onCustomScript"
  />

  <!-- Script editor -->
  <ScriptEditor :show="showScriptEditor" @close="showScriptEditor = false" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGameStore } from '@/stores/game.store'
import PlayerToken from '@/components/player-token/PlayerToken.vue'
import PlayerCard from '@/components/player-card/PlayerCard.vue'
import ScriptEditor from '@/components/script-editor/ScriptEditor.vue'
import ScriptPicker from '@/components/script-picker/ScriptPicker.vue'
import { IconPlus, IconMove, IconCheck, IconMenu, IconScript } from '@/components/icons'
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
const showScriptEditor = ref(false)
const showScriptPicker = ref(false)
const selectedPlayerId = ref<string | null>(null)

const selectedPlayer = computed(() =>
  selectedPlayerId.value
    ? (orderedPlayers.value.find(p => p.id === selectedPlayerId.value) ?? null)
    : null,
)

const { boardW, boardH, tokenPositions, tokenSize, svgPoints } = useBoardLayout(boardRef, orderedPlayers)
const { draggingId, onPointerDown, onPointerMove, onPointerUp } = useTokenDrag(boardRef, isDragMode)

function toggleDragMode() {
  isDragMode.value = !isDragMode.value
  selectedPlayerId.value = null
}

function toggleScriptEditor() {
  if (store.script.length === 0) {
    showScriptPicker.value = !showScriptPicker.value
    showScriptEditor.value = false
  } else {
    showScriptEditor.value = !showScriptEditor.value
    showScriptPicker.value = false
  }
  selectedPlayerId.value = null
}

function onCustomScript() {
  showScriptPicker.value = false
  showScriptEditor.value = true
}

function onBoardClick(e: MouseEvent) {
  if (isDragMode.value) return
  const el = (e.target as HTMLElement).closest('[data-player-id]') as HTMLElement | null
  const id = el?.dataset.playerId
  if (!id) return
  selectedPlayerId.value = selectedPlayerId.value === id ? null : id
}
</script>

<style scoped>
@import './styles/game-board.css';
</style>
