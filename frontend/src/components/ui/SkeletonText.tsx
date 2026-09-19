import { cn } from '@/utils/cn'
import { Skeleton } from './Skeleton'

export interface SkeletonTextProps {
  lines?: number
  width?: string // Tailwind width class, e.g., 'w-full', 'w-3/4', 'w-1/2'
  className?: string
}

/**
 * Skeleton for text content — one or more horizontal bars.
 */
export function SkeletonText({ lines = 1, width = 'w-full', className }: SkeletonTextProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} variant="rect" className={`${width} h-4`} />
      ))}
    </div>
  )
}
