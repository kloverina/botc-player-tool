export interface SetupCounts {
  t: number
  o: number
  m: number
  d: number
}

const SETUP: Record<number, SetupCounts> = {
  5:  { t: 3, o: 0, m: 1, d: 1 },
  6:  { t: 3, o: 1, m: 1, d: 1 },
  7:  { t: 5, o: 0, m: 1, d: 1 },
  8:  { t: 5, o: 1, m: 1, d: 1 },
  9:  { t: 5, o: 2, m: 1, d: 1 },
  10: { t: 7, o: 0, m: 2, d: 1 },
  11: { t: 7, o: 1, m: 2, d: 1 },
  12: { t: 7, o: 2, m: 2, d: 1 },
  13: { t: 9, o: 0, m: 3, d: 1 },
  14: { t: 9, o: 1, m: 3, d: 1 },
  15: { t: 9, o: 2, m: 3, d: 1 },
}

export function getSetupCounts(playerCount: number): SetupCounts | null {
  if (playerCount < 5) return null
  return SETUP[Math.min(playerCount, 15)] ?? null
}
