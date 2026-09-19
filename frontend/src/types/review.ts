/**
 * Represents a review written by a user for a game or mission
 */
export interface Review {
  id: string
  userId: string
  gameId?: string
  missionId?: string
  rating: number // 1-5
  content: string
  likes: number
  dislikes: number
  createdAt?: string
  updatedAt?: string
}

/**
 * Nested comment/reply on a review or another comment
 */
export interface Comment {
  id: string
  parentId?: string // null for top-level comments
  reviewId: string
  userId: string
  content: string
  likes: number
  dislikes: number
  createdAt?: string
  updatedAt?: string
}

/**
 * Reaction type for reviews and comments
 */
export const ReactionType = {
  LIKE: 'like' as const,
  DISLIKE: 'dislike' as const,
} as const

export type ReactionType = (typeof ReactionType)[keyof typeof ReactionType]

/**
 * Tracks which user reacted to which review/comment
 */
export interface ReviewReaction {
  id: string
  userId: string
  targetType: 'review' | 'comment'
  targetId: string
  reaction: ReactionType
  createdAt?: string
}
