import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Home, Library, Users, UserCircle, LogOut, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useAuth } from '@/hooks/useAuth'

interface SidebarItem {
  label: string
  href: string
  icon: React.ReactNode
  authRequired?: boolean
}

const sidebarItems: SidebarItem[] = [
  { label: 'Home', href: '/home', icon: <Home size={18} />, authRequired: false },
  { label: 'Library', href: '/library', icon: <Library size={18} />, authRequired: true },
  { label: 'Community', href: '/community', icon: <Users size={18} />, authRequired: false },
]

/**
 * Desktop sidebar navigation with user profile section.
 */
interface SidebarProps {
  collapsed: boolean
  onCollapsedChange: () => void
}

export function Sidebar({ collapsed, onCollapsedChange }: SidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { authenticated, user, logout } = useAuth()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  const initials = user ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase() : ''

  return (
    <aside
      className={cn(
        'hidden lg:flex shrink-0 flex-col border-r border-white/[0.1] bg-gv-bg-primary/60 backdrop-blur-xl shadow-[12px_0_32px_rgba(0,0,0,0.12)] transition-[width] duration-200 ease-out',
        collapsed ? 'lg:w-16' : 'lg:w-56 xl:w-60',
      )}
    >
      <div className={cn('flex h-14 items-center border-b border-white/[0.06]', collapsed ? 'justify-center' : 'justify-end px-2')}>
        <button
          type="button"
          onClick={onCollapsedChange}
          className="rounded-gv-sm p-2 text-gv-text-secondary transition-colors hover:bg-white/[0.08] hover:text-gv-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-gv-accent"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!collapsed}
          title={collapsed ? 'Expand menu' : 'Collapse menu'}
        >
          {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 px-2 space-y-0.5" aria-label="Sidebar navigation">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.href || (item.href !== '/home' && location.pathname.startsWith(item.href))

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center rounded-gv-sm px-3 py-2 text-sm font-medium transition-colors duration-150',
                collapsed ? 'justify-center' : 'gap-3',
                isActive
                  ? 'text-gv-text-primary bg-white/[0.08]'
                  : 'text-gv-text-secondary hover:text-gv-text-primary hover:bg-white/[0.05]',
              )}
              title={collapsed ? item.label : undefined}
            >
              {item.icon}
              <span className={cn(collapsed && 'sr-only')}>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-white/[0.06] p-2">
        {authenticated && user ? (
          <>
            <Link
              to="/profile"
              className={cn(
                'flex items-center rounded-gv-sm px-3 py-2 text-sm font-medium transition-colors duration-150',
                collapsed ? 'justify-center' : 'gap-3',
                location.pathname === '/profile'
                  ? 'text-gv-text-primary bg-white/[0.08]'
                  : 'text-gv-text-secondary hover:text-gv-text-primary hover:bg-white/[0.05]',
              )}
              title={collapsed ? 'Profile' : undefined}
            >
              <div className="w-7 h-7 rounded-full bg-gv-accent/20 text-gv-accent flex items-center justify-center font-medium text-xs shrink-0">
                {initials}
              </div>
              <span className={cn('truncate', collapsed && 'sr-only')}>{user.firstName} {user.lastName}</span>
            </Link>
            <button
              onClick={handleLogout}
              className={cn('flex w-full items-center rounded-gv-sm px-3 py-2 text-sm font-medium text-red-400 transition-colors duration-150 hover:bg-white/[0.05] hover:text-red-300', collapsed ? 'justify-center' : 'gap-3')}
              title={collapsed ? 'Logout' : undefined}
            >
              <LogOut size={18} />
              <span className={cn(collapsed && 'sr-only')}>Logout</span>
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className={cn('flex items-center rounded-gv-sm px-3 py-2 text-sm font-medium text-gv-text-secondary transition-colors duration-150 hover:bg-white/[0.05] hover:text-gv-text-primary', collapsed ? 'justify-center' : 'gap-3')}
            title={collapsed ? 'Sign In' : undefined}
          >
            <UserCircle size={18} />
            <span className={cn(collapsed && 'sr-only')}>Sign In</span>
          </Link>
        )}
      </div>
    </aside>
  )
}
