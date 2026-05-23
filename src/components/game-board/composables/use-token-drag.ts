import { ref } from 'vue'
import type { Ref } from 'vue'
import { useGameStore } from '@/stores/game.store'

function reorderByAngle(store: ReturnType<typeof useGameStore>) {
  const players = store.orderedPlayers
  const n = players.length
  if (n < 2) return

  const withPos = players.map((p, idx) => {
    // Fall back to circle position if no custom position stored
    const angle = (2 * Math.PI * idx) / n - Math.PI / 2
    const fallback = { x: 0.5 + 0.38 * Math.cos(angle), y: 0.5 + 0.38 * Math.sin(angle) }
    const pos = store.playerPositions[p.id] ?? fallback
    return { id: p.id, x: pos.x, y: pos.y }
  })

  // Freeze positions before reordering: players without a stored position
  // use defaultCirclePos(idx, n) as fallback — once circleOrder changes their
  // idx changes too, making them jump to wrong spots. Saving now prevents that.
  for (const entry of withPos) {
    if (!store.playerPositions[entry.id]) {
      store.setPlayerPosition(entry.id, { x: entry.x, y: entry.y })
    }
  }

  const cx = withPos.reduce((s, p) => s + p.x, 0) / n
  const cy = withPos.reduce((s, p) => s + p.y, 0) / n

  const sorted = [...withPos].sort(
    (a, b) => Math.atan2(a.y - cy, a.x - cx) - Math.atan2(b.y - cy, b.x - cx),
  )

  store.circleOrder = sorted.map(p => p.id)
}

export function useTokenDrag(
  boardRef: Ref<HTMLElement | null>,
  isDragMode: Ref<boolean>,
) {
  const store = useGameStore()
  const draggingId = ref<string | null>(null)

  function onPointerDown(e: PointerEvent) {
    if (!isDragMode.value) return
    const el = (e.target as HTMLElement).closest('[data-player-id]') as HTMLElement | null
    if (!el) return
    const id = el.dataset.playerId
    if (!id) return
    draggingId.value = id
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }

  function onPointerMove(e: PointerEvent) {
    if (!draggingId.value || !boardRef.value) return
    const rect = boardRef.value.getBoundingClientRect()
    store.setPlayerPosition(draggingId.value, {
      x: Math.max(0.04, Math.min(0.96, (e.clientX - rect.left) / rect.width)),
      y: Math.max(0.04, Math.min(0.96, (e.clientY - rect.top) / rect.height)),
    })
  }

  function onPointerUp() {
    if (draggingId.value) reorderByAngle(store)
    draggingId.value = null
  }

  return { draggingId, onPointerDown, onPointerMove, onPointerUp }
}
