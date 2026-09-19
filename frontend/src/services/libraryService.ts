import type { Game, GameStatus } from '@/types'

/**
 * Represents a game in the user's personal library with status and progress metadata.
 */
export interface UserGame {
  game: Game
  status: GameStatus
  progress: number // 0-100 percentage of missions completed
  currentMission?: string
  startedAt?: string
  updatedAt?: string
}

/**
 * Filter options for the library page.
 */
export type LibraryFilter = 'all' | GameStatus

/**
 * Sort options for the library page.
 */
export type LibrarySort = 'recently_updated' | 'alphabetical' | 'progress'

/**
 * Extended mock games with user-specific status and progress data.
 * This represents what would come from a UserGame join table in production.
 */
const mockUserGames: UserGame[] = [
  {
    game: {
      id: '1',
      title: 'The Witcher 3: Wild Hunt',
      description: 'A story-driven open world RPG set in a visually stunning fantasy universe.',
      coverImage: '/placeholder/witcher3.jpg',
      releaseDate: '2015-05-19',
      developer: 'CD Projekt Red',
      publisher: 'CD Projekt',
      genres: ['RPG', 'Open World', 'Fantasy'],
      platforms: ['PC', 'PlayStation', 'Xbox'],
    },
    status: 'completed' as GameStatus,
    progress: 100,
    currentMission: undefined,
    startedAt: '2024-06-15T10:00:00Z',
    updatedAt: '2024-12-28T20:00:00Z',
  },
  {
    game: {
      id: '2',
      title: 'Elden Ring',
      description: 'A vast world where open fields with a variety of situations and huge dungeons await.',
      coverImage: '/placeholder/eldenring.jpg',
      releaseDate: '2022-02-25',
      developer: 'FromSoftware',
      publisher: 'Bandai Namco',
      genres: ['Action RPG', 'Souls-like', 'Fantasy'],
      platforms: ['PC', 'PlayStation', 'Xbox'],
    },
    status: 'playing' as GameStatus,
    progress: 42,
    currentMission: 'The Broken Blacksmith',
    startedAt: '2025-01-05T18:00:00Z',
    updatedAt: '2025-01-14T19:00:00Z',
  },
  {
    game: {
      id: '3',
      title: "Baldur's Gate 3",
      description: "Gather your party and return to the Forgotten Realms in a tale of fellowship and betrayal.",
      coverImage: '/placeholder/bg3.jpg',
      releaseDate: '2023-08-03',
      developer: 'Larian Studios',
      publisher: 'Larian Studios',
      genres: ['RPG', 'Turn-Based', 'Fantasy'],
      platforms: ['PC', 'PlayStation'],
    },
    status: 'on_hold' as GameStatus,
    progress: 55,
    currentMission: 'Shadow-Cursed Lands',
    startedAt: '2024-11-20T14:00:00Z',
    updatedAt: '2025-01-10T16:00:00Z',
  },
  {
    game: {
      id: '4',
      title: 'Resident Evil 9',
      description: 'Survival horror returns with new terror and psychological dread.',
      coverImage: '/placeholder/re9.jpg',
      releaseDate: '2025-03-15',
      developer: 'Capcom',
      publisher: 'Capcom',
      genres: ['Horror', 'Action', 'Survival'],
      platforms: ['PC', 'PlayStation', 'Xbox'],
    },
    status: 'plan_to_play' as GameStatus,
    progress: 0,
    startedAt: undefined,
    updatedAt: '2025-01-12T09:00:00Z',
  },
  {
    game: {
      id: '5',
      title: 'Metal Gear Solid V: The Phantom Pain',
      description: 'Open-world tactical espionage action.',
      coverImage: '/placeholder/mgs5.jpg',
      releaseDate: '2015-09-01',
      developer: 'Kojima Productions',
      publisher: 'Konami',
      genres: ['Action', 'Stealth', 'Open World'],
      platforms: ['PC', 'PlayStation', 'Xbox'],
    },
    status: 'dropped' as GameStatus,
    progress: 30,
    currentMission: 'The Distant Thunder',
    startedAt: '2024-08-10T12:00:00Z',
    updatedAt: '2024-10-05T18:00:00Z',
  },
  {
    game: {
      id: '6',
      title: 'Ghost of Tsushima',
      description: 'Become a legendary samurai in feudal Japan.',
      coverImage: '/placeholder/ghost.jpg',
      releaseDate: '2020-07-17',
      developer: 'Sucker Punch Productions',
      publisher: 'Sony Interactive Entertainment',
      genres: ['Action', 'Adventure', 'Open World'],
      platforms: ['PC', 'PlayStation'],
    },
    status: 'playing' as GameStatus,
    progress: 68,
    currentMission: 'A New Horizon',
    startedAt: '2025-01-10T14:30:00Z',
    updatedAt: '2025-01-15T14:30:00Z',
  },
  {
    game: {
      id: '7',
      title: 'Cyberpunk 2077',
      description: 'An open-world RPG set in the dark future of Night City.',
      coverImage: '/placeholder/cyberpunk.jpg',
      releaseDate: '2020-12-10',
      developer: 'CD Projekt Red',
      publisher: 'CD Projekt',
      genres: ['RPG', 'Open World', 'Sci-Fi'],
      platforms: ['PC', 'PlayStation', 'Xbox'],
    },
    status: 'completed' as GameStatus,
    progress: 100,
    startedAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-09-15T22:00:00Z',
  },
  {
    game: {
      id: '8',
      title: 'Hollow Knight',
      description: 'Forge your own path in Hollow Knight! An epic action adventure through a vast ruined kingdom of insects and heroes.',
      coverImage: '/placeholder/hollowknight.jpg',
      releaseDate: '2017-02-24',
      developer: 'Team Cherry',
      publisher: 'Team Cherry',
      genres: ['Metroidvania', 'Indie', 'Action'],
      platforms: ['PC', 'Switch'],
    },
    status: 'completed' as GameStatus,
    progress: 100,
    startedAt: '2024-07-20T16:00:00Z',
    updatedAt: '2024-11-30T20:00:00Z',
  },
  {
    game: {
      id: '9',
      title: 'Sekiro: Shadows Die Twice',
      description: 'Carve your own path to vengeance in the award winning action-adventure from FromSoftware.',
      coverImage: '/placeholder/sekiro.jpg',
      releaseDate: '2019-03-22',
      developer: 'FromSoftware',
      publisher: 'Activision',
      genres: ['Action', 'Souls-like', 'Adventure'],
      platforms: ['PC', 'PlayStation', 'Xbox'],
    },
    status: 'on_hold' as GameStatus,
    progress: 25,
    currentMission: 'Sunken Valley',
    startedAt: '2024-12-01T19:00:00Z',
    updatedAt: '2024-12-20T21:00:00Z',
  },
  {
    game: {
      id: '10',
      title: 'Stardew Valley',
      description: 'You have inherited your grandfather\'s old farm plot in Stardew Valley. Armed with hand-me-down tools, you set out to begin your new life.',
      coverImage: '/placeholder/stardew.jpg',
      releaseDate: '2016-02-26',
      developer: 'ConcernedApe',
      publisher: 'ConcernedApe',
      genres: ['Simulation', 'Indie', 'RPG'],
      platforms: ['PC', 'PlayStation', 'Xbox', 'Switch'],
    },
    status: 'playing' as GameStatus,
    progress: 15,
    currentMission: undefined,
    startedAt: '2025-01-13T10:00:00Z',
    updatedAt: '2025-01-14T12:00:00Z',
  },
  {
    game: {
      id: '11',
      title: 'Dark Souls III',
      description: 'At the end of an era, when all hopes of restoring the Age of Fire have faded, darkness threatens to engulf the world once more.',
      coverImage: '/placeholder/darksouls3.jpg',
      releaseDate: '2016-04-12',
      developer: 'FromSoftware',
      publisher: 'Bandai Namco',
      genres: ['Action RPG', 'Souls-like'],
      platforms: ['PC', 'PlayStation', 'Xbox'],
    },
    status: 'plan_to_play' as GameStatus,
    progress: 0,
    startedAt: undefined,
    updatedAt: '2025-01-08T14:00:00Z',
  },
  {
    game: {
      id: '12',
      title: 'Red Dead Redemption 2',
      description: 'America, 1899. Arthur Morgan and the Van der Linde gang are on the run.',
      coverImage: '/placeholder/rdr2.jpg',
      releaseDate: '2019-11-05',
      developer: 'Rockstar Games',
      publisher: 'Rockstar Games',
      genres: ['Action', 'Adventure', 'Open World'],
      platforms: ['PC', 'PlayStation', 'Xbox'],
    },
    status: 'completed' as GameStatus,
    progress: 100,
    startedAt: '2024-05-10T12:00:00Z',
    updatedAt: '2024-10-20T18:00:00Z',
  },
]

/**
 * Get all user games (mock).
 */
export async function getUserGames(): Promise<UserGame[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return [...mockUserGames]
}

/**
 * Filter and sort user games for the library page.
 * This is a pure in-memory operation — no backend needed.
 */
export function filterAndSortUserGames(
  games: UserGame[],
  filter: LibraryFilter,
  searchQuery: string,
  sortBy: LibrarySort
): UserGame[] {
  let result = [...games]

  // Apply status filter
  if (filter !== 'all') {
    result = result.filter((ug) => ug.status === filter)
  }

  // Apply search query
  if (searchQuery.trim()) {
    const lowerQuery = searchQuery.toLowerCase().trim()
    result = result.filter(
      (ug) =>
        ug.game.title.toLowerCase().includes(lowerQuery) ||
        ug.game.genres.some((genre) => genre.toLowerCase().includes(lowerQuery))
    )
  }

  // Apply sort
  switch (sortBy) {
    case 'alphabetical':
      result.sort((a, b) => a.game.title.localeCompare(b.game.title))
      break
    case 'progress':
      result.sort((a, b) => b.progress - a.progress)
      break
    case 'recently_updated':
    default:
      result.sort((a, b) => {
        const dateA = new Date(a.updatedAt || a.startedAt || 0).getTime()
        const dateB = new Date(b.updatedAt || b.startedAt || 0).getTime()
        return dateB - dateA
      })
      break
  }

  return result
}

/**
 * Get library statistics (mock).
 */
export async function getLibraryStats(): Promise<{
  total: number
  byStatus: Record<GameStatus, number>
}> {
  await new Promise((resolve) => setTimeout(resolve, 200))

  const games = mockUserGames
  const stats = {
    total: games.length,
    byStatus: {
      playing: 0,
      completed: 0,
      on_hold: 0,
      dropped: 0,
      plan_to_play: 0,
    },
  }

  for (const ug of games) {
    stats.byStatus[ug.status]++
  }

  return stats
}
