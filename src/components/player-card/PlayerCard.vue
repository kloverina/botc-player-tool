<template>
  <Teleport to="body">
    <Transition name="card">
      <div v-if="player" class="card-backdrop" @click.self="onClose">
        <div class="card">
          <div class="card-header">
            <span class="card-name">{{ player.name }}</span>
            <button class="btn-close" @click="onClose">✕</button>
          </div>

          <!-- Status -->
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

          <!-- Role section -->
          <div class="role-section">
            <!-- Assigned role -->
            <div v-if="player.role" class="assigned-role">
              <img
                class="assigned-role-icon"
                :src="player.roleImage"
                :alt="player.role"
              />
              <span class="assigned-role-name">{{ player.role }}</span>
              <div class="role-actions">
                <button class="role-action-btn" @click="showPicker = !showPicker">
                  {{ ts.changeRole }}
                </button>
                <button class="role-action-btn danger" @click="onClearRole">
                  {{ ts.clearRole }}
                </button>
              </div>
            </div>

            <!-- No role assigned -->
            <div v-else-if="hasScript" class="no-role">
              <button class="assign-btn" @click="showPicker = !showPicker">
                {{ showPicker ? '▾' : '▸' }} {{ ts.assignRole }}
              </button>
            </div>

            <!-- No script set up -->
            <div v-else class="no-script-hint">
              {{ ts.noScript }}
            </div>

            <!-- Inline role picker -->
            <RolePicker
              v-if="showPicker && player"
              :player-id="player.id"
              @select="onRoleSelected"
            />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGameStore } from '@/stores/game.store'
import type { Player, PlayerStatus } from '@/types/player.types'
import { IconAlive, IconStatusKilled, IconStatusExecuted } from '@/components/icons'
import RolePicker from '@/components/role-picker/RolePicker.vue'
import t from '@/i18n/player.json'
import ts from '@/i18n/script.json'

const props = defineProps<{ player: Player | null }>()
const emit = defineEmits<{ close: [] }>()

const store = useGameStore()
const showPicker = ref(false)

const currentStatus = computed(() => props.player?.status ?? 'alive')
const hasScript = computed(() => store.script.length > 0)

function setStatus(status: PlayerStatus) {
  if (!props.player) return
  store.updatePlayer(props.player.id, { status })
  emit('close')
}

function onRoleSelected() {
  showPicker.value = false
}

function onClearRole() {
  if (!props.player) return
  store.clearRole(props.player.id)
  showPicker.value = false
}

function onClose() {
  showPicker.value = false
  emit('close')
}
</script>

<style scoped>
@import './styles/player-card.css';
</style>
