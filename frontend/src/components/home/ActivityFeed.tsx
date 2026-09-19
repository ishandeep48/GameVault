import { Link } from 'react-router-dom'
import { CheckCircle2, Play, SquarePen, ArrowUpDown, MessageSquare } from 'lucide-react'
import type { ActivityItem as ActivityItemType } from '@/services/homeService'
import { Skeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { cn } from '@/utils/cn'

export interface ActivityFeedProps {
  activities: ActivityItemType[]
  loading?: boolean
}

/**
 * Lightweight activity feed showing recent user actions.
 */
export function ActivityFeed({ activities, loading }: ActivityFeedProps) {
  if (loading) {
    return <ActivityFeedSkeleton />
  }

  if (activities.length === 0) {
    return (
      <EmptyState
        icon="clipboard-list"
        title="No recent activity"
        description="Your activity will appear here as you play."
        className="py-8 md:py-12"
      />
    )
  }

  return (
    <section aria-label="Recent Activity">
      <h2 className="text-lg font-semibold text-gv-text-primary mb-4">Recent Activity</h2>

      <div className="space-y-0 divide-y divide-white/[0.06]">
        {activities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
    </section>
  )
}

interface ActivityItemProps {
  activity: ActivityItemType
}

function ActivityItem({ activity }: ActivityItemProps) {
  const iconMap = {
    mission_complete: { icon: CheckCircle2, color: 'text-status-playing' },
    game_start: { icon: Play, color: 'text-gv-accent' },
    status_change: { icon: ArrowUpDown, color: 'text-gv-text-secondary' },
    review_posted: { icon: MessageSquare, color: 'text-status-completed' },
    review_mission: { icon: SquarePen, color: 'text-gv-accent-secondary' },
  }

  const { icon: Icon, color } = iconMap[activity.type]

  return (
    <div className="flex items-start gap-3 py-3 first:pt-0 last:border-b-0">
      {/* Icon */}
      <div className={cn('mt-0.5 shrink-0', color)}>
        <Icon size={16} />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p className="text-sm text-gv-text-primary leading-snug">
          {activity.title}
        </p>
        {activity.gameTitle && (
          <Link
            to={`/games/${activity.gameId || ''}`}
            className="inline-block mt-0.5 text-xs text-gv-accent hover:underline"
          >
            {activity.gameTitle}
          </Link>
        )}
      </div>

      {/* Timestamp */}
      <span className="shrink-0 text-[11px] text-gv-text-muted whitespace-nowrap">
        {getTimeAgo(activity.timestamp)}
      </span>
    </div>
  )
}

/**
 * Skeleton loading state for the Activity feed.
 */
function ActivityFeedSkeleton() {
  return (
    <section aria-label="Recent Activity" aria-busy="true">
      <h2 className="text-lg font-semibold text-gv-text-primary mb-4">
        Recent Activity
      </h2>

      <div className="space-y-0 divide-y divide-white/[0.06]">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-start gap-3 py-3 first:pt-0 last:border-b-0">
            <Skeleton className="w-4 h-4 rounded-full shrink-0" />
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/**
 * Simple time-ago formatter.
 */
function getTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return 'Just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 86400)}h ago`

  const days = Math.floor(seconds / 86400)
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days}d ago`

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
