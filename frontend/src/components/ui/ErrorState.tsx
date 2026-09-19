import { cn } from '@/utils/cn'

interface ErrorStateProps {
  /** Error title */
  title?: string
  /** Error description */
  description?: string
  /** Retry button label */
  retryLabel?: string
  onRetry?: () => void
  className?: string
}

/**
 * Error state placeholder for when something goes wrong.
 */
export function ErrorState({
  title = 'Something went wrong',
  description,
  retryLabel = 'Try again',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-4 text-center', className)}>
      {/* Warning icon */}
      <svg
        className="w-16 h-16 mb-4 text-red-400/80"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gv-text-primary mb-1">{title}</h3>

      {/* Description */}
      {description && (
        <p className="text-sm text-gv-text-secondary max-w-sm mb-6">{description}</p>
      )}

      {/* Retry button */}
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="btn btn-primary"
        >
          {retryLabel}
        </button>
      )}
    </div>
  )
}
