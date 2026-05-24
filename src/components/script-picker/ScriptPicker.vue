<template>
  <Teleport to="body">
    <Transition name="card">
      <div v-if="show" class="picker-backdrop" @click.self="$emit('close')">
        <div class="picker">
          <div class="drag-handle" @click="$emit('close')" />

          <div class="picker-header">
            <span class="picker-title">{{ t.pickerTitle }}</span>
            <button class="btn-close" @click="$emit('close')">✕</button>
          </div>

          <div class="picker-scroll">
            <!-- Base scenario cards -->
            <div class="scenarios">
              <button
                v-for="script in baseScripts"
                :key="script.id"
                class="scenario-card"
                @click="selectScript(script)"
              >
                <span class="scenario-name">{{ script.name }}</span>
                <span class="scenario-tagline">{{ script.tagline }}</span>
              </button>
            </div>

            <div class="divider"><span>{{ t.or }}</span></div>

            <!-- Secondary actions -->
            <div class="actions">
              <button class="action-btn" @click="triggerJsonLoad">
                {{ t.loadJson }}
              </button>
              <button class="action-btn" @click="$emit('custom')">
                {{ t.customScript }}
              </button>
            </div>

            <input
              ref="fileInput"
              type="file"
              accept=".json"
              style="display:none"
              @change="onFileChange"
            />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useGameStore } from '@/stores/game.store'
import { baseScripts, type BaseScript } from '@/data/scripts'
import { charactersByName, charactersByScriptId } from '@/data/characters'
import t from '@/i18n/script.json'

defineProps<{ show: boolean }>()
const emit = defineEmits<{ close: []; custom: [] }>()

const store = useGameStore()
const fileInput = ref<HTMLInputElement | null>(null)

function countByType(script: BaseScript, type: string): number {
  return script.characters.filter(name => {
    const char = charactersByName.get(name)
    return char?.type === type
  }).length
}

function selectScript(script: BaseScript) {
  store.setScript(script.characters)
  emit('close')
}

function triggerJsonLoad() {
  fileInput.value?.click()
}

function onFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (ev) => {
    try {
      const json = JSON.parse(ev.target?.result as string) as Array<{ id: string }>
      const names = json
        .filter(entry => entry.id && entry.id !== '_meta')
        .map(entry => charactersByScriptId.get(entry.id)?.name)
        .filter((name): name is string => name !== undefined)

      if (names.length > 0) {
        store.setScript(names)
        emit('close')
      }
    } catch {
      // invalid JSON — silently ignore
    }
    // reset so the same file can be re-selected
    if (fileInput.value) fileInput.value.value = ''
  }
  reader.readAsText(file)
}
</script>

<style scoped>
@import './styles/script-picker.css';
</style>
