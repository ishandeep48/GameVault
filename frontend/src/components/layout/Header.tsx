import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Gamepad2, Library, Users, LogOut, UserCircle, ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useAuth } from '@/hooks/useAuth'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  authRequired?: boolean
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/home', icon: <Gamepad2 size={18} />, authRequired: false },
  { label: 'Library', href: '/library', icon: <Library size={18} />, authRequired: true },
  { label: 'Community', href: '/community', icon: <Users size={18} />, authRequired: false },
]

/**
 * Application header with branding, desktop navigation, and user menu.
 */
export function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const { authenticated, user, logout } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close dropdown on navigation
  useEffect(() => {
    setDropdownOpen(false)
  }, [location.pathname])

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  const initials = user ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase() : ''

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-gv-bg-primary/80 backdrop-blur-lg">
      <div className="max-w-[1920px] mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2.5 shrink-0">
          <Gamepad2 size={22} className="text-gv-accent" />
          <span className="text-base font-bold text-gv-text-primary tracking-tight hidden sm:inline">
            GameVault
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href || (item.href !== '/home' && location.pathname.startsWith(item.href))

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

        {/* User area */}
        <div className="flex items-center gap-2" ref={dropdownRef}>
          {authenticated && user ? (
            <>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={cn(
                  'flex items-center gap-2 px-2 py-1.5 rounded-gv-sm transition-colors text-sm',
                  dropdownOpen
                    ? 'text-gv-text-primary bg-white/[0.08]'
                    : 'text-gv-text-secondary hover:text-gv-text-primary hover:bg-white/[0.05]',
                )}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                <div className="w-7 h-7 rounded-full bg-gv-accent/20 text-gv-accent flex items-center justify-center font-medium text-xs shrink-0">
                  {initials}
                </div>
                <span className="hidden md:inline">{user.firstName}</span>
                <ChevronDown size={14} className={cn('transition-transform', dropdownOpen && 'rotate-180')} />
              </button>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute right-4 top-full mt-2 w-48 bg-gv-bg-secondary border border-white/[0.06] rounded-gv-md shadow-lg overflow-hidden z-50">
                  <div className="px-3 py-2 border-b border-white/[0.06]">
                    <p className="text-sm font-medium text-gv-text-primary">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-gv-text-secondary truncate">{user.email}</p>
                  </div>
                  <div className="py-1">
                    {authenticated ? (
                      <Link
                        to="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gv-text-secondary hover:text-gv-text-primary hover:bg-white/[0.05] transition-colors"
                      >
                        <UserCircle size={16} />
                        Profile
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setDropdownOpen(false)
                          navigate('/login', { state: { from: '/profile' } })
                        }}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gv-text-secondary hover:text-gv-text-primary hover:bg-white/[0.05] transition-colors"
                      >
                        <UserCircle size={16} />
                        Profile
                      </button>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-white/[0.05] transition-colors"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <Link
              to="/login"
              className="text-sm font-medium text-gv-text-secondary hover:text-gv-text-primary transition-colors px-3 py-1.5 rounded-gv-sm hover:bg-white/[0.05]"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
