import { ref, computed, nextTick } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import type { Player } from '@/types/player.types'
import { useGameStore } from '@/stores/game.store'
import { useResizeObserver } from '@/composables/use-resize-observer'

function defaultCirclePos(idx: number, n: number) {
  const angle = (2 * Math.PI * idx) / n - Math.PI / 2
  return {
    x: 0.5 + 0.38 * Math.cos(angle),
    y: 0.5 + 0.38 * Math.sin(angle),
  }
}

export function useBoardLayout(
  containerRef: Ref<HTMLElement | null>,
  orderedPlayers: ComputedRef<Player[]>,
) {
  const store = useGameStore()
  const boardW = ref(300)
  const boardH = ref(300)

  useResizeObserver(containerRef, () => {
    if (!containerRef.value) return
    boardW.value = containerRef.value.clientWidth
    boardH.value = containerRef.value.clientHeight
    nextTick()
  })

  const tokenPositions = computed(() => {
    const n = orderedPlayers.value.length
    return orderedPlayers.value.map((player, idx) => {
      const pos = store.playerPositions[player.id] ?? defaultCirclePos(idx, n)
      return { x: pos.x * boardW.value, y: pos.y * boardH.value }
    })
  })

  const tokenSize = computed(() => {
    const n = orderedPlayers.value.length || 1
    const minDim = Math.min(boardW.value, boardH.value) || 300
    const radius = minDim * 0.38
    const maxFromCirc = Math.min(
      (2 * Math.PI * radius) / (n * 1.15),
      minDim * 0.18,
    )
    return Math.max(Math.floor(maxFromCirc), 32)
  })

  const svgPoints = computed(() =>
    tokenPositions.value.map(p => `${p.x},${p.y}`).join(' '),
  )

  return { boardW, boardH, tokenPositions, tokenSize, svgPoints }
}
