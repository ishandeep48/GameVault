import type { User, LoginFormData, SignupFormData } from '@/types'

const DEMO_ACCOUNT = {
  email: 'demo@gamevault.local',
  password: 'GameVault@123',
} as const

const STORAGE_KEY = 'gamevault_auth_session'

export interface SessionData {
  authenticated: boolean
  user: User
}

/**
 * Permanent demo account — the only hardcoded credentials.
 */
export function isDemoAccount(email: string, password: string): boolean {
  return email === DEMO_ACCOUNT.email && password === DEMO_ACCOUNT.password
}

/**
 * Create a permanent demo user object.
 */
function createDemoUser(): User {
  return {
    id: 'demo-user',
    firstName: 'Demo',
    lastName: 'User',
    email: DEMO_ACCOUNT.email,
    dob: '2000-01-01',
    createdAt: '2024-01-01T00:00:00.000Z',
  }
}

/**
 * Create a temporary signup user object.
 */
function createSignupUser(data: SignupFormData): User {
  return {
    id: `mock-signup-${Date.now()}`,
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    email: data.email.trim().toLowerCase(),
    dob: data.dob,
    createdAt: new Date().toISOString(),
  }
}

/**
 * Validate login form data (frontend-only).
 */
export function validateLogin(data: LoginFormData): string | null {
  if (!data.email?.trim()) return 'Email is required'
  if (!isValidEmail(data.email)) return 'Please enter a valid email address'
  if (!data.password) return 'Password is required'
  return null
}

/**
 * Validate signup form data (frontend-only).
 */
export function validateSignup(data: SignupFormData): Record<string, string> | null {
  const errors: Record<string, string> = {}

  if (!data.firstName?.trim()) errors.firstName = 'First name is required'
  if (!data.lastName?.trim()) errors.lastName = 'Last name is required'
  if (!data.email?.trim()) errors.email = 'Email is required'
  else if (!isValidEmail(data.email)) errors.email = 'Please enter a valid email address'
  if (!data.dob) errors.dob = 'Date of birth is required'
  if (!data.password) errors.password = 'Password is required'
  else if (data.password.length < 6) errors.password = 'Password must be at least 6 characters'
  if (!data.confirmPassword) errors.confirmPassword = 'Please confirm your password'
  else if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords do not match'

  return Object.keys(errors).length > 0 ? errors : null
}

/**
 * Attempt login against the mock demo account.
 */
export async function login(data: LoginFormData): Promise<{ user: User } | { error: string }> {
  // Simulate a small async delay for UI loading state
  await new Promise((resolve) => setTimeout(resolve, 400))

  if (!isDemoAccount(data.email.trim(), data.password)) {
    return { error: 'Invalid email or password.' }
  }

  return { user: createDemoUser() }
}

/**
 * Create a temporary signup session.
 */
export async function signup(data: SignupFormData): Promise<{ user: User } | { error: string }> {
  // Simulate a small async delay for UI loading state
  await new Promise((resolve) => setTimeout(resolve, 500))

  const trimmedEmail = data.email.trim().toLowerCase()

  if (trimmedEmail === DEMO_ACCOUNT.email) {
    return { error: 'An account with this email already exists.' }
  }

  return { user: createSignupUser(data) }
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
    // Corrupted data — clear it
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
 * Check if current session is valid (not expired).
 * For mock auth, sessions persist indefinitely until logout.
 */
export function isSessionValid(session: SessionData | null): boolean {
  return session !== null && session.authenticated === true
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
