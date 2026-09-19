import { Link, useLocation } from 'react-router-dom'
import { Home, Library, Users, UserCircle } from 'lucide-react'
import { cn } from '@/utils/cn'

interface SidebarItem {
  label: string
  href: string
  icon: React.ReactNode
}

const sidebarItems: SidebarItem[] = [
  { label: 'Home', href: '/', icon: <Home size={18} /> },
  { label: 'Library', href: '/library', icon: <Library size={18} /> },
  { label: 'Community', href: '/community', icon: <Users size={18} /> },
]

/**
 * Collapsible sidebar for desktop navigation (lg+).
 * Hidden on smaller screens.
 */
export function Sidebar() {
  const location = useLocation()
  return (
    <aside className="hidden lg:flex lg:w-56 xl:w-60 shrink-0 flex-col border-r border-white/[0.06] bg-gv-bg-secondary/40">
      {/* Nav items */}
      <nav className="flex-1 py-4 px-2 space-y-0.5" aria-label="Sidebar navigation">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-gv-sm text-sm font-medium transition-colors duration-150',
                isActive
                  ? 'text-gv-text-primary bg-white/[0.08]'
                  : 'text-gv-text-secondary hover:text-gv-text-primary hover:bg-white/[0.05]',
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Profile section */}
      <div className="p-2 border-t border-white/[0.06]">
        <Link
          to="/profile/user1"
          className={cn(
            'flex items-center gap-3 px-3 py-2 rounded-gv-sm text-sm font-medium transition-colors duration-150',
            location.pathname.startsWith('/profile')
              ? 'text-gv-text-primary bg-white/[0.08]'
              : 'text-gv-text-secondary hover:text-gv-text-primary hover:bg-white/[0.05]',
          )}
        >
          <UserCircle size={18} />
          <span>Profile</span>
        </Link>
      </div>
    </aside>
  )
}
