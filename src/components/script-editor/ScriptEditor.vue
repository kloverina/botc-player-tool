<template>
  <Teleport to="body">
    <Transition name="card">
      <div v-if="show" class="editor-backdrop" @click.self="$emit('close')">
        <div class="editor">

          <div class="editor-header">
            <span class="editor-title">{{ t.title }}</span>
            <button class="btn-reset" @click="onReset">{{ t.resetScript }}</button>
            <button class="btn-close" @click="$emit('close')">✕</button>
          </div>

          <!-- Search -->
          <div class="search-row">
            <input
              v-model="searchQuery"
              class="search-input"
              type="search"
              :placeholder="t.search"
              autocomplete="off"
              spellcheck="false"
            />
          </div>

          <div class="editor-scroll">
            <div v-for="section in filteredSections" :key="section.type" class="section">
              <div class="section-header" :class="`type-${section.type}`">
                <span class="section-label">{{ section.label }}</span>
                <span class="section-count">
                  {{ selectedByType[section.type]?.length ?? 0 }}
                </span>
              </div>
              <div class="char-grid">
                <button
                  v-for="char in section.characters"
                  :key="char.name"
                  class="char-btn"
                  :class="[`type-${char.type}`, { selected: isSelected(char.name) }]"
                  @click="store.toggleScriptCharacter(char.name)"
                >
                  <div class="char-icon-wrap">
                    <img :src="getCharacterIcon(char.name)" :alt="char.name" loading="lazy" />
                  </div>
                  <span class="char-name">{{ char.name }}</span>
                </button>
              </div>
            </div>

            <div v-if="filteredSections.length === 0" class="no-results">
              {{ t.noResults }}
            </div>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGameStore } from '@/stores/game.store'
import { characters, charactersByType, getCharacterIcon } from '@/data/characters'
import type { CharacterType } from '@/data/characters'
import t from '@/i18n/script.json'

defineProps<{ show: boolean }>()
const emit = defineEmits<{ close: [] }>()

const store = useGameStore()
const searchQuery = ref('')

const allSections = [
  { type: 'townsfolk' as CharacterType, label: t.townsfolk, characters: charactersByType.townsfolk ?? [] },
  { type: 'outsider'  as CharacterType, label: t.outsiders, characters: charactersByType.outsider  ?? [] },
  { type: 'minion'    as CharacterType, label: t.minions,   characters: charactersByType.minion    ?? [] },
  { type: 'demon'     as CharacterType, label: t.demons,    characters: charactersByType.demon     ?? [] },
]

const filteredSections = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return allSections
  return allSections
    .map(s => ({ ...s, characters: s.characters.filter(c => c.name.toLowerCase().includes(q)) }))
    .filter(s => s.characters.length > 0)
})

const isSelected = (name: string) => store.script.includes(name)

const selectedByType = computed(() =>
  characters
    .filter(c => store.script.includes(c.name))
    .reduce(
      (acc, c) => { ;(acc[c.type] ??= []).push(c.name); return acc },
      {} as Record<CharacterType, string[]>,
    ),
)

function onReset() {
  if (confirm(t.resetConfirm)) {
    store.resetScript()
    emit('close')
  }
}
</script>

<style scoped>
@import './styles/script-editor.css';
</style>
