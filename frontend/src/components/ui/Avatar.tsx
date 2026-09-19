import { cn } from '@/utils/cn'

export interface AvatarProps {
  src?: string
  alt: string
  size?: 'sm' | 'md' | 'lg'
  fallback?: string
  className?: string
}

const sizeMap: Record<NonNullable<AvatarProps['size']>, string> = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-base',
}

/**
 * Avatar component with image or fallback initial.
 */
export function Avatar({ src, alt, size = 'md', fallback, className }: AvatarProps) {
  const [hasError, setHasError] = React.useState(false)

  const fallbackChar = fallback || alt?.[0]?.toUpperCase() || '?'

  return (
    <div
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center rounded-full bg-gv-bg-tertiary text-gv-text-secondary font-medium overflow-hidden',
        sizeMap[size],
        className,
      )}
    >
      {!hasError && src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <span aria-label={`Avatar for ${alt}`}>{fallbackChar}</span>
      )}
    </div>
  )
}

// Import React for useState usage
import * as React from 'react'
