<template>
  <Teleport to="body">
    <Transition name="card">
      <div v-if="player" class="card-backdrop" @click.self="$emit('close')">
        <div class="card">
          <div class="card-header">
            <span class="card-name">{{ player.name }}</span>
            <button class="btn-close" @click="$emit('close')">✕</button>
          </div>

          <div class="status-row">
            <button
              class="status-btn"
              :class="{ active: currentStatus === 'alive', 'active-alive': currentStatus === 'alive' }"
              @click="setStatus('alive')"
            >
              <IconAlive :size="20" />
              <span>{{ t.statusAlive }}</span>
            </button>

            <button
              class="status-btn"
              :class="{ active: currentStatus === 'dead', 'active-dead': currentStatus === 'dead' }"
              @click="setStatus('dead')"
            >
              <IconStatusKilled :size="20" />
              <span>{{ t.statusKilled }}</span>
            </button>

            <button
              class="status-btn"
              :class="{ active: currentStatus === 'executed', 'active-executed': currentStatus === 'executed' }"
              @click="setStatus('executed')"
            >
              <IconStatusExecuted :size="20" />
              <span>{{ t.statusExecuted }}</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/game.store'
import type { Player, PlayerStatus } from '@/types/player.types'
import { IconAlive, IconStatusKilled, IconStatusExecuted } from '@/components/icons'
import t from '@/i18n/player.json'

const props = defineProps<{ player: Player | null }>()
const emit = defineEmits<{ close: [] }>()

const store = useGameStore()
const currentStatus = computed(() => props.player?.status ?? 'alive')

function setStatus(status: PlayerStatus) {
  if (!props.player) return
  store.updatePlayer(props.player.id, { status })
  emit('close')
}
</script>

<style scoped>
@import './styles/player-card.css';
</style>
