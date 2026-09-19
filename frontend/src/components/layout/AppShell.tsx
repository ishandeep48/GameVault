import { useLocation } from 'react-router-dom'
import { cn } from '@/utils/cn'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { MobileNavigation } from './MobileNavigation'
import { Breadcrumb } from './Breadcrumb'

interface AppShellProps {
  children: React.ReactNode
  className?: string
}

/**
 * Main application shell.
 * Desktop (lg+): Header + Sidebar + Content
 * Tablet (md-lg): Header + Content
 * Mobile (< md): Header + BottomNav + Content
 */
export function AppShell({ children, className }: AppShellProps) {
  const location = useLocation()

  // Determine if we're on a nested route that needs breadcrumbs
  const isNestedRoute = location.pathname.includes('/games/') && !location.pathname.endsWith('/')

  return (
    <div className="min-h-screen flex flex-col bg-gv-bg-primary">
      {/* Header — always visible */}
      <Header />

      <div className="flex flex-1 min-h-0">
        {/* Sidebar — desktop only (lg+) */}
        <Sidebar />

        {/* Main content area */}
        <main
          className={cn(
            'flex-1 min-w-0',
            isNestedRoute && 'pt-2', // space for breadcrumb on nested routes
            className,
          )}
        >
          {isNestedRoute && <Breadcrumb />}
          {children}
        </main>

        {/* Mobile navigation — mobile only (< lg) */}
        <MobileNavigation />
      </div>
    </div>
  )
}
