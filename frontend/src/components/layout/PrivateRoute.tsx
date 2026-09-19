import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

interface PrivateRouteProps {
  children: React.ReactNode
}

/**
 * Redirects unauthenticated users to /login.
 * Authenticated users visiting /login or /signup are redirected to /home.
 */
export function PrivateRoute({ children }: PrivateRouteProps) {
  const { authenticated } = useAuth()
  const location = useLocation()

  if (!authenticated) {
    // Preserve the intended destination for post-login redirect
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
