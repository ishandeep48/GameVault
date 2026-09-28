import { api } from './api'
import type { User, LoginFormData, SignupFormData } from '@/types'

const STORAGE_KEY = 'gamevault_auth_session'

export interface SessionData {
  authenticated: boolean
  user: User
}

function extractErrorMessage(err: any): string {
  const detail = err.response?.data?.detail
  if (typeof detail === 'string') return detail
  if (Array.isArray(detail) && detail.length > 0) {
    return detail.map((d: any) => d.msg || d.message || JSON.stringify(d)).join(', ')
  }
  if (err.response?.data?.message) return err.response.data.message
  return err.message || 'An unexpected error occurred. Please try again.'
}

/**
 * Validate login form data.
 */
export function validateLogin(data: LoginFormData): string | null {
  if (!data.username?.trim()) return 'Username is required'
  if (!data.password) return 'Password is required'
  if (data.password.length < 8) return 'Password must be at least 8 characters'
  return null
}

/**
 * Validate signup form data.
 */
export function validateSignup(data: SignupFormData): Record<string, string> | null {
  const errors: Record<string, string> = {}

  if (!data.username?.trim()) errors.username = 'Username is required'
  else if (data.username.trim().length < 3 || data.username.trim().length > 30) {
    errors.username = 'Username must be between 3 and 30 characters'
  }

  if (!data.firstName?.trim()) errors.firstName = 'First name is required'
  if (!data.email?.trim()) errors.email = 'Email is required'
  else if (!isValidEmail(data.email)) errors.email = 'Please enter a valid email address'

  if (!data.dob?.trim()) errors.dob = 'Date of birth is required'

  if (!data.password) errors.password = 'Password is required'
  else if (data.password.length < 8) errors.password = 'Password must be at least 8 characters'

  if (!data.confirmPassword) errors.confirmPassword = 'Please confirm your password'
  else if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords do not match'

  return Object.keys(errors).length > 0 ? errors : null
}

/**
 * Attempt login via FastAPI /auth/login route.
 * Sets the access_token HttpOnly cookie on success.
 */
export async function login(data: LoginFormData): Promise<{ user: User } | { error: string }> {
  try {
    await api.post<{ message: string }>('/auth/login', {
      username: data.username.trim(),
      password: data.password,
    })

    const user: User = {
      // id: data.username.trim(),
      username: data.username.trim(),
      firstName: data.username.trim(),
      lastName: '',
      email: data.username.includes('@') ? data.username.trim() : `${data.username.trim()}@gamevault.local`,
      dob: '',
      createdAt: new Date().toISOString(),
    }

    return { user }
  } catch (err: any) {
    return { error: extractErrorMessage(err) }
  }
}

/**
 * Attempt signup via FastAPI /auth/signup route.
 * Sets the access_token HttpOnly cookie on success.
 */
export async function signup(data: SignupFormData): Promise<{ user: User } | { error: string }> {
  try {
    const result = await api.post<{
      message: string
      user: User
    }>('/auth/signup', {
      username: data.username.trim(),
      firstName: data.firstName.trim(),
      lastName: data.lastName?.trim() || null,
      email: data.email.trim().toLowerCase(),
      password: data.password,
      dateOfBirth: data.dob,
      confirmPassword: data.confirmPassword,
    })
    // console.log(result)
    const user_data = result.data.user
    const user: User = {
      username: user_data.username.trim(),
      firstName: user_data.firstName,
      lastName: user_data.lastName,
      email: user_data.email,
      dob: user_data.dob || '',
      createdAt: new Date().toISOString(),
    }

    return { user }
  } catch (err: any) {
    return { error: extractErrorMessage(err) }
  }
}

/**
 * Persist session to localStorage.
 */
export function saveSession(user: User): void {
  const session: SessionData = { authenticated: true, user }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  } catch {
    // Storage full or unavailable — silently fail
  }
}

/**
 * Load persisted session from localStorage.
 */
export function loadSession(): SessionData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed: SessionData = JSON.parse(raw)
    if (parsed && parsed.authenticated && parsed.user) {
      return parsed
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY)
  }
  return null
}

/**
 * Clear persisted session.
 */
export function clearSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Ignore
  }
}

/**
 * Check if current session is valid.
 */
export function isSessionValid(session: SessionData | null): boolean {
  return session !== null && session.authenticated === true
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
