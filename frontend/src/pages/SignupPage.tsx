import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PasswordInput } from '@/components/ui/PasswordInput'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { useAuth } from '@/hooks/useAuth'
import { validateSignup, signup as mockSignup } from '@/services/authService'

export default function SignupPage() {
  const navigate = useNavigate()
  const { login: setAuthenticated } = useAuth()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [dob, setDob] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [generalError, setGeneralError] = useState<string>('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setErrors({})
    setGeneralError('')

    // Frontend validation
    const validationErrors = validateSignup({ firstName, lastName, email, dob, password, confirmPassword })
    if (validationErrors) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)

    try {
      const result = await mockSignup({ firstName, lastName, email: email.trim(), dob, password, confirmPassword })
      if ('error' in result) {
        setGeneralError(result.error)
        return
      }

      // Successful signup — set auth state and redirect
      setAuthenticated(result.user)
      navigate('/home', { replace: true })
    } catch {
      setGeneralError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join GameVault and start tracking your games"
      footerText="Already have an account? "
      footerLink="Sign in"
      footerHref="/login"
    >
      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4">
        {/* General error */}
        {generalError && (
          <div className="p-3 rounded-gv-sm bg-red-500/10 border border-red-500/20 text-red-400 text-sm" role="alert">
            {generalError}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            placeholder="John"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={errors.firstName}
            autoComplete="given-name"
            required
          />
          <Input
            label="Last Name"
            type="text"
            placeholder="Doe"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={errors.lastName}
            autoComplete="family-name"
            required
          />
        </div>

        <Input
          label="Date of Birth"
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          error={errors.dob}
          autoComplete="bday"
          max={new Date().toISOString().split('T')[0]}
          required
        />

        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          autoComplete="email"
          required
        />

        <PasswordInput
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          autoComplete="new-password"
          required
        />

        <PasswordInput
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
          autoComplete="new-password"
          required
        />

        <Button type="submit" className="w-full" size="lg" isLoading={loading}>
          {loading ? 'Creating account...' : 'Create Account'}
        </Button>
      </form>
    </AuthLayout>
  )
}
