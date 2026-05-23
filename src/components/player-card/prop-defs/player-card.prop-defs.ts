import type { PropDef } from '@/types/prop-def.types'
import type { Player } from '@/types/player.types'

export const PlayerCardPropDefs = {
  player: { type: 'object', default: null },
} satisfies {
  player: PropDef<Player | null>
}
