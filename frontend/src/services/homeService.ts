import type { Game, GameStatus } from '@/types'

/**
 * Extended mock data for the Home page.
 * Replace with real API calls in Phase 10.
 */

export interface ActivityItem {
  id: string
  type: 'mission_complete' | 'game_start' | 'status_change' | 'review_posted' | 'review_mission'
  title: string
  description?: string
  gameTitle?: string
  gameId?: string
  timestamp: string
}

export interface CommunityReview {
  id: string
  userId: string
  username: string
  avatarUrl?: string
  gameId?: string
  gameTitle?: string
  missionId?: string
  missionTitle?: string
  rating: number
  content: string
  likes: number
  dislikes: number
  createdAt: string
}

export interface ProgressStats {
  playing: number
  completed: number
  onHold: number
  planToPlay: number
  dropped: number
  missionsThisWeek: number
}

/**
 * Extended mock games with status and progress for home page.
 */
const mockHomeGames = [
  {
    game: {
      id: '1',
      title: 'Ghost of Tsushima',
      description: 'Become a legendary samurai in feudal Japan.',
      coverImage: '/placeholder/ghost.jpg',
      genres: ['Action', 'Adventure', 'Open World'],
      platforms: ['PC', 'PlayStation'],
    },
    status: 'playing' as GameStatus,
    progress: 68,
    currentMission: 'A New Horizon',
    actTitle: 'Act II',
    lastPlayed: '2025-01-15T14:30:00Z',
  },
  {
    game: {
      id: '2',
      title: 'Resident Evil 9',
      description: 'Survival horror returns with new terror.',
      coverImage: '/placeholder/re9.jpg',
      genres: ['Horror', 'Action', 'Survival'],
      platforms: ['PC', 'PlayStation', 'Xbox'],
    },
    status: 'plan_to_play' as GameStatus,
    progress: 0,
    lastPlayed: null,
  },
  {
    game: {
      id: '3',
      title: 'Metal Gear Solid V',
      description: 'Open-world tactical espionage action.',
      coverImage: '/placeholder/mgs5.jpg',
      genres: ['Action', 'Stealth', 'Open World'],
      platforms: ['PC', 'PlayStation', 'Xbox'],
    },
    status: 'completed' as GameStatus,
    progress: 100,
    lastPlayed: '2024-12-28T20:00:00Z',
  },
  {
    game: {
      id: '4',
      title: 'Elden Ring',
      description: 'A vast world where open fields with a variety of situations and huge dungeons await.',
      coverImage: '/placeholder/eldenring.jpg',
      genres: ['Action RPG', 'Souls-like', 'Fantasy'],
      platforms: ['PC', 'PlayStation', 'Xbox'],
    },
    status: 'playing' as GameStatus,
    progress: 42,
    currentMission: 'The Broken Blacksmith',
    actTitle: 'Act III',
    lastPlayed: '2025-01-14T19:00:00Z',
  },
  {
    game: {
      id: '5',
      title: 'Baldur\'s Gate 3',
      description: 'Gather your party and return to the Forgotten Realms.',
      coverImage: '/placeholder/bg3.jpg',
      genres: ['RPG', 'Turn-Based', 'Fantasy'],
      platforms: ['PC', 'PlayStation'],
    },
    status: 'on_hold' as GameStatus,
    progress: 55,
    lastPlayed: '2025-01-10T16:00:00Z',
  },
]

/**
 * Mock activity items for the home page.
 */
const mockActivities: ActivityItem[] = [
  {
    id: 'a1',
    type: 'mission_complete',
    title: 'Completed "The Broken Blacksmith"',
    gameTitle: 'Elden Ring',
    timestamp: '2025-01-15T14:30:00Z',
  },
  {
    id: 'a2',
    type: 'review_posted',
    title: 'Reviewed "Resident Evil 9"',
    gameTitle: 'Resident Evil 9',
    timestamp: '2025-01-15T11:00:00Z',
  },
  {
    id: 'a3',
    type: 'game_start',
    title: 'Started playing "Ghost of Tsushima"',
    gameTitle: 'Ghost of Tsushima',
    timestamp: '2025-01-14T19:00:00Z',
  },
  {
    id: 'a4',
    type: 'status_change',
    title: 'Changed status to "On Hold"',
    gameTitle: 'Baldur\'s Gate 3',
    timestamp: '2025-01-13T10:00:00Z',
  },
  {
    id: 'a5',
    type: 'mission_complete',
    title: 'Completed "The Last Ronin"',
    gameTitle: 'Ghost of Tsushima',
    timestamp: '2025-01-12T22:00:00Z',
  },
]

/**
 * Mock community reviews for the home page.
 */
const mockCommunityReviews: CommunityReview[] = [
  {
    id: 'cr1',
    userId: 'u2',
    username: 'Alex Chen',
    avatarUrl: '',
    gameId: '1',
    gameTitle: 'Ghost of Tsushima',
    missionId: 'm10',
    missionTitle: 'The Broken Blacksmith',
    rating: 5,
    content: 'The mission design here is incredible. Every encounter feels meaningful and the environmental storytelling pulls you deeper into the world.',
    likes: 24,
    dislikes: 1,
    createdAt: '2025-01-14T16:00:00Z',
  },
  {
    id: 'cr2',
    userId: 'u3',
    username: 'Sarah Kim',
    avatarUrl: '',
    gameId: '4',
    gameTitle: 'Elden Ring',
    rating: 4,
    content: 'Challenging but fair. The boss fights are some of the best I have experienced in any game. Worth every hour.',
    likes: 18,
    dislikes: 2,
    createdAt: '2025-01-13T09:00:00Z',
  },
  {
    id: 'cr3',
    userId: 'u4',
    username: 'Marcus Lee',
    avatarUrl: '',
    gameId: '3',
    gameTitle: 'Metal Gear Solid V',
    rating: 5,
    content: 'A masterpiece of stealth gameplay. The freedom to approach missions in your own way is unmatched.',
    likes: 31,
    dislikes: 0,
    createdAt: '2025-01-11T14:00:00Z',
  },
]

/**
 * Mock progress stats for the home page.
 */
const mockProgressStats: ProgressStats = {
  playing: 2,
  completed: 8,
  onHold: 1,
  planToPlay: 5,
  dropped: 0,
  missionsThisWeek: 12,
}

/**
 * Get the most recently played game (mock).
 */
export async function getRecentlyPlayedGame(): Promise<{
  game: Game
  status: GameStatus
  progress: number
  currentMission?: string
  actTitle?: string
} | null> {
  await new Promise((resolve) => setTimeout(resolve, 200))

  const playingGames = mockHomeGames.filter(
    (g) => g.status === 'playing' && g.lastPlayed !== null
  )

  if (playingGames.length === 0) return null

  // Sort by last played and return the most recent
  playingGames.sort((a, b) => new Date(b.lastPlayed!).getTime() - new Date(a.lastPlayed!).getTime())
  const latest = playingGames[0]

  return {
    game: latest.game,
    status: latest.status,
    progress: latest.progress,
    currentMission: latest.currentMission,
    actTitle: latest.actTitle,
  }
}

/**
 * Get library games for the home page (mock).
 */
export async function getLibraryGames(): Promise<{
  game: Game
  status: GameStatus
  progress: number
  currentMission?: string
}[]> {
  await new Promise((resolve) => setTimeout(resolve, 200))

  // Return up to 6 games sorted by last played
  const sorted = [...mockHomeGames].sort(
    (a, b) => (b.lastPlayed ? 1 : 0) - (a.lastPlayed ? 1 : 0)
  )

  return sorted.slice(0, 6).map((g) => ({
    game: g.game,
    status: g.status,
    progress: g.progress,
    currentMission: g.currentMission,
  }))
}

/**
 * Get recent activity (mock).
 */
export async function getRecentActivity(): Promise<ActivityItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 150))
  return mockActivities.slice(0, 5)
}

/**
 * Get community reviews for the home page (mock).
 */
export async function getCommunityReviews(): Promise<CommunityReview[]> {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return mockCommunityReviews.slice(0, 3)
}

/**
 * Get progress stats (mock).
 */
export async function getProgressStats(): Promise<ProgressStats> {
  await new Promise((resolve) => setTimeout(resolve, 150))
  return mockProgressStats
}
