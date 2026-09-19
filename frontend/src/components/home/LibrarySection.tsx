import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import type { Game, GameStatus } from '@/types'
import { GameCard } from '@/components/games/GameCard'
import { Skeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'

export interface LibraryGameItem {
  game: Game
  status: GameStatus
  progress: number
  currentMission?: string
}

export interface LibrarySectionProps {
  games: LibraryGameItem[]
  loading?: boolean
  onViewAll?: () => void
}

/**
 * Compact library section showing a curated subset of games.
 */
export function LibrarySection({ games, loading, onViewAll }: LibrarySectionProps) {
  if (loading) {
    return <LibrarySectionSkeleton />
  }

  if (games.length === 0) {
    return (
      <EmptyState
        icon="gamepad-2"
        title="Your library is empty"
        description="Add your first game to start tracking your progress."
        className="py-8 md:py-12"
      />
    )
  }

  return (
    <section aria-label="Your Library">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gv-text-primary">Your Library</h2>
        {onViewAll && (
          <Link
            to="/library"
            className="inline-flex items-center gap-1 text-sm font-medium text-gv-accent hover:text-gv-accent-hover transition-colors"
          >
            View All
            <ChevronRight size={16} />
          </Link>
        )}
      </div>

      {/* Horizontal scrollable grid */}
      <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap md:overflow-visible">
        {games.map((item) => (
          <Link
            key={item.game.id}
            to={`/games/${item.game.id}`}
            className="shrink-0 w-[160px] sm:w-[180px]"
          >
            <GameCard
              game={item.game}
              status={item.status}
              progress={item.progress}
              currentMission={item.currentMission}
            />
          </Link>
        ))}
      </div>
    </section>
  )
}

/**
 * Skeleton loading state for the Library section.
 */
function LibrarySectionSkeleton() {
  return (
    <section aria-label="Your Library" aria-busy="true">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-4 w-16" />
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="shrink-0 w-[160px] sm:w-[180px]">
            <Skeleton className="aspect-[3/4] rounded-gv-md mb-2" />
            <Skeleton className="h-4 w-3/4 mb-1.5" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    </section>
  )
}
