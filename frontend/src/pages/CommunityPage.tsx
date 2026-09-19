import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { ReviewCard } from '@/components/reviews/ReviewCard'
import { Skeleton } from '@/components/ui/Skeleton'
import { ErrorState } from '@/components/ui/ErrorState'
import { EmptyState } from '@/components/ui/EmptyState'
import { useAuth } from '@/hooks/useAuth'
import * as homeService from '@/services/homeService'

interface CommunityReviewItem {
  id: string
  userId: string
  username: string
  avatarUrl?: string
  gameId?: string
  gameTitle?: string
  missionId?: string
  missionTitle?: string
  rating: number
  content: string
  likes: number
  dislikes: number
  createdAt: string
}

/** Placeholder — Community Page */
export default function CommunityPage() {
  const { authenticated, openLoginModal } = useAuth()

  const [reviews, setReviews] = useState<CommunityReviewItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadData() {
      try {
        const data = await homeService.getCommunityReviews()
        if (cancelled) return
        setReviews(data)
      } catch {
        if (!cancelled) {
          setError('Failed to load community content')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadData()

    return () => {
      cancelled = true
    }
  }, [])

  const handleLogin = () => {
    openLoginModal('/community')
  }

  // Filter reviews by search query
  const filteredReviews = searchQuery.trim()
    ? reviews.filter((r) =>
        r.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.gameTitle && r.gameTitle.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : reviews

  return (
    <div className="px-4 md:px-6 py-6 space-y-6">
      {/* Page Header */}
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-gv-text-primary tracking-tight mb-1">Community</h1>
        <p className="text-sm text-gv-text-secondary">Browse reviews and discussions from other players.</p>
      </header>

      {/* Search bar */}
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gv-text-muted" />
        <input
          type="text"
          placeholder="Search reviews..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-gv-bg-secondary border border-white/[0.06] rounded-gv-sm text-sm text-gv-text-primary placeholder:text-gv-text-muted focus:outline-none focus:border-gv-accent/50 transition-colors"
          aria-label="Search reviews"
        />
      </div>

      {/* Error State */}
      {error && !loading ? (
        <ErrorState
          title="Couldn't load community content"
          description="Something went wrong while loading reviews."
          retryLabel="Try again"
          onRetry={() => window.location.reload()}
          className="py-8 md:py-12"
        />
      ) : (
        <>
          {/* Reviews list */}
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-32 w-full rounded-gv-md" />
              ))}
            </div>
          ) : filteredReviews.length === 0 ? (
            <EmptyState
              icon="message-square"
              title={searchQuery.trim() ? 'No reviews found' : 'No community reviews yet'}
              description={searchQuery.trim() ? `No reviews match "${searchQuery}".` : 'Reviews from the community will appear here.'}
              className="py-8 md:py-12"
            />
          ) : (
            <div className="space-y-4">
              {filteredReviews.map((review) => (
                <ReviewCardWithContext key={review.id} review={review} onLogin={handleLogin} authenticated={authenticated} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

interface ReviewCardWithContextProps {
  review: CommunityReviewItem
  onLogin: () => void
  authenticated: boolean
}

function ReviewCardWithContext({ review, onLogin, authenticated }: ReviewCardWithContextProps) {
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
        authRequired={!authenticated}
        onAuthRequired={onLogin}
      />
    </div>
  )
}
