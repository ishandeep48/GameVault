import { cn } from '@/utils/cn'

export interface PageWrapperProps {
  children: React.ReactNode
  className?: string
  padded?: boolean
}

/**
 * Consistent page wrapper with responsive padding.
 */
export function PageWrapper({ children, className, padded = true }: PageWrapperProps) {
  return (
    <main className={cn(
      'flex-1 min-h-[calc(100vh-3.5rem)]',
      padded && 'px-4 md:px-6 py-6',
      className,
    )}>
      {children}
    </main>
  )
}
