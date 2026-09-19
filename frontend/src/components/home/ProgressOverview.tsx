import { Gamepad2, CheckCircle2, Clock, PlusCircle } from 'lucide-react'
import type { ProgressStats } from '@/services/homeService'
import { Skeleton } from '@/components/ui/Skeleton'
import { cn } from '@/utils/cn'

export interface ProgressOverviewProps {
  stats: ProgressStats | null
  loading?: boolean
}

/**
 * Small progress overview showing game status counts.
 */
export function ProgressOverview({ stats, loading }: ProgressOverviewProps) {
  if (loading) {
    return <ProgressOverviewSkeleton />
  }

  if (!stats) {
    return null
  }

  const statItems: StatItem[] = [
    { label: 'Playing', value: stats.playing, icon: Gamepad2, color: 'text-status-playing' },
    { label: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'text-status-completed' },
    { label: 'On Hold', value: stats.onHold, icon: Clock, color: 'text-status-on-hold' },
    { label: 'Plan to Play', value: stats.planToPlay, icon: PlusCircle, color: 'text-[#6366F1]' },
  ]

  return (
    <section aria-label="Your Progress">
      <h2 className="text-lg font-semibold text-gv-text-primary mb-4">Your Progress</h2>

      {/* Status counts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {statItems.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </div>

      {/* Weekly missions */}
      {stats.missionsThisWeek > 0 && (
        <div className="flex items-center gap-2 text-sm text-gv-text-secondary">
          <CheckCircle2 size={16} className="text-status-playing shrink-0" />
          <span>
            <strong className="text-gv-text-primary">{stats.missionsThisWeek}</strong>{' '}
            missions completed this week
          </span>
        </div>
      )}
    </section>
  )
}

interface StatItem {
  label: string
  value: number
  icon: typeof Gamepad2
  color: string
}

function StatCard({ label, value, icon: Icon, color }: StatItem) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-gv-sm bg-gv-bg-secondary/50 border border-white/[0.06]">
      <Icon size={18} className={cn(color)} />
      <div>
        <p className="text-lg font-bold text-gv-text-primary leading-none">{value}</p>
        <p className="text-xs text-gv-text-muted mt-0.5">{label}</p>
      </div>
    </div>
  )
}

/**
 * Skeleton loading state for the Progress Overview section.
 */
function ProgressOverviewSkeleton() {
  return (
    <section aria-label="Your Progress" aria-busy="true">
      <h2 className="text-lg font-semibold text-gv-text-primary mb-4">
        Your Progress
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-gv-sm bg-gv-bg-secondary/50 border border-white/[0.06]">
            <Skeleton className="w-[18px] h-[18px] rounded" />
            <div>
              <Skeleton className="h-5 w-8 mb-1" />
              <Skeleton className="h-3 w-14" />
            </div>
          </div>
        ))}
      </div>

      <Skeleton className="h-4 w-48" />
    </section>
  )
}
