import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, MapPin, Plus } from 'lucide-react'
import type { Game, Mission, Act, Review } from '@/types'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Tabs } from '@/components/ui/Tabs'
import { ReviewCard } from '@/components/reviews/ReviewCard'
import { MissionRow } from '@/components/missions/MissionRow'
import { Skeleton } from '@/components/ui/Skeleton'
import { ErrorState } from '@/components/ui/ErrorState'
import { EmptyState } from '@/components/ui/EmptyState'
import { useAuth } from '@/hooks/useAuth'
import * as gamesService from '@/services/games'
import * as missionsService from '@/services/missions'
import * as reviewsService from '@/services/reviews'

/** Placeholder — Game Details Page (Phase 5) */
export default function GameDetailsPage() {
  const { gameId } = useParams<{ gameId: string }>()
  const navigate = useNavigate()
  const { authenticated, openLoginModal } = useAuth()

  const [game, setGame] = useState<Game | null>(null)
  const [missions, setMissions] = useState<Mission[]>([])
  const [acts, setActs] = useState<Act[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadData() {
      if (!gameId) return
      try {
        const [g, m, a, r] = await Promise.all([
          gamesService.getGameById(gameId),
          missionsService.getMissionsByGame(gameId),
          missionsService.getActsByGame(gameId),
          reviewsService.getReviewsByGame(gameId),
        ])

        if (cancelled) return

        setGame(g ?? null)
        setMissions(m)
        setActs(a)
        setReviews(r)
      } catch {
        if (!cancelled) {
          setError('Failed to load game details')
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
  }, [gameId])

  const handleLogin = () => {
    openLoginModal(`/games/${gameId}`)
  }

  if (error && !loading) {
    return (
      <ErrorState
        title="Couldn't load game details"
        description="Something went wrong while loading this game."
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
        <div className="space-y-6">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-40 w-full rounded-gv-lg" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-36" />
            </div>
          </div>
        </div>
      ) : game ? (
        <>
          {/* Game Header */}
          <header className="space-y-3">
            <h1 className="text-2xl md:text-3xl font-bold text-gv-text-primary tracking-tight">{game.title}</h1>

            {/* Metadata row */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-gv-text-secondary">
              {game.releaseDate && (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={14} />
                  {new Date(game.releaseDate).getFullYear()}
                </span>
              )}
              {game.developer && (
                <span>{game.developer}</span>
              )}
              {game.genres.map((genre) => (
                <Badge key={genre} variant="secondary" size="sm">{genre}</Badge>
              ))}
            </div>

            {/* Platforms */}
            {game.platforms && game.platforms.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 text-xs text-gv-text-muted">
                <MapPin size={12} />
                {game.platforms.map((p) => (
                  <span key={p}>{p}</span>
                ))}
              </div>
            )}

            {/* Add to Library button */}
            <Button
              variant="secondary"
              size="sm"
              onClick={authenticated ? () => {} : handleLogin}
              className="gap-1.5"
            >
              <Plus size={14} />
              {authenticated ? 'Add to Library' : 'Login to Add to Library'}
            </Button>
          </header>

          {/* Description */}
          {game.description && (
            <div className="max-w-3xl">
              <p className="text-sm text-gv-text-secondary leading-relaxed">{game.description}</p>
            </div>
          )}

          {/* Tabs: Missions | Reviews */}
          <Tabs
            tabs={[
              {
                id: 'missions',
                label: `Missions (${missions.length})`,
                content: loading ? (
                  <div className="space-y-3 py-4">
                    {[...Array(3)].map((_, i) => (
                      <Skeleton key={i} className="h-12 w-full rounded-gv-sm" />
                    ))}
                  </div>
                ) : missions.length === 0 ? (
                  <EmptyState
                    icon="gamepad-2"
                    title="No missions yet"
                    description="Missions for this game will appear here."
                    className="py-8 md:py-12"
                  />
                ) : acts.length > 0 ? (
                  /* Grouped by act */
                  <div className="space-y-6 py-4">
                    {acts.map((act) => {
                      const actMissions = missions.filter((m) => m.actOrder === act.order).sort((a, b) => a.order - b.order)
                      if (actMissions.length === 0) return null
                      return (
                        <div key={act.id}>
                          <h3 className="text-sm font-semibold text-gv-text-primary mb-2">{act.title}</h3>
                          <div className="space-y-1">
                            {actMissions.map((mission) => (
                              <Link
                                key={mission.id}
                                to={`/games/${gameId}/missions/${mission.id}`}
                                className="block"
                              >
                              <MissionRow {...mission} />
                              </Link>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  /* Flat list */
                  <div className="space-y-1 py-4">
                    {missions.sort((a, b) => a.order - b.order).map((mission) => (
                      <Link key={mission.id} to={`/games/${gameId}/missions/${mission.id}`}>
                        <MissionRow {...mission} />
                      </Link>
                    ))}
                  </div>
                ),
              },
              {
                id: 'reviews',
                label: `Reviews (${reviews.length})`,
                content: loading ? (
                  <div className="space-y-4 py-4">
                    {[...Array(2)].map((_, i) => (
                      <Skeleton key={i} className="h-32 w-full rounded-gv-md" />
                    ))}
                  </div>
                ) : reviews.length === 0 ? (
                  <EmptyState
                    icon="message-square"
                    title="No reviews yet"
                    description="Reviews for this game will appear here."
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
                ),
              },
            ]}
            defaultActive="missions"
            className="mt-6"
          />
        </>
      ) : (
        /* Game not found */
        <EmptyState
          icon="search-x"
          title="Game not found"
          description={`No game with ID "${gameId}" was found.`}
          className="py-8 md:py-12"
        />
      )}
    </div>
  )
}
