import { Routes, Route, Navigate } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { PrivateRoute } from '@/components/layout/PrivateRoute'

// Pages (Phase 0+)
import HomePage from './pages/HomePage'
import LibraryPage from './pages/LibraryPage'
import GameDetailsPage from './pages/GameDetailsPage'
import MissionDetailPage from './pages/MissionDetailPage'
import ProfilePage from './pages/ProfilePage'
import CommunityPage from './pages/CommunityPage'

// Auth pages (Phase: Authentication)
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import { LoginModal } from '@/components/auth/LoginModal'

function App() {
  return (
    <AppShell>
      <Routes>
        {/* Public routes — accessible without login */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/games/:gameId" element={<GameDetailsPage />} />
        <Route path="/games/:gameId/missions/:missionId" element={<MissionDetailPage />} />
        <Route path="/community" element={<CommunityPage />} />

        {/* Library — accessible but shows locked state when unauthenticated */}
        <Route path="/library" element={<LibraryPage />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />

        {/* Redirect root to home */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Catch-all: redirect to home */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      <LoginModal />
    </AppShell>
  )
}

export default App
