/**
 * Tracks user progress on a specific mission within a game
 */
export interface Progress {
  id: string
  gameId: string
  userId: string
  missionId: string
  completed: boolean
  completedAt?: string
  notes?: string
  createdAt?: string
  updatedAt?: string
}
