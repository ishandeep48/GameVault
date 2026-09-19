/**
 * Represents a mission within a game
 */
export interface Mission {
  id: string
  gameId: string
  title: string
  description?: string
  order: number
  actId?: string
  actOrder?: number
  completed: boolean
  createdAt?: string
  updatedAt?: string
}

/**
 * Represents an act/chapter grouping missions
 */
export interface Act {
  id: string
  gameId: string
  title: string
  order: number
  description?: string
}
