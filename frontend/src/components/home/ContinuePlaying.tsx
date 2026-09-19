import { Link } from 'react-router-dom'
import { Play, ChevronRight } from 'lucide-react'
import type { Game, GameStatus } from '@/types'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Button } from '@/components/ui/Button'
import { Skeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { cn } from '@/utils/cn'

export interface ContinuePlayingProps {
  game?: Game | null
  status?: GameStatus
  progress?: number
  currentMission?: string
  actTitle?: string
  loading?: boolean
  onContinue?: () => void
}

/**
 * Hero section showing the most recently played game.
 */
export function ContinuePlaying({
  game,
  status,
  progress = 0,
  currentMission,
  actTitle,
  loading,
  onContinue,
}: ContinuePlayingProps) {
  if (loading) {
    return <ContinuePlayingSkeleton />
  }

  // Empty state — no game currently being played
  if (!game) {
    return (
      <EmptyState
        icon="gamepad-2"
        title="Nothing in progress"
        description="Pick a game from your library and start playing."
        actionLabel="Browse Library"
        onAction={onContinue}
        className="py-8 md:py-12"
      />
    )
  }

  return (
    <section aria-label="Continue Playing">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gv-text-primary">Continue Playing</h2>
        {onContinue && (
          <Link
            to="/library"
            className="inline-flex items-center gap-1 text-sm font-medium text-gv-accent hover:text-gv-accent-hover transition-colors"
          >
            View All
            <ChevronRight size={16} />
          </Link>
        )}
      </div>

      <div className="relative rounded-gv-lg overflow-hidden bg-gv-bg-secondary border border-white/[0.06] group">
        {/* Background artwork */}
        <div className="relative aspect-[2/1] md:aspect-[3/1] lg:aspect-[4/1] overflow-hidden">
          {game.coverImage ? (
            <>
              <img
                src={game.coverImage}
                alt={`Cover art for ${game.title}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                loading="eager"
              />
              {/* Gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-gv-bg-primary via-gv-bg-primary/60 to-transparent" />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gv-bg-tertiary to-gv-bg-secondary" />
          )}

          {/* Content overlay */}
          <div className="absolute inset-0 flex items-end">
            <div className="p-5 md:p-8 w-full max-w-3xl">
              {/* Status badge */}
              {status && (
                <span className={cn(
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mb-3',
                  status === 'playing' && 'bg-status-playing/10 text-status-playing border border-status-playing/20',
                  status === 'completed' && 'bg-status-completed/10 text-status-completed border border-status-completed/20',
                  status === 'on_hold' && 'bg-status-on-hold/10 text-status-on-hold border border-status-on-hold/20',
                  status === 'dropped' && 'bg-status-dropped/10 text-status-dropped border border-status-dropped/20',
                  status === 'plan_to_play' && 'bg-status-plan-to-play/10 text-status-plan-to-play border border-status-plan-to-play/20',
                )}>
                  {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                </span>
              )}

              {/* Title */}
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gv-text-primary mb-2 tracking-tight">
                {game.title}
              </h3>

              {/* Act and mission info */}
              {(actTitle || currentMission) && (
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4 text-sm">
                  {actTitle && (
                    <span className="text-gv-text-secondary">{actTitle}</span>
                  )}
                  {currentMission && (
                    <span className="text-gv-text-muted">
                      Current: <span className="text-gv-text-primary">{currentMission}</span>
                    </span>
                  )}
                </div>
              )}

              {/* Progress */}
              <div className="flex items-center gap-3 mb-5 max-w-md">
                <ProgressBar value={progress} size="md" showLabel />
              </div>

              {/* Continue button */}
              {onContinue && (
                <Button onClick={onContinue} className="gap-2">
                  <Play size={18} fill="currentColor" />
                  Continue Playing
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Skeleton loading state for the Continue Playing section.
 */
function ContinuePlayingSkeleton() {
  return (
    <section aria-label="Continue Playing" aria-busy="true">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-4 w-16" />
      </div>

      <div className="relative rounded-gv-lg overflow-hidden bg-gv-bg-secondary border border-white/[0.06]">
        <div className="aspect-[2/1] md:aspect-[3/1] lg:aspect-[4/1] flex items-end p-5 md:p-8">
          <div className="space-y-3 w-full max-w-md">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-7 md:h-9 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex items-center gap-3 pt-2">
              <Skeleton className="h-3 flex-1 rounded-full" />
              <Skeleton className="h-4 w-10" />
            </div>
            <Skeleton className="h-10 w-40 mt-3" />
          </div>
        </div>
      </div>
    </section>
  )
}
