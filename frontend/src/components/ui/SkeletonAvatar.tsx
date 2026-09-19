import { Skeleton } from './Skeleton'

export interface SkeletonAvatarProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap: Record<NonNullable<SkeletonAvatarProps['size']>, string> = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-14 h-14',
}

/**
 * Skeleton for avatar images.
 */
export function SkeletonAvatar({ size = 'md', className }: SkeletonAvatarProps) {
  return <Skeleton variant="circle" className={`${sizeMap[size]} ${className}`} />
}
