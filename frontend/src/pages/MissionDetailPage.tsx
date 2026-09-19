import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { ReviewCard } from '@/components/reviews/ReviewCard'
import { Skeleton } from '@/components/ui/Skeleton'
import { ErrorState } from '@/components/ui/ErrorState'
import { EmptyState } from '@/components/ui/EmptyState'
import { useAuth } from '@/hooks/useAuth'
import type { Mission, Review } from '@/types'
import * as missionsService from '@/services/missions'
import * as gamesService from '@/services/games'
import * as reviewsService from '@/services/reviews'

/** Placeholder — Mission Detail Page (Phase 7) */
export default function MissionDetailPage() {
  const { gameId, missionId } = useParams<{ gameId: string; missionId: string }>()
  const navigate = useNavigate()
  const { authenticated, openLoginModal } = useAuth()

  const [mission, setMission] = useState<Mission | null>(null)
  const [gameTitle, setGameTitle] = useState<string>('')
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadData() {
      if (!missionId || !gameId) return
      try {
        const [m, r] = await Promise.all([
          missionsService.getMissionById(missionId),
          reviewsService.getReviewsByMission(missionId),
        ])

        // Also fetch game title for breadcrumb context
        const game = await gamesService.getGameById(gameId)

        if (cancelled) return

        setMission(m ?? null)
        setGameTitle(game?.title || `Game ${gameId}`)
        setReviews(r)
      } catch {
        if (!cancelled) {
          setError('Failed to load mission details')
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
  }, [missionId, gameId])

  const handleLogin = () => {
    openLoginModal(`/games/${gameId}/missions/${missionId}`)
  }

  if (error && !loading) {
    return (
      <ErrorState
        title="Couldn't load mission details"
        description="Something went wrong while loading this mission."
        retryLabel="Try again"
        onRetry={() => window.location.reload()}
        className="py-8 md:py-12"
      />
    )
  }

  return (
    <div className="px-4 md:px-6 py-6 space-y-6">
      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gv-text-secondary hover:text-gv-text-primary transition-colors mb-2"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      {loading ? (
        /* Skeleton */
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        </div>
      ) : mission ? (
        <>
          {/* Mission Header */}
          <header className="space-y-2">
            <Link
              to={`/games/${gameId}`}
              className="inline-block text-xs font-medium text-gv-accent hover:underline"
            >
              {gameTitle}
            </Link>

            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-bold text-gv-text-primary tracking-tight">{mission.title}</h1>
              {mission.completed ? (
                <Badge variant="secondary" size="sm" className="gap-1">
                  <CheckCircle2 size={12} /> Completed
                </Badge>
              ) : (
                <Badge variant="outline" size="sm" className="text-gv-text-muted">In Progress</Badge>
              )}
            </div>

            {mission.description && (
              <p className="text-sm text-gv-text-secondary leading-relaxed">{mission.description}</p>
            )}
          </header>

          {/* Reviews Section */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gv-text-primary">Mission Reviews</h2>

            {loading ? (
              <div className="space-y-4 py-4">
                {[...Array(2)].map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full rounded-gv-md" />
                ))}
              </div>
            ) : reviews.length === 0 ? (
              <EmptyState
                icon="message-square"
                title="No reviews yet"
                description="Reviews for this mission will appear here."
                className="py-8 md:py-12"
              />
            ) : (
              <div className="space-y-4 py-4">
                {reviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    username={`User ${review.userId.slice(0, 4)}`}
                    rating={review.rating}
                    content={review.content}
                    createdAt={review.createdAt ?? ''}
                    likes={review.likes}
                    dislikes={review.dislikes}
                    authRequired={!authenticated}
                    onAuthRequired={handleLogin}
                  />
                ))}
              </div>
            )}
          </section>
        </>
      ) : (
        /* Mission not found */
        <EmptyState
          icon="search-x"
          title="Mission not found"
          description={`No mission with ID "${missionId}" was found.`}
          className="py-8 md:py-12"
        />
      )}
    </div>
  )
}
