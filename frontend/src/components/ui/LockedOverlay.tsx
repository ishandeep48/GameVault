import { Lock } from 'lucide-react'
import { Button } from './Button'
import { cn } from '@/utils/cn'

export interface LockedOverlayProps {
  /** Text shown on the primary action button */
  actionLabel?: string
  /** Secondary text label (e.g. "or Create Account") */
  secondaryActionLabel?: string
  /** Called when primary action is clicked */
  onAction: () => void
  /** Called when secondary action is clicked (optional) */
  onSecondaryAction?: () => void
  /** Optional title shown above the lock icon */
  title?: string
  /** Optional description below the lock icon */
  description?: string
  /** Override overlay opacity */
  overlayOpacity?: number
  className?: string
}

/**
 * Reusable locked/overlay component for auth-gated sections.
 * Shows a translucent dark overlay with a lock icon and login CTA.
 */
export function LockedOverlay({
  actionLabel = 'Login',
  secondaryActionLabel,
  onAction,
  onSecondaryAction,
  title,
  description,
  overlayOpacity = 0.65,
  className,
}: LockedOverlayProps) {
  return (
    <div className={cn('absolute inset-0 z-10 flex items-center justify-center', className)}>
      {/* Translucent dark overlay — fills the positioned parent without changing layout */}
      <div
        className="absolute inset-0 pointer-events-none bg-gv-bg-primary"
        style={{ opacity: overlayOpacity }}
      />

      {/* Lock icon + text — interactive content on top of overlay */}
      <div className="relative z-10 pointer-events-auto flex flex-col items-center gap-3 px-6 text-center">
        <div className="w-14 h-14 rounded-full bg-gv-accent/10 border border-gv-accent/20 flex items-center justify-center">
          <Lock size={24} className="text-gv-accent" />
        </div>

        {title && (
          <h3 className="text-lg font-semibold text-gv-text-primary">{title}</h3>
        )}

        {description && (
          <p className="text-sm text-gv-text-secondary max-w-xs">{description}</p>
        )}

        {!title && !description && (
          <>
            <p className="text-base font-semibold text-gv-text-primary">Login to Continue</p>
            <p className="text-xs text-gv-text-muted">Sign in to access your personal data and progress.</p>
          </>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2 mt-1">
          <Button variant="primary" size="md" onClick={onAction}>
            {actionLabel}
          </Button>
          {secondaryActionLabel && onSecondaryAction && (
            <button
              type="button"
              onClick={onSecondaryAction}
              className="text-xs font-medium text-gv-text-muted hover:text-gv-accent transition-colors underline underline-offset-2"
            >
              {secondaryActionLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
