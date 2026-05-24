<template>
  <Teleport to="body">
    <div class="modal-backdrop" @click.self="$emit('close')">
      <div class="modal">
        <div class="modal-header">
          <h2 class="modal-title">{{ isEditing ? t.titleEdit : t.titleNew }}</h2>
          <button v-if="isEditing" class="btn-icon" aria-label="Close" @click="$emit('close')">✕</button>
        </div>

        <p class="modal-subtitle">
          {{ isEditing ? t.subtitleEdit : t.subtitleNew }}
          <span class="count-badge">{{ nameList.length }} players</span>
        </p>

        <div class="name-list">
          <TransitionGroup name="list">
            <div v-for="(entry, idx) in nameList" :key="entry.id" class="name-row">
              <span class="name-index">{{ idx + 1 }}</span>
              <input
                v-model="entry.name"
                class="name-input"
                type="text"
                :placeholder="`Player ${idx + 1}`"
                maxlength="24"
                :ref="el => { if (el) inputRefs[idx] = el as HTMLInputElement }"
                @keydown.enter="focusNext(idx)"
              />
              <button
                class="btn-icon btn-remove"
                :disabled="nameList.length <= 1"
                aria-label="Remove player"
                @click="removeName(idx)"
              >✕</button>
            </div>
          </TransitionGroup>
        </div>

        <button class="btn-add" @click="addName">+ Add Player</button>

        <label v-if="hasScript" class="clear-script-row">
          <input v-model="clearScript" type="checkbox" class="clear-script-checkbox" />
          <span>{{ t.clearScript }}</span>
        </label>

        <div class="modal-actions">
          <button class="btn-primary" :disabled="!canConfirm" @click="confirm">
            {{ isEditing ? t.saveChanges : t.startGame }}
          </button>
        </div>

        <p v-if="!canConfirm" class="validation-hint">
          {{ t.minPlayersHint }}
        </p>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from 'vue'
import type { Player } from '@/types/player.types'
import t from '@/i18n/setup.json'

interface NameEntry {
  id: string
  name: string
}

interface Props {
  existingPlayers?: Player[]
  isEditing?: boolean
  hasScript?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  existingPlayers: () => [],
  isEditing: false,
  hasScript: false,
})

const emit = defineEmits<{
  confirm: [names: string[], clearScript: boolean]
  close: []
}>()

let _idCounter = 0
function makeEntry(name = ''): NameEntry {
  return { id: String(++_idCounter), name }
}

const nameList = ref<NameEntry[]>(
  props.existingPlayers.length > 0
    ? props.existingPlayers.map(p => makeEntry(p.name))
    : Array.from({ length: 7 }, () => makeEntry()),
)

const inputRefs = ref<HTMLInputElement[]>([])
const clearScript = ref(false)

const canConfirm = computed(() =>
  nameList.value.filter(e => e.name.trim().length > 0).length >= 5,
)

function addName() {
  nameList.value.push(makeEntry())
  nextTick(() => {
    const last = inputRefs.value[nameList.value.length - 1]
    last?.focus()
  })
}

function removeName(idx: number) {
  if (nameList.value.length <= 1) return
  nameList.value.splice(idx, 1)
}

function focusNext(idx: number) {
  if (idx < nameList.value.length - 1) {
    inputRefs.value[idx + 1]?.focus()
  } else {
    addName()
  }
}

function confirm() {
  const names = nameList.value.map(e => e.name.trim()).filter(n => n.length > 0)
  emit('confirm', names, clearScript.value)
}

onMounted(() => {
  nextTick(() => inputRefs.value[0]?.focus())
})
</script>

<style scoped>
@import './styles/setup-modal.css';
</style>
