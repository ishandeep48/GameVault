import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { User, AuthState, LoginFormData, LoginRequestResult } from '@/types'
import { loadSession, saveSession, clearSession, login as mockLogin } from '@/services/authService'

interface AuthContextValue extends AuthState {
  login: (user: User) => void
  authenticate: (credentials: LoginFormData) => Promise<LoginRequestResult>
  logout: () => void
  loginModalOpen: boolean
  loginModalFrom: string | undefined
  openLoginModal: (from?: string) => void
  closeLoginModal: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, authenticated: false })
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [loginModalFrom, setLoginModalFrom] = useState<string | undefined>()

  // Initialize from persisted session on mount
  useEffect(() => {
    const session = loadSession()
    if (session && session.authenticated) {
      setState({ user: session.user, authenticated: true })
    }
  }, [])

  const login = useCallback((user: User) => {
    saveSession(user)
    setState({ user, authenticated: true })
  }, [])

  const logout = useCallback(() => {
    clearSession()
    setState({ user: null, authenticated: false })
  }, [])

  const authenticate = useCallback(async ({ email, password }: LoginFormData): Promise<LoginRequestResult> => {
    const result = await mockLogin({ email: email.trim(), password })
    if ('error' in result) {
      return { error: result.error }
    }
    saveSession(result.user)
    setState({ user: result.user, authenticated: true })
    return {}
  }, [])

  const openLoginModal = useCallback((from?: string) => {
    setLoginModalFrom(from)
    setLoginModalOpen(true)
  }, [])

  const closeLoginModal = useCallback(() => {
    setLoginModalOpen(false)
    setLoginModalFrom(undefined)
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, login, authenticate, logout, loginModalOpen, loginModalFrom, openLoginModal, closeLoginModal }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
