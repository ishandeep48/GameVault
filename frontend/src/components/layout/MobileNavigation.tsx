import { Link, useLocation } from 'react-router-dom'
import { Home, Library, Users, UserCircle } from 'lucide-react'
import { cn } from '@/utils/cn'

interface NavItem {
  label: string
  href: string
  icon: typeof Home
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Library', href: '/library', icon: Library },
  { label: 'Community', href: '/community', icon: Users },
]

/**
 * Mobile bottom navigation bar.
 * Visible only on small screens (< lg).
 * Provides quick access to main sections with active state indication.
 */
export function MobileNavigation() {
  const location = useLocation()

  return (
    <nav
      className={cn(
        'lg:hidden sticky bottom-0 z-30',
        'border-t border-white/[0.06]',
        'bg-gv-bg-secondary/95 backdrop-blur-lg',
        'flex items-center justify-around py-2 px-1',
      )}
      aria-label="Mobile navigation"
    >
      {navItems.map((item) => {
        const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href))
        const Icon = item.icon

        return (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              'flex flex-col items-center gap-0.5 px-3 py-1 rounded-gv-sm transition-colors min-w-0',
              isActive
                ? 'text-gv-accent'
                : 'text-gv-text-secondary hover:text-gv-text-primary',
            )}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium leading-none">{item.label}</span>
          </Link>
        )
      })}

      {/* Profile — separate from main nav items */}
      <Link
        to="/profile/user1"
        className={cn(
          'flex flex-col items-center gap-0.5 px-3 py-1 rounded-gv-sm transition-colors min-w-0',
          location.pathname.startsWith('/profile')
            ? 'text-gv-accent'
            : 'text-gv-text-secondary hover:text-gv-text-primary',
        )}
        aria-label="Profile"
      >
        <UserCircle size={20} strokeWidth={location.pathname.startsWith('/profile') ? 2.5 : 2} />
        <span className="text-[10px] font-medium leading-none">Profile</span>
      </Link>
    </nav>
  )
}
