export interface User {
  // id: string
  username?: string
  firstName: string
  lastName: string
  email: string
  dob: string
  createdAt: string
}

export interface AuthState {
  user: User | null
  authenticated: boolean
}

export interface LoginFormData {
  username: string
  password: string
}

export interface LoginRequestResult {
  error?: string
}

export interface SignupFormData {
  username: string
  firstName: string
  lastName?: string
  email: string
  dob?: string
  password: string
  confirmPassword?: string
}
