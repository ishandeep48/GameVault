import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { GameStatus } from '@/types'
import { ContinuePlaying, LibrarySection, ActivityFeed, CommunityReviews, ProgressOverview } from '@/components/home'
import { ErrorState } from '@/components/ui/ErrorState'
import { LockedOverlay } from '@/components/ui/LockedOverlay'
import { useAuth } from '@/hooks/useAuth'
import * as homeService from '@/services/homeService'

type RecentlyPlayed = Awaited<ReturnType<typeof homeService.getRecentlyPlayedGame>> & { status: GameStatus } | null
type LibraryGames = Awaited<ReturnType<typeof homeService.getLibraryGames>>
type Activities = Awaited<ReturnType<typeof homeService.getRecentActivity>>
type CommunityReviewsData = Awaited<ReturnType<typeof homeService.getCommunityReviews>>
type ProgressStats = Awaited<ReturnType<typeof homeService.getProgressStats>>

/** Placeholder — Home Page */
export default function HomePage() {
  const navigate = useNavigate()
  const { authenticated, openLoginModal } = useAuth()
  const [recentlyPlayed, setRecentlyPlayed] = useState<RecentlyPlayed>(null)
  const [libraryGames, setLibraryGames] = useState<LibraryGames>([])
  const [activities, setActivities] = useState<Activities>([])
  const [communityReviews, setCommunityReviews] = useState<CommunityReviewsData>([])
  const [progressStats, setProgressStats] = useState<ProgressStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadData() {
      try {
        const [rp, lg, act, cr, ps] = await Promise.all([
          homeService.getRecentlyPlayedGame(),
          homeService.getLibraryGames(),
          homeService.getRecentActivity(),
          homeService.getCommunityReviews(),
          homeService.getProgressStats(),
        ])

        if (cancelled) return

        setRecentlyPlayed(rp ? { ...rp, status: rp.status as GameStatus } : null)
        setLibraryGames(lg)
        setActivities(act)
        setCommunityReviews(cr)
        setProgressStats(ps)
      } catch {
        if (!cancelled) {
          setError('Failed to load your home data')
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

  const handleRetry = async () => {
    setError(null)
    setLoading(true)

    try {
      const [rp, lg, act, cr, ps] = await Promise.all([
        homeService.getRecentlyPlayedGame(),
        homeService.getLibraryGames(),
        homeService.getRecentActivity(),
        homeService.getCommunityReviews(),
        homeService.getProgressStats(),
      ])

      setRecentlyPlayed(rp ? { ...rp, status: rp.status as GameStatus } : null)
      setLibraryGames(lg)
      setActivities(act)
      setCommunityReviews(cr)
      setProgressStats(ps)
    } catch {
      setError('Failed to load your home data')
    } finally {
      setLoading(false)
    }
  }

  const handleContinue = () => {
    if (recentlyPlayed?.game) {
      navigate(`/games/${recentlyPlayed.game.id}`)
    } else if (libraryGames.length > 0) {
      navigate(`/games/${libraryGames[0].game.id}`)
    }
  }

  const handleLogin = () => {
    openLoginModal('/home')
  }

  const handleSignup = () => {
    navigate('/signup', { state: { from: '/home' } })
  }

  return (
    <div className="px-4 md:px-6 py-6 space-y-8">
      {/* Error state */}
      {error && !loading ? (
        <ErrorState
          title="Couldn't load your games"
          description="Something went wrong while loading your library."
          retryLabel="Try again"
          onRetry={handleRetry}
          className="py-8 md:py-12"
        />
      ) : (
        <>
          {/* 1. Continue Playing — primary visual focus */}
          <div className="relative">
            <ContinuePlaying
              game={recentlyPlayed?.game ?? undefined}
              status={recentlyPlayed?.status}
              progress={recentlyPlayed?.progress}
              currentMission={recentlyPlayed?.currentMission}
              actTitle={recentlyPlayed?.actTitle}
              loading={loading || !authenticated}
              onContinue={handleContinue}
            />
            {!authenticated && (
              <LockedOverlay
                title="Login to Continue"
                description="Sign in to see your recently played games and continue where you left off."
                actionLabel="Login to Continue"
                secondaryActionLabel="Create Account"
                onAction={handleLogin}
                onSecondaryAction={handleSignup}
              />
            )}
          </div>

          {/* 2. Your Library */}
          <div className="relative">
            <LibrarySection
              games={libraryGames}
              loading={loading || !authenticated}
              onViewAll={() => navigate('/library')}
            />
            {!authenticated && (
              <LockedOverlay
                title="Login to Use the Library"
                description="Sign in to browse your personal game library."
                actionLabel="Login to Library"
                secondaryActionLabel="Create Account"
                onAction={handleLogin}
                onSecondaryAction={handleSignup}
              />
            )}
          </div>

          {/* 3 & 4. Activity + Reviews — side by side on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {authenticated && (
              <ActivityFeed
                activities={activities}
                loading={loading}
              />
            )}

            <CommunityReviews
              reviews={communityReviews}
              loading={loading}
              authRequired={!authenticated}
              onAuthRequired={handleLogin}
            />
          </div>

          {/* 5. Progress Overview — secondary (authenticated only) */}
          {authenticated && (
            <ProgressOverview
              stats={progressStats}
              loading={loading}
            />
          )}
        </>
      )}
    </div>
  )
}
