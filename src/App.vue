<template>
  <div class="app">
    <div class="bg-texture" aria-hidden="true" />

    <main class="app-main">
      <div v-if="!store.isStarted" class="empty-state">
        <div class="empty-icon">🕰️</div>
        <h2 class="empty-title">{{ t.emptyTitle }}</h2>
        <p class="empty-subtitle">{{ t.emptySubtitle }}</p>
        <button class="btn-start" @click="openSetup">{{ t.startNewGame }}</button>
      </div>

      <GameBoard
        v-else
        @open-setup="openSetup"
        @open-settings="showSettings = true"
      />
    </main>

    <SetupModal
      v-if="showSetup"
      :existing-players="store.players"
      :is-editing="store.isStarted"
      @confirm="handleSetupConfirm"
      @close="showSetup = false"
    />

    <SettingsPanel v-model="showSettings" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useGameStore } from '@/stores/game.store'
import GameBoard from '@/components/game-board/GameBoard.vue'
import SetupModal from '@/components/setup-modal/SetupModal.vue'
import SettingsPanel from '@/components/settings-panel/SettingsPanel.vue'
import t from '@/i18n/game.json'

const store = useGameStore()
const showSetup = ref(!store.isStarted)
const showSettings = ref(false)

function openSetup() {
  showSetup.value = true
}

function handleSetupConfirm(names: string[]) {
  store.startGame(names)
  showSetup.value = false
}
</script>

<style scoped>
.app {
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  background: radial-gradient(
    ellipse at 50% 0%,
    var(--color-bg-surface) 0%,
    var(--color-bg-mid) 40%,
    var(--color-bg) 100%
  );
}

.bg-texture {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='1' fill='%23c9a84c' opacity='0.04'/%3E%3Ccircle cx='0' cy='0' r='0.6' fill='%23c9a84c' opacity='0.03'/%3E%3Ccircle cx='60' cy='60' r='0.6' fill='%23c9a84c' opacity='0.03'/%3E%3C/svg%3E");
  background-repeat: repeat;
  pointer-events: none;
  z-index: 0;
}

.app-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1;
}

.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 0.75rem;
  text-align: center;
}

.empty-icon {
  font-size: 3rem;
  line-height: 1;
  opacity: 0.6;
}

.empty-title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  color: var(--color-gold);
  letter-spacing: 0.05em;
}

.empty-subtitle {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--color-parchment);
  opacity: 0.65;
  max-width: 280px;
  line-height: 1.5;
}

.btn-start {
  margin-top: 0.5rem;
  padding: 0.8rem 2rem;
  background: linear-gradient(135deg, var(--color-crimson), var(--color-crimson-dark));
  color: var(--color-parchment-light);
  border: 1px solid rgba(201, 168, 76, 0.3);
  border-radius: 9px;
  font-family: var(--font-display);
  font-size: 0.95rem;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s;
  box-shadow: 0 4px 16px rgba(139, 0, 0, 0.35);
}

.btn-start:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.btn-start:active {
  transform: translateY(0);
}
</style>
