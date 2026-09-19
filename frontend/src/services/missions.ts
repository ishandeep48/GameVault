import type { Mission, Act } from '@/types'

/**
 * Mock mission data for development.
 * Replace with real API calls in Phase 10.
 */

const mockMissions: Mission[] = [
  { id: 'm1', gameId: '1', title: 'The Wild Hunt', description: 'A mysterious hunter stalks the land.', order: 1, actOrder: 1, completed: false },
  { id: 'm2', gameId: '1', title: 'Family Matters', description: 'Find your adopted daughter Ciri.', order: 2, actOrder: 1, completed: false },
  { id: 'm3', gameId: '1', title: 'The King is Dead', description: 'Investigate the murder of the king.', order: 3, actOrder: 2, completed: false },
]

const mockActs: Act[] = [
  { id: 'a1', gameId: '1', title: 'Prologue', order: 1 },
  { id: 'a2', gameId: '1', title: 'Act I', order: 2 },
]

/**
 * Get all missions for a game (mock).
 */
export async function getMissionsByGame(gameId: string): Promise<Mission[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockMissions.filter((m) => m.gameId === gameId).sort((a, b) => a.order - b.order)
}

/**
 * Get acts for a game (mock).
 */
export async function getActsByGame(gameId: string): Promise<Act[]> {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return mockActs.filter((a) => a.gameId === gameId).sort((a, b) => a.order - b.order)
}

/**
 * Get a single mission by ID (mock).
 */
export async function getMissionById(id: string): Promise<Mission | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return mockMissions.find((m) => m.id === id)
}
