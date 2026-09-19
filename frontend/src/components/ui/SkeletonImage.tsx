import { Skeleton } from './Skeleton'

export interface SkeletonImageProps {
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'cover'
  className?: string
}

const aspectMap: Record<NonNullable<SkeletonImageProps['aspectRatio']>, string> = {
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-video',
  cover: 'aspect-[16/9]',
}

/**
 * Skeleton for image placeholders.
 */
export function SkeletonImage({ aspectRatio = 'square', className }: SkeletonImageProps) {
  return <Skeleton variant="rounded" className={`${aspectMap[aspectRatio]} ${className}`} />
}
