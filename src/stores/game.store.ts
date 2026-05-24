import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Player } from '@/types/player.types'
import type { GameState, PlayerPosition } from '@/types/game.types'
import { GAME_VERSION } from '@/types/game.types'

const STORAGE_KEY = 'botc-game-state'

function generateId(): string {
  return Math.random().toString(36).slice(2, 9)
}

function loadFromStorage(): GameState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as GameState
    if (parsed.version !== GAME_VERSION) return null
    return parsed
  } catch {
    return null
  }
}

export const useGameStore = defineStore('game', () => {
  const saved = loadFromStorage()

  const players = ref<Player[]>(saved?.players ?? [])
  const circleOrder = ref<string[]>(saved?.circleOrder ?? [])
  const isStarted = ref<boolean>(saved?.isStarted ?? false)
  const playerPositions = ref<Record<string, PlayerPosition>>(saved?.playerPositions ?? {})
  const script = ref<string[]>(saved?.script ?? [])

  const orderedPlayers = computed<Player[]>(() => {
    return circleOrder.value
      .map(id => players.value.find(p => p.id === id))
      .filter((p): p is Player => p !== undefined)
  })

  watch(
    [players, circleOrder, isStarted, playerPositions, script],
    () => {
      const state: GameState = {
        players: players.value,
        circleOrder: circleOrder.value,
        isStarted: isStarted.value,
        version: GAME_VERSION,
        playerPositions: playerPositions.value,
        script: script.value,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    },
    { deep: true },
  )

  function startGame(names: string[]) {
    const newPlayers: Player[] = names
      .map(name => name.trim())
      .filter(name => name.length > 0)
      .map(name => ({ id: generateId(), name, status: 'alive' as const }))

    players.value = newPlayers
    circleOrder.value = newPlayers.map(p => p.id)
    isStarted.value = true
    playerPositions.value = {}
  }

  function updatePlayers(updated: Player[]) {
    const existingIds = new Set(circleOrder.value)
    const updatedIds = new Set(updated.map(p => p.id))

    circleOrder.value = circleOrder.value.filter(id => updatedIds.has(id))

    for (const p of updated) {
      if (!existingIds.has(p.id)) {
        circleOrder.value.push(p.id)
      }
    }

    players.value = updated
  }

  function swapCirclePositions(idA: string, idB: string) {
    const idxA = circleOrder.value.indexOf(idA)
    const idxB = circleOrder.value.indexOf(idB)
    if (idxA === -1 || idxB === -1) return
    ;[circleOrder.value[idxA], circleOrder.value[idxB]] = [
      circleOrder.value[idxB],
      circleOrder.value[idxA],
    ]
  }

  function moveInCircle(fromIndex: number, toIndex: number) {
    const order = [...circleOrder.value]
    const [moved] = order.splice(fromIndex, 1)
    order.splice(toIndex, 0, moved)
    circleOrder.value = order
  }

  function updatePlayer(id: string, patch: Partial<Player>) {
    const idx = players.value.findIndex(p => p.id === id)
    if (idx !== -1) {
      players.value[idx] = { ...players.value[idx], ...patch }
    }
  }

  function addPlayer(name: string) {
    const p: Player = { id: generateId(), name: name.trim(), status: 'alive' }
    players.value.push(p)
    circleOrder.value.push(p.id)
  }

  function removePlayer(id: string) {
    players.value = players.value.filter(p => p.id !== id)
    circleOrder.value = circleOrder.value.filter(cid => cid !== id)
    const { [id]: _removed, ...rest } = playerPositions.value
    playerPositions.value = rest
  }

  function setPlayerPosition(id: string, pos: PlayerPosition) {
    playerPositions.value = { ...playerPositions.value, [id]: pos }
  }

  function resetGame() {
    players.value = []
    circleOrder.value = []
    isStarted.value = false
    playerPositions.value = {}
  }

  function setScript(names: string[]) {
    script.value = names
  }

  function toggleScriptCharacter(name: string) {
    const idx = script.value.indexOf(name)
    if (idx === -1) {
      script.value = [...script.value, name]
    } else {
      script.value = script.value.filter(n => n !== name)
    }
  }

  function resetScript() {
    script.value = []
    players.value = players.value.map(p => ({ ...p, role: undefined }))
  }

  function assignRole(playerId: string, characterName: string) {
    updatePlayer(playerId, { role: characterName })
  }

  function clearRole(playerId: string) {
    updatePlayer(playerId, { role: undefined })
  }

  return {
    players,
    circleOrder,
    isStarted,
    playerPositions,
    script,
    orderedPlayers,
    startGame,
    updatePlayers,
    swapCirclePositions,
    moveInCircle,
    updatePlayer,
    addPlayer,
    removePlayer,
    setPlayerPosition,
    resetGame,
    setScript,
    toggleScriptCharacter,
    resetScript,
    assignRole,
    clearRole,
  }
})
