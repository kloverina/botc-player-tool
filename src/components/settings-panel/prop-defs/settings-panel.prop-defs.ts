import type { PropDef } from '@/types/prop-def.types'

export const SettingsPanelPropDefs = {
  modelValue: { type: 'boolean', required: true },
} satisfies {
  modelValue: PropDef<boolean>
}
