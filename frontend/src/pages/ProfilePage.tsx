import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { useAuth } from '@/hooks/useAuth'

/**
 * Profile page — displays the authenticated user's information.
 */
export default function ProfilePage() {
  const navigate = useNavigate()
  const { authenticated, user, logout } = useAuth()

  // Redirect to login if not authenticated (should be handled by PrivateRoute, but safety net)
  if (!authenticated || !user) {
    navigate('/login', { replace: true })
    return null
  }

  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()

  // Format date of birth for display (YYYY-MM-DD → MM/DD/YYYY)
  function formatDob(dob: string): string {
    if (!dob) return 'Not provided'
    const parts = dob.split('-')
    if (parts.length !== 3) return dob
    return `${parts[1]}/${parts[2]}/${parts[0]}`
  }

  // Format member since date
  function formatMemberSince(dateStr: string): string {
    try {
      const date = new Date(dateStr)
      if (isNaN(date.getTime())) return 'Unknown'
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    } catch {
      return 'Unknown'
    }
  }

  return (
    <div className="px-4 md:px-6 py-6 space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gv-text-primary mb-1">Profile</h1>
        <p className="text-gv-text-secondary text-sm">Your account information</p>
      </div>

      {/* Profile card */}
      <Card className="max-w-2xl">
        <CardContent className="pt-6 md:pt-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            {/* Avatar */}
            <Avatar size="lg" alt={`${user.firstName} ${user.lastName}`} fallback={initials} />

            {/* User info */}
            <div className="flex-1 text-center sm:text-left space-y-1 min-w-0">
              <h2 className="text-xl font-bold text-gv-text-primary truncate">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gv-text-secondary text-sm truncate">{user.email}</p>
            </div>

            {/* Logout button */}
            <Button variant="danger" size="sm" onClick={() => { logout(); navigate('/login', { replace: true }) }}>
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Details grid */}
      <div className="max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DetailCard label="First Name" value={user.firstName} />
        <DetailCard label="Last Name" value={user.lastName} />
        <DetailCard label="Email" value={user.email} />
        <DetailCard label="Date of Birth" value={formatDob(user.dob)} />
        <DetailCard label="Member Since" value={formatMemberSince(user.createdAt)} />
      </div>

      {/* Security note */}
      <Card className="max-w-2xl bg-gv-bg-secondary/50">
        <CardContent className="pt-6 md:pt-6">
          <p className="text-xs text-gv-text-muted leading-relaxed">
            This is a mock authentication session. Your account data is stored locally in your browser and will be cleared when you log out. 
            The real authentication backend (FastAPI + PostgreSQL) is not yet connected.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

/**
 * Simple detail row component for profile information.
 */
function DetailCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="card bg-gv-bg-secondary border border-white/[0.06] p-4">
      <p className="text-xs text-gv-text-muted mb-1">{label}</p>
      <p className="text-sm font-medium text-gv-text-primary break-all">{value || '—'}</p>
    </div>
  )
}
