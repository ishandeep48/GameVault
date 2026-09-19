import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PasswordInput } from '@/components/ui/PasswordInput'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { useAuth } from '@/hooks/useAuth'
import { validateLogin } from '@/services/authService'

export default function LoginPage() {
  const navigate = useNavigate()
  const { authenticate } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({})
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setErrors({})

    // Frontend validation
    const validationError = validateLogin({ email, password })
    if (validationError) {
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setErrors({ email: 'Please enter a valid email address' })
      } else if (!email) {
        setErrors({ email: 'Email is required' })
      } else {
        setErrors({ password: 'Password is required' })
      }
      return
    }

    setLoading(true)

    try {
      const result = await authenticate({ email, password })
      if (result.error) {
        setErrors({ general: result.error })
        return
      }

      navigate('/home', { replace: true })
    } catch {
      setErrors({ general: 'An unexpected error occurred. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your GameVault account"
      footerText="Don't have an account? "
      footerLink="Create account"
      footerHref="/signup"
    >
      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
        {/* General error */}
        {errors.general && (
          <div className="p-3 rounded-gv-sm bg-red-500/10 border border-red-500/20 text-red-400 text-sm" role="alert">
            {errors.general}
          </div>
        )}

        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          helperText="Demo: demo@gamevault.local"
          autoComplete="email"
          required
        />

        <PasswordInput
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          helperText="Demo: GameVault@123"
          autoComplete="current-password"
          required
        />

        <Button type="submit" className="w-full" size="lg" isLoading={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
    </AuthLayout>
  )
}
