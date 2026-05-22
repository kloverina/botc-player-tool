import type { Player } from '@/types/player.types'

export interface PlayerTokenProps {
  player: Player
  x: number
  y: number
  size: number
  isDragMode?: boolean
  isSelected?: boolean
}
