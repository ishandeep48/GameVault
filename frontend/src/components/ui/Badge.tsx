import { cn } from '@/utils/cn'
import type { GameStatus } from '@/types'
import { statusLabels, statusClasses } from '@/types/game'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'outline'
  size?: 'sm' | 'md'
}

/**
 * Generic badge for tags, labels, and metadata.
 */
export function Badge({ className, variant = 'default', size = 'sm', ...props }: BadgeProps) {
  const baseClasses = cn(
    'inline-flex items-center gap-1 font-medium rounded-full border',
    size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
  )

  const variantMap: Record<NonNullable<BadgeProps['variant']>, string> = {
    default: 'bg-gv-bg-tertiary text-gv-text-secondary border-white/[0.08]',
    secondary: 'bg-gv-accent/10 text-gv-accent border-gv-accent/20',
    outline: 'bg-transparent text-gv-text-secondary border-white/[0.15]',
  }

  return (
    <span className={cn(baseClasses, variantMap[variant], className)} {...props} />
  )
}

export interface StatusBadgeProps {
  status: GameStatus
  showIcon?: boolean
  className?: string
}

/**
 * Status badge with color + icon for game play states.
 */
export function StatusBadge({ status, showIcon = true, className }: StatusBadgeProps) {
  const label = statusLabels[status]
  const classes = statusClasses[status]

  return (
    <span className={cn('inline-flex items-center gap-1.5', classes, 'rounded-full px-2.5 py-0.5 text-xs font-medium border', className)}>
      {showIcon && (
        <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" aria-hidden="true" />
      )}
      {label}
    </span>
  )
}
