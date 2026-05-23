import type { Player } from './player.types'

export interface PlayerPosition {
  x: number
  y: number
}

export interface GameState {
  players: Player[]
  circleOrder: string[]
  isStarted: boolean
  version: number
  playerPositions?: Record<string, PlayerPosition>
  script?: string[]
}

export const GAME_VERSION = 1
