import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Home, Library, Users, UserCircle, LogOut } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useAuth } from '@/hooks/useAuth'

interface NavItem {
  label: string
  href: string
  icon: typeof Home
  authRequired?: boolean
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/home', icon: Home, authRequired: false },
  { label: 'Library', href: '/library', icon: Library, authRequired: true },
  { label: 'Community', href: '/community', icon: Users, authRequired: false },
]

/**
 * Mobile bottom navigation bar.
 * Visible only on small screens (< lg).
 */
export function MobileNavigation() {
  const location = useLocation()
  const navigate = useNavigate()
  const { authenticated, logout } = useAuth()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

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
      {authenticated ? (
        <>
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href || (item.href !== '/home' && location.pathname.startsWith(item.href))

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

          {/* Profile */}
          <Link
            to="/profile"
            className={cn(
              'flex flex-col items-center gap-0.5 px-3 py-1 rounded-gv-sm transition-colors min-w-0',
              location.pathname === '/profile'
                ? 'text-gv-accent'
                : 'text-gv-text-secondary hover:text-gv-text-primary',
            )}
            aria-label="Profile"
          >
            <UserCircle size={20} strokeWidth={location.pathname === '/profile' ? 2.5 : 2} />
            <span className="text-[10px] font-medium leading-none">Profile</span>
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-gv-sm transition-colors min-w-0 text-gv-text-secondary hover:text-red-400"
            aria-label="Logout"
          >
            <LogOut size={20} />
            <span className="text-[10px] font-medium leading-none">Logout</span>
          </button>
        </>
      ) : (
        <>
          {/* Unauthenticated users can open Library's locked state. */}
          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                to={item.href}
                className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-gv-sm transition-colors min-w-0 text-gv-text-secondary hover:text-gv-text-primary"
                aria-label={item.label}
              >
                <Icon size={20} />
                <span className="text-[10px] font-medium leading-none">{item.label}</span>
              </Link>
            )
          })}

          {/* Sign In */}
          <button
            type="button"
            onClick={() => navigate('/login', { state: { from: location.pathname } })}
            className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-gv-sm transition-colors min-w-0 text-gv-text-secondary hover:text-gv-accent"
            aria-label="Sign in"
          >
            <UserCircle size={20} />
            <span className="text-[10px] font-medium leading-none">Sign In</span>
          </button>
        </>
      )}
    </nav>
  )
}
