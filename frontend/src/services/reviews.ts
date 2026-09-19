import type { Review, Comment, ReviewReaction } from '@/types'
import { ReactionType } from '@/types'

/**
 * Mock review data for development.
 * Replace with real API calls in Phase 10.
 */

const mockReviews: Review[] = [
  {
    id: 'r1',
    userId: 'user1',
    gameId: '1',
    rating: 5,
    content: 'An absolute masterpiece. The story, the characters, the world — everything comes together perfectly.',
    likes: 42,
    dislikes: 2,
    createdAt: '2024-01-20T14:00:00Z',
  },
  {
    id: 'r2',
    userId: 'user2',
    gameId: '1',
    rating: 4,
    content: 'Great game with some pacing issues in the middle. Still highly recommended.',
    likes: 18,
    dislikes: 3,
    createdAt: '2024-02-10T09:30:00Z',
  },
]

const mockComments: Comment[] = [
  {
    id: 'c1',
    reviewId: 'r1',
    userId: 'user2',
    content: 'Totally agree! One of the best RPGs ever made.',
    likes: 5,
    dislikes: 0,
    createdAt: '2024-01-21T08:00:00Z',
  },
]

const mockReactions: ReviewReaction[] = [
  { id: 'react1', userId: 'user2', targetType: 'review', targetId: 'r1', reaction: ReactionType.LIKE },
]

/**
 * Get reviews for a game (mock).
 */
export async function getReviewsByGame(gameId: string): Promise<Review[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockReviews.filter((r) => r.gameId === gameId)
}

/**
 * Get reviews for a mission (mock).
 */
export async function getReviewsByMission(missionId: string): Promise<Review[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockReviews.filter((r) => r.missionId === missionId)
}

/**
 * Get comments for a review (mock).
 */
export async function getCommentsByReview(reviewId: string): Promise<Comment[]> {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return mockComments.filter((c) => c.reviewId === reviewId)
}

/**
 * Create a new review (mock).
 */
export async function createReview(review: Omit<Review, 'id' | 'likes' | 'dislikes'>): Promise<Review> {
  await new Promise((resolve) => setTimeout(resolve, 250))
  const newReview: Review = {
    ...review,
    id: `r-${Date.now()}`,
    likes: 0,
    dislikes: 0,
    createdAt: new Date().toISOString(),
  }
  mockReviews.push(newReview)
  return newReview
}

/**
 * Toggle a reaction on a review or comment (mock).
 */
export async function toggleReaction(
  targetType: 'review' | 'comment',
  targetId: string,
  userId: string,
  reaction: ReactionType
): Promise<ReviewReaction> {
  await new Promise((resolve) => setTimeout(resolve, 200))

  const existing = mockReactions.find(
    (r) => r.targetType === targetType && r.targetId === targetId && r.userId === userId
  )

  if (existing) {
    // Toggle off if same reaction
    if (existing.reaction === reaction) {
      const index = mockReactions.indexOf(existing)
      mockReactions.splice(index, 1)
      return { ...existing, reaction: existing.reaction as never } as ReviewReaction
    }
    // Change reaction
    existing.reaction = reaction
    return existing
  }

  const newReaction: ReviewReaction = {
    id: `react-${Date.now()}`,
    userId,
    targetType,
    targetId,
    reaction,
    createdAt: new Date().toISOString(),
  }
  mockReactions.push(newReaction)
  return newReaction
}
