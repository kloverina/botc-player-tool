<template>
  <div class="role-picker">
    <template v-for="section in sections" :key="section.type">
      <div v-if="section.characters.length" class="section">
        <div class="section-header" :class="`type-${section.type}`">
          {{ section.label }}
        </div>
        <div class="char-grid">
          <button
            v-for="char in section.characters"
            :key="char.name"
            class="char-btn"
            :class="[`type-${char.type}`, { taken: isTaken(char.name) }]"
            @click="select(char)"
          >
            <div class="char-icon-wrap">
              <img :src="getCharacterIcon(char.name)" :alt="char.name" loading="lazy" />
            </div>
            <span class="char-name">{{ char.name }}</span>
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/game.store'
import { characters, getCharacterIcon } from '@/data/characters'
import type { Character, CharacterType } from '@/data/characters'
import t from '@/i18n/script.json'

const props = defineProps<{ playerId: string }>()
const emit = defineEmits<{ select: [character: Character] }>()

const store = useGameStore()

const scriptCharacters = computed(() =>
  characters.filter(c => store.script.includes(c.name)),
)

const sections = computed(() => [
  { type: 'townsfolk' as CharacterType, label: t.townsfolk, characters: scriptCharacters.value.filter(c => c.type === 'townsfolk') },
  { type: 'outsider'  as CharacterType, label: t.outsiders, characters: scriptCharacters.value.filter(c => c.type === 'outsider') },
  { type: 'minion'    as CharacterType, label: t.minions,   characters: scriptCharacters.value.filter(c => c.type === 'minion') },
  { type: 'demon'     as CharacterType, label: t.demons,    characters: scriptCharacters.value.filter(c => c.type === 'demon') },
])

// Roles assigned to OTHER players (not the current one)
const takenRoles = computed(() =>
  new Set(
    store.players
      .filter(p => p.id !== props.playerId && p.role)
      .map(p => p.role!),
  ),
)

const isTaken = (name: string) => takenRoles.value.has(name)

function select(char: Character) {
  store.assignRole(props.playerId, char.name, getCharacterIcon(char.name))
  emit('select', char)
}
</script>

<style scoped>
@import './styles/role-picker.css';
</style>
