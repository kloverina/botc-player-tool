<template>
  <Teleport to="body">
    <Transition name="sheet">
      <div v-if="modelValue" class="sheet-backdrop" @click.self="$emit('update:modelValue', false)">
        <div class="sheet">
          <div class="sheet-header">
            <h2 class="sheet-title">{{ t.title }}</h2>
            <button class="btn-icon" @click="$emit('update:modelValue', false)" :aria-label="t.close">✕</button>
          </div>

          <div class="section">
            <div class="section-header">
              <span class="section-title">{{ t.players }}</span>
              <span class="section-badge">{{ localPlayers.length }}</span>
            </div>

            <div class="player-list">
              <VueDraggable v-model="localPlayers" :animation="200" handle=".drag-handle">
                <div v-for="(player, idx) in localPlayers" :key="player.id" class="player-row">
                  <span class="drag-handle">⠿</span>
                  <span class="player-num">{{ idx + 1 }}</span>
                  <input
                    v-model="player.name"
                    class="player-name-input"
                    type="text"
                    :placeholder="`Player ${idx + 1}`"
                    maxlength="24"
                  />
                  <button
                    class="btn-icon btn-danger"
                    :disabled="localPlayers.length <= 1"
                    :aria-label="tPlayer.removePlayer"
                    @click="removePlayer(player.id)"
                  >✕</button>
                </div>
              </VueDraggable>
            </div>

            <button class="btn-add-player" @click="addPlayer">
              {{ tPlayer.addPlayer }}
            </button>
          </div>

          <div class="divider" />

          <div class="section">
            <div class="section-header">
              <span class="section-title">{{ t.about }}</span>
            </div>
            <p class="about-text">{{ t.aboutText }}</p>
          </div>

          <div class="sheet-actions">
            <button class="btn-save" :disabled="!hasChanges || !canSave" @click="save">
              {{ t.saveChanges }}
            </button>
            <button class="btn-danger-outline" @click="confirmReset">
              {{ t.resetGame }}
            </button>
          </div>

          <p v-if="!canSave && hasChanges" class="save-hint">
            {{ t.saveHint }}
          </p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { useGameStore } from '@/stores/game.store'
import type { Player } from '@/types/player.types'
import t from '@/i18n/settings.json'
import tPlayer from '@/i18n/player.json'

const props = defineProps<{ modelValue: boolean }>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const store = useGameStore()
const localPlayers = ref<Player[]>([])

watch(
  () => props.modelValue,
  (open) => {
    if (open) localPlayers.value = store.orderedPlayers.map(p => ({ ...p }))
  },
  { immediate: true },
)

const hasChanges = computed(() => {
  const orig = store.orderedPlayers.map(p => p.name).join('|')
  const local = localPlayers.value.map(p => p.name).join('|')
  return orig !== local || store.orderedPlayers.length !== localPlayers.value.length
})

const canSave = computed(() =>
  localPlayers.value.filter(p => p.name.trim().length > 0).length >= 5,
)

let _counter = 0
function makeId() { return `new-${++_counter}` }

function addPlayer() {
  localPlayers.value.push({ id: makeId(), name: '', status: 'alive' })
}

function removePlayer(id: string) {
  if (localPlayers.value.length <= 1) return
  localPlayers.value = localPlayers.value.filter(p => p.id !== id)
}

function save() {
  const filtered = localPlayers.value.filter(p => p.name.trim().length > 0)
  store.updatePlayers(filtered)
  store.circleOrder = filtered.map(p => p.id)
  emit('update:modelValue', false)
}

function confirmReset() {
  if (confirm(t.resetConfirm)) {
    store.resetGame()
    emit('update:modelValue', false)
  }
}
</script>

<style scoped>
@import './styles/settings-panel.css';
</style>
