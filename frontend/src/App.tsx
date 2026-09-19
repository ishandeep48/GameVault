import { Routes, Route } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'

// Pages (placeholders for Phase 0)
import HomePage from './pages/HomePage'
import LibraryPage from './pages/LibraryPage'
import GameDetailsPage from './pages/GameDetailsPage'
import MissionDetailPage from './pages/MissionDetailPage'
import ProfilePage from './pages/ProfilePage'
import CommunityPage from './pages/CommunityPage'

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/games/:gameId" element={<GameDetailsPage />} />
        <Route path="/games/:gameId/missions/:missionId" element={<MissionDetailPage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/community" element={<CommunityPage />} />
      </Routes>
    </AppShell>
  )
}

export default App
