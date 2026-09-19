import { Link, useLocation } from 'react-router-dom'
import { Gamepad2, Library, Users, UserCircle } from 'lucide-react'
import { cn } from '@/utils/cn'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/', icon: <Gamepad2 size={18} /> },
  { label: 'Library', href: '/library', icon: <Library size={18} /> },
  { label: 'Community', href: '/community', icon: <Users size={18} /> },
]

/**
 * Application header with branding and desktop navigation.
 * Sticky top, glassmorphism background.
 * Mobile: logo + profile only (navigation via bottom bar).
 */
export function Header() {
  const location = useLocation()

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-gv-bg-primary/80 backdrop-blur-lg">
      <div className="max-w-[1920px] mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <Gamepad2 size={22} className="text-gv-accent" />
          <span className="text-base font-bold text-gv-text-primary tracking-tight hidden sm:inline">
            GameVault
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-2 px-3 py-1.5 rounded-gv-sm text-sm font-medium transition-colors duration-150',
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

        {/* Profile link */}
        <div className="flex items-center gap-1">
          <Link
            to="/profile/user1"
            className={cn(
              'p-2 rounded-gv-sm transition-colors',
              location.pathname.startsWith('/profile')
                ? 'text-gv-accent bg-white/[0.08]'
                : 'text-gv-text-secondary hover:text-gv-text-primary hover:bg-white/[0.05]',
            )}
            aria-label="User profile"
          >
            <UserCircle size={20} />
          </Link>
        </div>
      </div>
    </header>
  )
}
