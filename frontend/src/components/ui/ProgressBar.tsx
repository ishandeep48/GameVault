import { cn } from '@/utils/cn'

export interface ProgressBarProps {
  value: number // 0-100
  max?: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  label?: string
  color?: 'default' | 'success' | 'warning' | 'danger'
  className?: string
}

const heightMap: Record<NonNullable<ProgressBarProps['size']>, string> = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
}

const colorMap: Record<NonNullable<ProgressBarProps['color']>, string> = {
  default: 'bg-gv-accent',
  success: 'bg-status-playing',
  warning: 'bg-status-on-hold',
  danger: 'bg-status-dropped',
}

/**
 * Accessible progress bar with percentage label.
 */
export function ProgressBar({
  value,
  max = 100,
  size = 'md',
  showLabel = true,
  label,
  color = 'default',
  className,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className={cn('w-full', className)}>
      {(label || showLabel) && (
        <div className="flex justify-between items-center mb-1.5">
          {label ? (
            <span className="text-sm font-medium text-gv-text-primary">{label}</span>
          ) : null}
          {showLabel && (
            <span className="text-xs font-mono text-gv-text-secondary" aria-live="polite">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={cn('w-full bg-gv-bg-tertiary rounded-full overflow-hidden', heightMap[size])}
      >
        <div
          className={cn('h-full rounded-full transition-all duration-300 ease-out', colorMap[color])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
