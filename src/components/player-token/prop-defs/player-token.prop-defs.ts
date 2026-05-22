import type { PropDef } from '@/types/prop-def.types'
import type { Player } from '@/types/player.types'

export const PlayerTokenPropDefs = {
  player:      { type: 'object',  required: true },
  x:           { type: 'number',  required: true },
  y:           { type: 'number',  required: true },
  size:        { type: 'number',  required: true },
  isDragMode:  { type: 'boolean', default: false },
  isSelected:  { type: 'boolean', default: false },
} satisfies {
  player:     PropDef<Player>
  x:          PropDef<number>
  y:          PropDef<number>
  size:       PropDef<number>
  isDragMode: PropDef<boolean>
  isSelected: PropDef<boolean>
}
