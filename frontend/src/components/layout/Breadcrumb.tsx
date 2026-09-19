import { Link, useLocation } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/utils/cn'

interface BreadcrumbItem {
  label: string
  href?: string
}

/**
 * Parse route path into meaningful breadcrumb items.
 */
function getBreadcrumbItems(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean)
  const items: BreadcrumbItem[] = []

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]
    const isGameId = i === 1 && segments[0] === 'games'
    const isMissionId = i === 2 && segments[0] === 'games' && segments[1] !== 'missions'

    if (isGameId) {
      items.push({ label: `Game ${segment.slice(0, 8)}...`, href: `/games/${segment}` })
    } else if (isMissionId) {
      items.push({ label: `Mission ${segment.slice(0, 8)}...`, href: undefined })
    } else if (i === 0 && segment === 'games') {
      items.push({ label: 'Games', href: '/library' })
    } else if (i === 0 && segment === 'profile') {
      const userId = segments[1]
      items.push({ label: `Profile${userId ? ` (${userId.slice(0, 8)}...)` : ''}`, href: `/profile/${userId}` })
    } else if (segment === 'community') {
      items.push({ label: 'Community', href: '/community' })
    } else {
      // Capitalize and add as generic segment
      const label = segment.charAt(0).toUpperCase() + segment.slice(1)
      const href = i < segments.length - 1 ? `/${segments.slice(0, i + 1).join('/')}` : undefined
      items.push({ label, href })
    }
  }

  // Always start with Home
  if (items.length === 0 || items[0].label !== 'Home') {
    items.unshift({ label: 'Home', href: '/' })
  }

  return items
}

interface BreadcrumbProps {
  className?: string
}

/**
 * Breadcrumb navigation for nested routes.
 * Shows a compact trail of links with chevron separators.
 */
export function Breadcrumb({ className }: BreadcrumbProps) {
  const location = useLocation()
  const items = getBreadcrumbItems(location.pathname)

  // Don't show on root or non-nested routes
  if (items.length <= 1 || !location.pathname.includes('/')) {
    return null
  }

  return (
    <nav
      className={cn(
        'flex items-center gap-1.5 px-4 md:px-6 py-2 text-xs',
        className,
      )}
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => (
        <div key={`${item.label}-${index}`} className="flex items-center gap-1.5">
          {index > 0 && (
            <ChevronRight size={12} className="text-gv-text-muted shrink-0" aria-hidden="true" />
          )}
          {item.href ? (
            <Link
              to={item.href}
              className={cn(
                'font-medium transition-colors',
                index === items.length - 1
                  ? 'text-gv-text-primary'
                  : 'text-gv-text-secondary hover:text-gv-text-primary',
              )}
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gv-text-primary font-medium" aria-current="page">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}
