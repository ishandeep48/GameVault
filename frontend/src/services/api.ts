import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Automatically sends and receives access_token cookie
})

// Helper wrapper maintaining backwards compatibility
export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const method = (options.method || 'GET').toLowerCase()
  const response = await api.request<T>({
    url: endpoint,
    method,
    data: options.body ? JSON.parse(options.body as string) : undefined,
    headers: options.headers as Record<string, string>,
  })
  return response.data
}

export { API_BASE_URL }
export default api
