export type PropDefType = 'string' | 'number' | 'boolean' | 'enum' | 'object'

export interface PropDef<T> {
  type: PropDefType
  values?: readonly T[]
  default?: T | (() => T)
  required?: boolean
}
