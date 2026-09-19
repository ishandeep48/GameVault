import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ArrowUpDown } from 'lucide-react'
import type { GameStatus } from '@/types'
import { GameCard } from '@/components/games/GameCard'
import { LockedOverlay } from '@/components/ui/LockedOverlay'
import { useAuth } from '@/hooks/useAuth'

import { Skeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import * as libraryService from '@/services/libraryService'

type LibraryFilter = 'all' | GameStatus
type LibrarySort = 'recently_updated' | 'alphabetical' | 'progress'

const FILTERS: { key: LibraryFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'playing', label: 'Playing' },
  { key: 'on_hold', label: 'On Hold' },
  { key: 'dropped', label: 'Dropped' },
  { key: 'plan_to_play', label: 'Plan to Play' },
  { key: 'completed', label: 'Completed' },
]

const SORTS: { key: LibrarySort; label: string }[] = [
  { key: 'recently_updated', label: 'Recently Updated' },
  { key: 'alphabetical', label: 'Alphabetically' },
  { key: 'progress', label: 'Progress' },
]

/** Placeholder — Library Page */
export default function LibraryPage() {
  const navigate = useNavigate()
  const { authenticated, openLoginModal } = useAuth()
  const [userGames, setUserGames] = useState<libraryService.UserGame[]>([])
  const [_stats, setStats] = useState<{ total: number; byStatus: Record<GameStatus, number> } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<LibraryFilter>('all')
  const [sortBy, setSortBy] = useState<LibrarySort>('recently_updated')
  const [showSortMenu, setShowSortMenu] = useState(false)

  // Fetch data on mount
  useEffect(() => {
    let cancelled = false

    if (!authenticated) {
      setLoading(false)
      return () => {
        cancelled = true
      }
    }

    async function loadData() {
      try {
        const [games, libraryStats] = await Promise.all([
          libraryService.getUserGames(),
          libraryService.getLibraryStats(),
        ])

        if (cancelled) return

        setUserGames(games)
        setStats(libraryStats)
      } catch {
        if (!cancelled) {
          setError('Failed to load your library')
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
  }, [authenticated])

  // Filter and sort games (memoized for performance)
  const filteredGames = useMemo(() => {
    if (!userGames.length) return []
    return libraryService.filterAndSortUserGames(userGames, filter, searchQuery, sortBy)
  }, [userGames, filter, searchQuery, sortBy])

  // Determine which empty state to show
  const isEmptyLibrary = !loading && userGames.length === 0
  const isNoSearchResults = !loading && searchQuery.trim() !== '' && filteredGames.length === 0
  const isNoFilterResults = !loading && filter !== 'all' && userGames.length > 0 && filteredGames.length === 0

  // Handle retry
  const handleRetry = async () => {
    setError(null)
    setLoading(true)

    try {
      const [games, libraryStats] = await Promise.all([
        libraryService.getUserGames(),
        libraryService.getLibraryStats(),
      ])

      setUserGames(games)
      setStats(libraryStats)
    } catch {
      setError('Failed to load your library')
    } finally {
      setLoading(false)
    }
  }

  // Handle game card click
  const handleGameClick = (gameId: string) => {
    navigate(`/games/${gameId}`)
  }

  // Auth-gated actions
  const handleLogin = () => {
    openLoginModal('/library')
  }

  const handleSignup = () => {
    navigate('/signup', { state: { from: '/library' } })
  }

  if (!authenticated) {
    return (
      <div className="px-4 md:px-6 py-6 space-y-6">
        <header>
          <h1 className="text-2xl md:text-3xl font-bold text-gv-text-primary tracking-tight mb-1">Library</h1>
          <p className="text-sm text-gv-text-secondary">Your games, your progress.</p>
        </header>
        <div className="relative" aria-label="Library requires authentication">
          <LibraryLockedSkeleton />
          <LockedOverlay
            title="Please Login to Use the Library"
            description="Sign in to access your personal game library and track your progress."
            actionLabel="Login"
            secondaryActionLabel="Create an Account"
            onAction={handleLogin}
            onSecondaryAction={handleSignup}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 md:px-6 py-6 space-y-6">
      {/* Page Header */}
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-gv-text-primary tracking-tight mb-1">Library</h1>
        <p className="text-sm text-gv-text-secondary">Your games, your progress.</p>
      </header>

      {/* Error State */}
      {error && !loading ? (
        <ErrorState
          title="Couldn't load your library"
          description="Something went wrong while loading your games."
          retryLabel="Try again"
          onRetry={handleRetry}
          className="py-8 md:py-12"
        />
      ) : (
        <>
          {/* Search + Filters Bar */}
          <div className="space-y-3">
            {/* Search bar */}
            <div className="relative max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gv-text-muted" />
              <input
                type="text"
                placeholder="Search your library..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-gv-bg-secondary border border-white/[0.06] rounded-gv-sm text-sm text-gv-text-primary placeholder:text-gv-text-muted focus:outline-none focus:border-gv-accent/50 transition-colors"
                aria-label="Search your library"
              />
            </div>

            {/* Filters + Sort */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Status filter pills */}
              <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by status">
                {FILTERS.map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setFilter(f.key)}
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      filter === f.key
                        ? 'bg-gv-accent/10 text-gv-accent border border-gv-accent/20'
                        : 'bg-gv-bg-secondary text-gv-text-muted border border-white/[0.06] hover:text-gv-text-primary hover:border-white/[0.1]'
                    }`}
                    aria-pressed={filter === f.key}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Sort dropdown */}
              <div className="relative ml-auto">
                <button
                  type="button"
                  onClick={() => setShowSortMenu(!showSortMenu)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-gv-sm text-xs font-medium bg-gv-bg-secondary text-gv-text-muted border border-white/[0.06] hover:text-gv-text-primary transition-colors"
                  aria-expanded={showSortMenu}
                  aria-haspopup="listbox"
                >
                  <ArrowUpDown size={12} />
                  Sort
                </button>

                {showSortMenu && (
                  <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 z-40" onClick={() => setShowSortMenu(false)} />

                    {/* Dropdown menu */}
                    <div
                      className="absolute right-0 top-full mt-1 w-48 bg-gv-bg-secondary border border-white/[0.08] rounded-gv-sm shadow-lg z-50 overflow-hidden"
                      role="listbox"
                      aria-label="Sort options"
                    >
                      {SORTS.map((s) => (
                        <button
                          key={s.key}
                          type="button"
                          onClick={() => {
                            setSortBy(s.key)
                            setShowSortMenu(false)
                          }}
                          className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                            sortBy === s.key
                              ? 'bg-gv-accent/10 text-gv-accent'
                              : 'text-gv-text-secondary hover:bg-gv-bg-tertiary hover:text-gv-text-primary'
                          }`}
                          role="option"
                          aria-selected={sortBy === s.key}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Game count */}
            <p className="text-xs text-gv-text-muted">
              {filteredGames.length} game{filteredGames.length !== 1 ? 's' : ''}
              {searchQuery.trim() && (
                <>
                  {' '}— matching &ldquo;{searchQuery}&rdquo;
                </>
              )}
            </p>
          </div>

          {/* Empty Library */}
          {isEmptyLibrary ? (
            <EmptyState
              icon="gamepad-2"
              title="Your library is empty"
              description="Add games to start tracking your collection."
              className="py-8 md:py-12"
            />
          ) : isNoSearchResults ? (
            /* No search results */
            <EmptyState
              icon="search-x"
              title="No games found"
              description={`No games match &ldquo;${searchQuery}&rdquo;`}
              className="py-8 md:py-12"
            />
          ) : isNoFilterResults ? (
            /* No games for selected status */
            <EmptyState
              icon="gamepad-2"
              title={`No ${filter.replace(/_/g, ' ')} games yet`}
              description={
                filter === 'completed'
                  ? 'Games you complete will appear here.'
                  : `Games with this status will appear here.`
              }
              className="py-8 md:py-12"
            />
          ) : (
            /* Game Grid */
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
              {filteredGames.map((ug) => (
                <GameCard
                  key={ug.game.id}
                  game={ug.game}
                  status={ug.status}
                  progress={ug.progress}
                  currentMission={ug.currentMission}
                  onClick={() => handleGameClick(ug.game.id)}
                />
              ))}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                {[...Array(10)].map((_, i) => (
                  <SkeletonGameCard key={i} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}

/**
 * Skeleton loading state for a single game card.
 */
function SkeletonGameCard() {
  return (
    <div className="rounded-gv-md overflow-hidden bg-gv-bg-secondary border border-white/[0.06]">
      {/* Cover image skeleton */}
      <Skeleton className="aspect-[3/4]" />

      {/* Content skeleton */}
      <div className="p-3 md:p-4 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="h-1.5 w-full mt-3 rounded-full" />
      </div>
    </div>
  )
}

function LibraryLockedSkeleton() {
  return (
    <div className="space-y-6" aria-hidden="true">
      <div className="space-y-3">
        <Skeleton className="h-10 max-w-md" />
        <div className="flex flex-wrap gap-2">
          {[...Array(5)].map((_, index) => <Skeleton key={index} className="h-8 w-20 rounded-full" />)}
        </div>
        <Skeleton className="h-3 w-20" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
        {[...Array(10)].map((_, index) => <SkeletonGameCard key={index} />)}
      </div>
    </div>
  )
}
