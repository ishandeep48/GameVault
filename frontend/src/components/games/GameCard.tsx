import type { Game, GameStatus } from '@/types'
import { StatusBadge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { cn } from '@/utils/cn'

export interface GameCardProps {
  game: Game
  status?: GameStatus
  progress?: number // 0-100
  currentMission?: string // mission title
  onClick?: () => void
  className?: string
}

/**
 * Reusable game card for library display.
 * Receives all data through props — no internal fetching.
 */
export function GameCard({
  game,
  status,
  progress = 0,
  currentMission,
  onClick,
  className,
}: GameCardProps) {
  const isInteractive = !!onClick

  return (
    <div
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={isInteractive ? onClick : undefined}
      onKeyDown={isInteractive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.() } } : undefined}
      className={cn(
        'group relative rounded-gv-md overflow-hidden bg-gv-bg-secondary border border-white/[0.06] transition-all duration-200',
        isInteractive && 'cursor-pointer hover:bg-gv-bg-tertiary hover:border-white/[0.1]',
        className,
      )}
    >
      {/* Cover image area */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gv-bg-tertiary">
        {game.coverImage ? (
          <img
            src={game.coverImage}
            alt={`Cover art for ${game.title}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gv-text-muted">
            <svg className="w-12 h-12 opacity-40" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 2a3 3 0 00-3 3v14a3 3 0 003 3h12a3 3 0 003-3V5a3 3 0 00-3-3H6z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-1.5a1.5 1.5 0 013 0V17M9 13a1.5 1.5 0 013 0m-6 4h12" />
            </svg>
          </div>
        )}

        {/* Status badge overlay */}
        {status && (
          <div className="absolute top-2 left-2">
            <StatusBadge status={status} showIcon={false} />
          </div>
        )}
      </div>

      {/* Content area */}
      <div className="p-3 md:p-4">
        {/* Title */}
        <h3 className="text-sm font-semibold text-gv-text-primary line-clamp-2 leading-snug mb-1.5 group-hover:text-white transition-colors">
          {game.title}
        </h3>

        {/* Genres */}
        {game.genres.length > 0 && (
          <p className="text-xs text-gv-text-muted line-clamp-1">{game.genres.slice(0, 2).join(' · ')}</p>
        )}

        {/* Progress bar */}
        {(progress !== undefined || currentMission) && (
          <div className="mt-3 space-y-1.5">
            <ProgressBar value={progress} size="sm" showLabel={false} />
            {currentMission && (
              <p className="text-xs text-gv-text-secondary truncate">
                Current: <span className="text-gv-text-primary">{currentMission}</span>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
