import type { Progress } from '@/types'

/**
 * Mock progress data for development.
 * Replace with real API calls in Phase 10.
 */

const mockProgress: Progress[] = [
  { id: 'p1', gameId: '1', userId: 'user1', missionId: 'm1', completed: true, completedAt: '2024-01-15T10:30:00Z' },
  { id: 'p2', gameId: '1', userId: 'user1', missionId: 'm2', completed: false },
]

/**
 * Get progress for a game and user (mock).
 */
export async function getProgress(gameId: string, userId: string): Promise<Progress[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockProgress.filter((p) => p.gameId === gameId && p.userId === userId)
}

/**
 * Get progress for a specific mission (mock).
 */
export async function getMissionProgress(gameId: string, userId: string, missionId: string): Promise<Progress | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return mockProgress.find(
    (p) => p.gameId === gameId && p.userId === userId && p.missionId === missionId
  )
}

/**
 * Update or create progress for a mission (mock).
 */
export async function updateMissionProgress(
  gameId: string,
  userId: string,
  missionId: string,
  completed: boolean
): Promise<Progress> {
  await new Promise((resolve) => setTimeout(resolve, 250))

  const existing = mockProgress.find(
    (p) => p.gameId === gameId && p.userId === userId && p.missionId === missionId
  )

  if (existing) {
    return { ...existing, completed, updatedAt: new Date().toISOString() }
  }

  const newProgress: Progress = {
    id: `p-${Date.now()}`,
    gameId,
    userId,
    missionId,
    completed,
    completedAt: completed ? new Date().toISOString() : undefined,
    createdAt: new Date().toISOString(),
  }
  mockProgress.push(newProgress)
  return newProgress
}
