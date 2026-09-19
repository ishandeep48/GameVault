import { cn } from '@/utils/cn'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Shape variant */
  variant?: 'rect' | 'circle' | 'rounded'
}

/**
 * Base skeleton block — subtle pulse animation.
 * Respects prefers-reduced-motion.
 */
export function Skeleton({ className, variant = 'rect', ...props }: SkeletonProps) {
  const shapeClasses = cn(
    'animate-pulse bg-gv-bg-tertiary shrink-0',
    variant === 'circle' && 'rounded-full',
    variant === 'rounded' && 'rounded-gv-sm',
    !variant && 'rounded-md',
  )

  return <div className={cn(shapeClasses, className)} {...props} />
}
