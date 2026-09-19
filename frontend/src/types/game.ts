/**
 * User's play status for a game
 */
export const GameStatus = {
  PLAYING: 'playing' as const,
  COMPLETED: 'completed' as const,
  ON_HOLD: 'on_hold' as const,
  DROPPED: 'dropped' as const,
  PLAN_TO_PLAY: 'plan_to_play' as const,
} as const

export type GameStatus = (typeof GameStatus)[keyof typeof GameStatus]

/**
 * Represents a game in the library
 */
export interface Game {
  id: string
  title: string
  description: string
  coverImage?: string
  bannerImage?: string
  releaseDate?: string
  developer?: string
  publisher?: string
  genres: string[]
  platforms: string[]
  createdAt?: string
  updatedAt?: string
}

/**
 * Status label mapping for display
 */
export const statusLabels: Record<GameStatus, string> = {
  [GameStatus.PLAYING]: 'Playing',
  [GameStatus.COMPLETED]: 'Completed',
  [GameStatus.ON_HOLD]: 'On Hold',
  [GameStatus.DROPPED]: 'Dropped',
  [GameStatus.PLAN_TO_PLAY]: 'Plan to Play',
}

/**
 * Status color mapping for Tailwind classes
 */
export const statusClasses: Record<GameStatus, string> = {
  [GameStatus.PLAYING]: 'badge-playing',
  [GameStatus.COMPLETED]: 'badge-completed',
  [GameStatus.ON_HOLD]: 'badge-on-hold',
  [GameStatus.DROPPED]: 'badge-dropped',
  [GameStatus.PLAN_TO_PLAY]: 'badge-plan-to-play',
}
