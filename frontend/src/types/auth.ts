export interface User {
  id: string
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
  email: string
  password: string
}

export interface LoginRequestResult {
  error?: string
}

export interface SignupFormData {
  firstName: string
  lastName: string
  email: string
  dob: string
  password: string
  confirmPassword: string
}
