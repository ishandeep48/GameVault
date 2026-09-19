import type { Game } from '@/types'

/**
 * Mock game data for development.
 * Replace with real API calls in Phase 10.
 */

const mockGames: Game[] = [
  {
    id: '1',
    title: 'The Witcher 3: Wild Hunt',
    description: 'A story-driven open world RPG set in a visually stunning fantasy universe.',
    coverImage: '/placeholder/game-cover.svg',
    releaseDate: '2015-05-19',
    developer: 'CD Projekt Red',
    publisher: 'CD Projekt',
    genres: ['RPG', 'Open World', 'Fantasy'],
    platforms: ['PC', 'PlayStation', 'Xbox', 'Switch'],
  },
  {
    id: '2',
    title: 'Elden Ring',
    description: 'A vast world where open fields with a variety of situations and huge dungeons await.',
    coverImage: '/placeholder/game-cover.svg',
    releaseDate: '2022-02-25',
    developer: 'FromSoftware',
    publisher: 'Bandai Namco',
    genres: ['Action RPG', 'Souls-like', 'Fantasy'],
    platforms: ['PC', 'PlayStation', 'Xbox'],
  },
  {
    id: '3',
    title: 'Baldur\'s Gate 3',
    description: 'Gather your party and return to the Forgotten Realms in a tale of fellowship and betrayal.',
    coverImage: '/placeholder/game-cover.svg',
    releaseDate: '2023-08-03',
    developer: 'Larian Studios',
    publisher: 'Larian Studios',
    genres: ['RPG', 'Turn-Based', 'Fantasy'],
    platforms: ['PC', 'PlayStation'],
  },
]

/**
 * Get all games (mock).
 */
export async function getGames(): Promise<Game[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return [...mockGames]
}

/**
 * Get a single game by ID (mock).
 */
export async function getGameById(id: string): Promise<Game | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return mockGames.find((game) => game.id === id)
}

/**
 * Search games by query (mock).
 */
export async function searchGames(query: string): Promise<Game[]> {
  await new Promise((resolve) => setTimeout(resolve, 250))
  const lowerQuery = query.toLowerCase()
  return mockGames.filter(
    (game) =>
      game.title.toLowerCase().includes(lowerQuery) ||
      game.genres.some((genre) => genre.toLowerCase().includes(lowerQuery))
  )
}
