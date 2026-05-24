export type PlayerStatus = 'alive' | 'dead' | 'executed'

export type PlayerAlignment = 'good' | 'evil' | 'unknown'

export interface Player {
  id: string
  name: string
  role?: string
  status?: PlayerStatus
  alignment?: PlayerAlignment
  notes?: string
  isNominated?: boolean
  hasVoted?: boolean
}
