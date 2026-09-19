/**
 * Base API configuration.
 * Currently configured for local FastAPI backend.
 * Will be updated in Phase 10 to connect to real API.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

/**
 * Fetch wrapper with base URL and common headers.
 * Replace this with axios or another library when ready for Phase 10.
 */
async function fetchApi<T>(
  _endpoint: string,
  _options: RequestInit = {}
): Promise<T> {
  // TODO (Phase 10): Implement real API call
  throw new Error('Not implemented — use mock services until Phase 10')
}

export { API_BASE_URL, fetchApi }
