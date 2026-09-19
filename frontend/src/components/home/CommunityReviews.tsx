import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import type { CommunityReview as CommunityReviewType } from '@/services/homeService'
import { ReviewCard } from '@/components/reviews/ReviewCard'
import { Skeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'

export interface CommunityReviewsProps {
  reviews: CommunityReviewType[]
  loading?: boolean
  authRequired?: boolean
  onAuthRequired?: () => void
}

/**
 * Small selection of recent community reviews.
 */
export function CommunityReviews({ reviews, loading, authRequired = false, onAuthRequired }: CommunityReviewsProps) {
  if (loading) {
    return <CommunityReviewsSkeleton />
  }

  if (reviews.length === 0) {
    return (
      <EmptyState
        icon="message-square"
        title="No community reviews yet"
        description="Reviews from the community will appear here."
        className="py-8 md:py-12"
      />
    )
  }

  return (
    <section aria-label="Community Reviews">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gv-text-primary">Community Reviews</h2>
        <Link
          to="/community"
          className="inline-flex items-center gap-1 text-sm font-medium text-gv-accent hover:text-gv-accent-hover transition-colors"
        >
          View All
          <ChevronRight size={16} />
        </Link>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewCardWithContext key={review.id} review={review} authRequired={authRequired} onAuthRequired={onAuthRequired} />
        ))}
      </div>
    </section>
  )
}

interface ReviewCardWithContextProps {
  review: CommunityReviewType
  authRequired: boolean
  onAuthRequired?: () => void
}

function ReviewCardWithContext({ review, authRequired, onAuthRequired }: ReviewCardWithContextProps) {
  // Build context label (game or mission being reviewed)
  const contextParts: string[] = []
  if (review.gameTitle) contextParts.push(review.gameTitle)
  if (review.missionTitle) contextParts.push(review.missionTitle)

  return (
    <div>
      {/* Context link */}
      {contextParts.length > 0 && (
        <Link
          to={review.missionId ? `/games/${review.gameId}/missions/${review.missionId}` : review.gameId ? `/games/${review.gameId}` : '#'}
          className="inline-block text-xs font-medium text-gv-text-muted hover:text-gv-accent transition-colors mb-2"
        >
          {contextParts.join(' · ')}
        </Link>
      )}

      {/* Review card */}
      <ReviewCard
        username={review.username}
        avatarUrl={review.avatarUrl}
        rating={review.rating}
        content={review.content}
        createdAt={review.createdAt}
        likes={review.likes}
        dislikes={review.dislikes}
        authRequired={authRequired}
        onAuthRequired={onAuthRequired}
      />
    </div>
  )
}

/**
 * Skeleton loading state for the Community Reviews section.
 */
function CommunityReviewsSkeleton() {
  return (
    <section aria-label="Community Reviews" aria-busy="true">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-16" />
      </div>

      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card card-hover space-y-3">
            {/* Header */}
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="space-y-1.5 flex-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-white/[0.06]">
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-5 w-12" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
