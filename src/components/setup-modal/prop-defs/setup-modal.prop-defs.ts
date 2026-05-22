import type { PropDef } from '@/types/prop-def.types'
import type { Player } from '@/types/player.types'

export const SetupModalPropDefs = {
  existingPlayers: { type: 'object', default: () => [] },
  isEditing:       { type: 'boolean', default: false },
} satisfies {
  existingPlayers: PropDef<Player[]>
  isEditing:       PropDef<boolean>
}
