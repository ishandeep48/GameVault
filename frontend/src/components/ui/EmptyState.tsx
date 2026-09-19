import { cn } from '@/utils/cn'

interface EmptyStateProps {
  /** Icon to display (Lucide icon name) */
  icon?: 'inbox' | 'gamepad-2' | 'search-x' | 'clipboard-list' | 'book-open' | 'message-square'
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

/**
 * Empty state placeholder for when there's no data to display.
 */
export function EmptyState({
  icon = 'inbox',
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  // Simple inline SVG icons instead of importing Lucide for this placeholder
  const icons: Record<string, string> = {
    inbox: 'M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z',
    'gamepad-2': 'M6 9H4.5a2.5 2.5 0 0 1 0-5H7',
    'search-x': 'M18 13l-6-6M2 11h8M12 11h10',
    'clipboard-list': 'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2',
    'book-open': 'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2Z',
    'message-square': 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  }

  const iconPath = icons[icon] || icons['inbox']

  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-4 text-center', className)}>
      {/* Icon */}
      <svg
        className="w-16 h-16 mb-4 text-gv-text-muted"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={iconPath} />
      </svg>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gv-text-primary mb-1">{title}</h3>

      {/* Description */}
      {description && (
        <p className="text-sm text-gv-text-secondary max-w-sm mb-6">{description}</p>
      )}

      {/* Action button */}
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="btn btn-primary"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
